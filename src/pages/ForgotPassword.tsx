import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Mail } from "lucide-react";
import LoginBackGround from "../asset/LoginBackGround.jpg";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulating password reset request - replace with actual API call in a real app
    setTimeout(() => {
      if (email) {
        setSubmitted(true);
        toast({
          title: "Reset link sent",
          description: "If your email exists in our system, you'll receive a password reset link",
        });
      } else {
        setError("Please enter your email address");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container min-h-screen flex items-center justify-center p-4"
    style={{
        backgroundImage: `url(${LoginBackGround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-finance-blue">FinIntel</h1>
          <p className="text-muted-foreground">Advanced Financial Research Platform</p>
        </div>

        <Card className="w-full shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              {!submitted
                ? "Enter your email address to receive a password reset link"
                : "Check your email for the reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send reset link"}
                  </Button>
                </div>
              </form>
            ) : (
              <Alert className="mb-4 bg-accent/10 border-accent/20">
                <AlertDescription>
                  We've sent a password reset link to <strong>{email}</strong>.
                  Please check your inbox and follow the instructions to reset your password.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              to="/login"
              className="flex items-center text-sm text-accent hover:text-accent/80 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;