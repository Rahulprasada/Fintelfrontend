import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import LoginBackGround from "../../asset/LoginBackGround.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, user } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("[Login Page] MOUNTED.");
    if (user) {
      console.log("[Login Page] User already exists. Redirecting...");
      navigate("/dashboard/investment-agent-lab");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (apiError) setApiError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "-> Step 1: `handleLogin` function triggered by form submission."
    );

    if (!form.email || !form.password) {
      console.log("-> Step 2: Validation FAILED (fields empty). Aborting.");
      setApiError("Email and password cannot be empty.");
      return;
    }

    setLoading(true);
    setApiError("");
    console.log(
      "-> Step 2: Validation PASSED. Proceeding to call context login function."
    );

    try {
      // This is the call to the function in AuthContext.tsx
      console.log("-> Step 3: Calling `await login(...)`...");
      await login(form.email, form.password);

      console.log("-> Step 4: `login` function completed successfully.");
      toast({ title: "Login Successful", description: "Redirecting..." });
      navigate("/dashboard/investment-agent-lab");
    } catch (error: any) {
      console.log("-> Step 4: `login` function FAILED and threw an error.");
      setApiError(error.message);
    } finally {
      console.log(
        "-> Step 5: `finally` block running. Setting loading to false."
      );
      setLoading(false);
    }
  };

  if (user) return null; // Render nothing if already logged in to prevent form flash

  return (
    <div
      className="login-container min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${LoginBackGround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-finance-blue">
          Advanced Financial Research Platform
          </h1>
        </div>
        <Card className="w-full shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} noValidate>
              {apiError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{apiError}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="pl-10"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="pl-10"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                Create an account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
