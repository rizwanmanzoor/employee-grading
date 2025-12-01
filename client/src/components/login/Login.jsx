import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser,sendOtp,verifyOtp,resendOtp } from "@/features/auth/authSlice";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, User } from "lucide-react";
import loginImage from "@/assets/login-img.webp";
import logo from "@/assets/logo.webp";
import whiteLogo from "@/assets/nox-white.webp";
import CommonDialog from "../dialog/CommonDialog";
import { useTranslation } from "react-i18next";

const Login = () => {
  // dialog state
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

  const { loading, error, token,role } = useSelector((state) => state.auth);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  useEffect(() => {
    if (token && role) {
      if (role === "admin") navigate("/admin");
      else if (role === "employee") navigate("/gateway");
    }
  }, [token, role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) return;

    const result = await dispatch(sendOtp({ username }));
    if (result.meta.requestStatus === "fulfilled") {
      setOtpModalOpen(true);
      setTimer(300); // start 5 min timer
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  const handleVerifyOtp = async () => {
    if (!otp) return;

    const result = await dispatch(verifyOtp({ username, otp }));
    if (result.meta.requestStatus === "fulfilled") {
      setOtpModalOpen(false);
    }
  };

  // =========================
  // RESEND OTP
  // =========================
  const handleResendOtp = async () => {
    const result = await dispatch(resendOtp({ username }));

    if (result.meta.requestStatus === "fulfilled") {
      setTimer(300);
    }
  };
  // ⭐ CHECK LANGUAGE FROM LOCALSTORAGE ON PAGE LOAD
  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage");
    if (savedLang === "arabic") {
      i18n.changeLanguage("ar");
      document.body.dir = "rtl";
    } else {
      i18n.changeLanguage("english");
      document.body.dir = "ltr";
    }
  }, []);

  // useEffect(() => {
  //   if (token) {
  //     if (role === "admin") {
  //     navigate("/admin");
  //   } else if (role === "employee") {
  //     navigate("/gateway");
  //   }
  //   }
  // }, [token,role, navigate]);

  useEffect(() => {
    if (!otpModalOpen || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpModalOpen, timer]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isRTL ? "direction-rtl" : "direction-ltr"
      }`}
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
              <h1 className="text-2xl font-bold">{t("login_page.title")}</h1>
              <p className="text-muted-foreground text-sm text-balance">
              {t("login_page.subtitle")}
              </p>
            </div>

            {/* dialog */}
            <div>
              {/* <Button variant="outline" onClick={() => setOpen(true)}>
                Open Dialog
              </Button> */}

              <CommonDialog
                open={otpModalOpen}
                onOpenChange={setOtpModalOpen}
                title="Verify Account"
                description={`Enter the OTP sent to ${username}`}
              >
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <div className="flex justify-between items-center">
                    <span>Expires in: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2,'0')}</span>
                    {timer === 0 && (
                      <Button size="sm" onClick={handleResendOtp}>
                        Resend OTP
                      </Button>
                    )}
                  </div>

                  <Button
                    className="mt-4 w-full"
                    onClick={handleVerifyOtp}
                    disabled={loading}
                  >
                    Verify OTP
                  </Button>
                </div>
                {otpModalOpen && error && (
                  <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
                )}
              </CommonDialog>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 mt-7 md:max-w-md w-full mx-auto"
            >
              <div>
                <Label
                  htmlFor="username"
                  className={`text-sm font-medium mb-2 ${isRTL ? "text-right" : "text-left"}`}
                  style={{ color: "var(--foreground)" }}
                >
                  {t("login_page.username")}
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder={t("login_page.enter_username")}
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

              {/* <div>
                <Label
                  htmlFor="password"
                  className={`text-sm font-medium mb-2 ${isRTL ? "text-right" : "text-left"}`}
                  style={{ color: "var(--foreground)" }}
                >
                 {t("login_page.password")}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder={t("login_page.enter_password")}
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
              </div> */}
              {/* ERROR */}
              {!otpModalOpen && error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              {/* SUBMIT */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-2 cursor-pointer"
              >
                {loading ? t("login_page.signing_in") : t("login_page.sign_in")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
