import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/features/auth/authSlice";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, User } from "lucide-react";
import loginImage from "@/assets/login-img.webp";
import logo from "@/assets/logo.webp";
import whiteLogo from "@/assets/nox-white.webp";
import CommonDialog from "../dialog/CommonDialog";

const Login = () => {
  // dialog state
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token,role } = useSelector((state) => state.auth);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (token) {
      if (role === "admin") {
      navigate("/admin");
    } else if (role === "employee") {
      navigate("/home");
    }
    }
  }, [token,role, navigate]);

  return (
    <div
      className="md:min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="w-full max-w-[950px] text-card-foreground rounded-2xl shadow-md border border-border bg-card overflow-hidden">
        <div className="flex items-center max-md:flex-col w-full gap-y-4">
          {/* === LEFT IMAGE SECTION === */}
          <div className="md:max-w-[570px] w-full h-full">
            <div
              className="md:aspect-square bg-card relative before:absolute before:inset-0 before:bg-black/40 overflow-hidden w-full h-full"
              // className="md:aspect-square bg-card relative overflow-hidden w-full h-full"
            >
              <img
                src={loginImage}
                // src={loginImage}
                className="w-full h-full object-cover "
                // className="w-full h-full object-contain object-center mt-7"
                alt="login img"
              />
            </div>
          </div>

          {/* === RIGHT FORM SECTION === */}
          <div className="w-full h-full px-8 lg:px-10 py-8 max-md:-order-1">
            <div className="flex flex-col items-center gap-1 text-center">
              <img
                src={logo}
                alt="logo"
                width={"180"}
                className="mb-3 block dark:hidden"
              />
              <img
                src={whiteLogo}
                alt="logo"
                width={"180"}
                className="mb-3 hidden dark:block"
              />
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your credentials to login to your account
              </p>
            </div>

            {/* dialog */}
            <div>
              {/* <Button variant="outline" onClick={() => setOpen(true)}>
                Open Dialog
              </Button> */}

              <CommonDialog
                open={open}
                onOpenChange={setOpen}
                title="Edit Profile"
                description="Make changes to your profile here."
                footer={
                  <>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setOpen(false)}>Save Changes</Button>
                  </>
                }
              >
                {/* Dialog Body */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded-md"
                    placeholder="Enter name"
                  />
                </div>
              </CommonDialog>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 mt-7 md:max-w-md w-full mx-auto"
            >
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              {/* ERROR */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              {/* SUBMIT */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-2 cursor-pointer"
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
