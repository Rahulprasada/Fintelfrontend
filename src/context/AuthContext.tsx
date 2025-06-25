import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define types
interface User {
  id: number; // Added id, as it's returned by UserStatusView
  username: string;
  email: string;
  is_active: boolean;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isEmailConfirmed: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {
    console.error("AuthContext: Default login function called. This should not happen in a real app.");
  },
  register: async () => {
    console.error("AuthContext: Default register function called. This should not happen in a real app.");
  },
  logout: () => {},
  loading: true,
  isEmailConfirmed: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState<boolean>(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "https://web-production-5afd2.up.railway.app/api/";

  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log("[AuthProvider] MOUNTED. Checking for existing token.");
      const token = localStorage.getItem("access_token");

      if (token) {
        try {
          // Client-side token expiration check (optional but good for UX)
          const payload = JSON.parse(atob(token.split(".")[1]));
          const expirationTime = payload.exp * 1000; // Convert to milliseconds
          if (expirationTime < Date.now()) {
            console.warn("[AuthProvider] Access token expired on client-side. Clearing storage.");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setUser(null);
            setIsEmailConfirmed(false);
            navigate("/login"); // Redirect to login if token is expired
            setLoading(false);
            return;
          }

          console.log("Token payload:", payload);
          console.log("Expiration:", new Date(expirationTime));
          console.log("Authorization header to be sent with user-status:", `Bearer ${token}`);

          // Validate token with backend
          const response = await axios.get(`${API_URL}user-status/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("[AuthProvider] Token validation successful. User data:", response.data);
          setUser(response.data);
          setIsEmailConfirmed(response.data.is_active);
        } catch (error: any) {
          console.error("[AuthProvider] Token validation failed (backend rejection):", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
          });
          // Clear invalid tokens and redirect to login
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setUser(null);
          setIsEmailConfirmed(false);
          navigate("/login");
        } finally {
          setLoading(false);
        }
      } else {
        console.log("[AuthProvider] No access token found in localStorage.");
        setUser(null);
        setIsEmailConfirmed(false);
        setLoading(false);
        // Only navigate to login if not already on a public route like login/register/confirm
        if (!['/login', '/register', '/confirm'].includes(window.location.pathname)) {
            navigate("/login");
        }
      }
    };

    checkAuthStatus();
  }, [API_URL]); // navigate added to dependency array

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<void> => {
    console.log("✅ [AuthContext] REAL register function called.");
    try {
      // *** IMPORTANT: Do NOT auto-login here. User needs to confirm email first. ***
      const response = await axios.post(`${API_URL}register/`, {
        username,
        email,
        password,
      });
      console.log("✅ [AuthContext] Registration successful, response:", response.data);
      navigate("/ConfirmEmailPage"); 
    } catch (error: any) {
      console.error("❌ [AuthContext] Registration failed:", {
        message: error.message,
        response: error.response
          ? { status: error.response.status, data: error.response.data }
          : null,
      });
      throw new Error(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };


  const login = async (email: string, password: string): Promise<void> => {
    console.log("✅ [AuthContext] REAL login function called for email:", email);
    try {
      const response = await axios.post(`${API_URL}token/`, {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      console.log("✅ [AuthContext] Token obtained. Fetching user status...");
      const userResponse = await axios.get(`${API_URL}user-status/`, {
        headers: { Authorization: `Bearer ${response.data.access}` },
      });
      setUser(userResponse.data);
      setIsEmailConfirmed(userResponse.data.is_active);

      console.log("✅ [AuthContext] Login successful. User data:", userResponse.data);

      if (userResponse.data.is_active) {
        navigate("/");
      } else {
        // If user logs in but email is not confirmed
        console.warn("User logged in, but email is not active. Redirecting to confirmation info.");
        navigate("/pending-confirmation"); // A page that explains email needs confirmation
        throw new Error("Your email address is not confirmed. Please check your inbox.");
      }

    } catch (error: any) {
      console.error("❌ [AuthContext] Login failed:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      // Clear tokens if login fails to prevent stale tokens
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
      setIsEmailConfirmed(false);
      // Provide more specific error message based on common 401 reasons
      let errorMessage = "Login failed. Please check your credentials.";
      if (error.response?.status === 401) {
          errorMessage = error.response.data?.detail || "Invalid credentials provided.";
          // Simple JWT often returns "No active account found with the given credentials"
          if (error.response.data?.detail === "No active account found with the given credentials") {
              errorMessage = "Account not active or invalid credentials. Did you confirm your email?";
          }
      } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
      }
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    console.log("[AuthContext] Logging out...");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setIsEmailConfirmed(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, isEmailConfirmed }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);