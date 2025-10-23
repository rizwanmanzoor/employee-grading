import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="w-full max-w-md">
        <Card className="rounded-2xl shadow-md border border-border bg-card">
          <CardHeader>
            <CardTitle
              className="text-center text-3xl font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Sign in
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-6 mt-6">
              <div>
                <Label
                  htmlFor="username"
                  className="text-sm font-medium mb-2 block"
                  style={{ color: "var(--foreground)" }}
                >
                  User name
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Enter user name"
                    className="pr-9"
                    style={{
                      backgroundColor: "var(--input-bg)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                  <User
                    className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-medium mb-2 block"
                  style={{ color: "var(--foreground)" }}
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter password"
                    className="pr-9"
                    style={{
                      backgroundColor: "var(--input-bg)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  />

                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                    ) : (
                      <Eye className="w-4 h-4" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              <Link to={"/home"}>
                <Button
                  type="submit"
                  className="w-full mt-4 cursor-pointer"
                  // style={{
                  //   backgroundColor: "var(--primary)",
                  //   color: "var(--primary-foreground)",
                  // }}
                >
                  Sign in
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
