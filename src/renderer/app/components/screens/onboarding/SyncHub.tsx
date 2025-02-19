import React, { useEffect, useState } from "react";
import {
  Mail02Icon,
  SquareLock02Icon,
  UserIcon,
  ArrowRight01Icon,
  Link03Icon,
  Key01Icon,
} from "hugeicons-react";
import Input from "../../shared/Input";
import { ToastContainer, toast } from "react-toastify";
import StartButton from "../../shared/StartButton";

interface SyncHubProps {
  setIsConnectedToSyncHub: (isConnected: boolean) => void;
  isConnectedToSyncHub: boolean;
  handleNext: () => void;
}

function SyncHub({
  setIsConnectedToSyncHub,
  isConnectedToSyncHub,
  handleNext,
}: SyncHubProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (isConnectedToSyncHub) {
      const userData = loadUserData();
      setLoggedInUser({
        email: userData.email || formData.email,
        firstName: userData.firstName || formData.firstName,
        lastName: userData.lastName || formData.lastName,
      });
    }
  }, [isConnectedToSyncHub]);

  // Handle user data persistence
  const saveUserData = (userData: { email: string; firstName: string; lastName: string }) => {
    window.api.invoke("save-user-details", userData);
    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("userFirstName", userData.firstName);
    localStorage.setItem("userLastName", userData.lastName);
  };

  // Load user data from localStorage
  const loadUserData = () => {
    return {
      email: localStorage.getItem("userEmail") || "",
      firstName: localStorage.getItem("userFirstName") || "",
      lastName: localStorage.getItem("userLastName") || "",
    };
  };

  // Handle API responses
  const handleApiResponse = (response: any, successCallback: () => void) => {
    if ([200, 201].includes(response.status)) {
      successCallback();
    } else {
      toast.error(response?.error, { type: "error" });
    }
  };

  // Form validation
  const validateForm = (formData: any, isLogin: boolean, showOtpVerification: boolean, otp: string) => {
    const newErrors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.push("email");
    }

    // Password validation
    if (!formData.password || formData.password.length < 4) {
      newErrors.push("password");
    }

    // Name validation for registration
    if (!isLogin) {
      if (!formData.firstName.trim()) newErrors.push("firstName");
      if (!formData.lastName.trim()) newErrors.push("lastName");
    }

    // OTP validation
    if (showOtpVerification && !otp.trim()) {
      newErrors.push("otp");
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const errors = validateForm(formData, isLogin, showOtpVerification, otp);
    if (errors.length > 0) {
      setError(errors);
      return;
    }

    setError([]);
    setIsLoading(true);
 
    try {
      if (showOtpVerification) {
        const response = await window.api.invoke("verify-otp", {
          email: formData.email,
          otp: otp,
        });

        handleApiResponse(response, () => {
          saveUserData(formData);
          setIsConnectedToSyncHub(true);
        });
      } else {
        const endpoint = isLogin ? "login" : "register";
        const payload = isLogin
          ? { email: formData.email, password: formData.password }
          : { ...formData };

        const response:any = await window.api.invoke(endpoint, payload);

        handleApiResponse(response, () => {
          if (isLogin && response?.user?.email_verified_at === null) {
            setShowOtpVerification(true);
          } else if (!isLogin) {
            setShowOtpVerification(true);
          } else {
            saveUserData({
              email: response?.user?.email,
              firstName: response?.user?.first_name,
              lastName: response?.user?.last_name,
            });
            setIsConnectedToSyncHub(true);
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleForm = () => {
    if (!isLogin) {
      setShowOtpVerification(false);
    }

    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 200);
  };

  const handleResendOtp = async () => {
    const response:any = await window.api.invoke("request-otp", { email: formData.email });
    handleApiResponse(response, () => {
      toast.success(response?.message, { type: "success" });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 overflow-y-auto">
      <div className="w-full max-w-md">
        {/* Header with decorative elements */}
        <div className="text-center mb-8 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-[#C2EB2C]/20 to-[#0C2501]/20 rounded-full blur-xl" />
          <div
            className={`transform transition-all duration-500 ease-in-out relative
                        ${
                          isAnimating
                            ? "-translate-y-full opacity-0"
                            : "translate-y-0 opacity-100"
                        }`}
          >
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#0C2501] to-[#C2EB2C] dark:from-[#C2EB2C] dark:to-[#C2EB2C]/80 bg-clip-text text-transparent">
              Sync Hub
            </h1>
            <p className="text-lg dark:text-[#C2EB2C]/70 text-[#0C2501]/70">
              {isLogin ? "Welcome back!" : "Create your account"}
            </p>
          </div>
        </div>

        {isConnectedToSyncHub && (
          <div className="bg-white/80 dark:bg-darkprimary/95 backdrop-blur-lg rounded-2xl p-6 mb-6
                        shadow-lg shadow-black/5 dark:shadow-[#C2EB2C]/5
                        border border-black/5 dark:border-[#C2EB2C]/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-[#C2EB2C]/20 to-[#0C2501]/20 
                                    flex items-center justify-center"
                >
                  <UserIcon className="w-5 h-5 text-[#0C2501] dark:text-[#C2EB2C]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#0C2501] dark:text-[#C2EB2C]">
                    {loggedInUser.firstName} {loggedInUser.lastName}
                  </h3>
                  <p className="text-sm text-[#0C2501]/70 dark:text-[#C2EB2C]/70">
                    {loggedInUser.email}
                  </p>
                </div>
              </div>
              <StartButton 
                onClick={handleNext}
                variant="secondary"
                size="base"
                className="min-w-[80px] dark:!bg-[#C2EB2C] dark:text-[#0C2501]"
              >
                Next
              </StartButton>
            </div>
            <div className="text-sm text-[#0C2501]/70 dark:text-[#C2EB2C]/70 bg-[#0C2501]/5 dark:bg-[#C2EB2C]/5 
                            rounded-lg p-3">
              Your account is connected. This gives you single sign-on access across all Omisio apps .
            </div>
          </div>
        )}

        {/* Form Card */}
        {!isConnectedToSyncHub && (
          <div
            className="bg-white/80 dark:bg-darkprimary/95 backdrop-blur-lg rounded-2xl p-8 
                    shadow-lg shadow-black/5 dark:shadow-[#C2EB2C]/5
                    border border-black/5 dark:border-[#C2EB2C]/10
                    transition-all duration-300 relative overflow-hidden"
          >
            {!showOtpVerification && (
              <form
                onSubmit={handleSubmit}
                className={`transform transition-all duration-300 ease-in-out space-y-6
                                ${
                                  isAnimating
                                    ? "translate-x-full opacity-0"
                                    : "translate-x-0 opacity-100"
                                }`}
              >
                {/* Sign Up Fields */}
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      label="First Name"
                      icon={<UserIcon />}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="transition-all duration-300 hover:border-[#C2EB2C]/50 focus:border-[#C2EB2C]"
                      required
                    />
                    <Input
                      name="lastName"
                      label="Last Name"
                      icon={<UserIcon />}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className="transition-all duration-300 hover:border-[#C2EB2C]/50 focus:border-[#C2EB2C]"
                      required
                    />
                  </div>
                )}

                {/* Email & Password Fields */}
                <Input
                  name="email"
                  label="Email"
                  icon={<Mail02Icon />}
                  value={formData.email}
                  onChange={handleInputChange}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="transition-all duration-300 hover:border-[#C2EB2C]/50 focus:border-[#C2EB2C]"
                  error={error.includes("email")}
                  required
                />

                <Input
                  name="password"
                  label="Password"
                  icon={<SquareLock02Icon />}
                  value={formData.password}
                  onChange={handleInputChange}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="transition-all duration-300 hover:border-[#C2EB2C]/50 focus:border-[#C2EB2C]"
                  error={error.includes("password")}
                  required
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl font-medium
                                    relative overflow-hidden group transition-all duration-300
                                    bg-gradient-to-r from-[#0C2501] to-[#0C2501]/90
                                    dark:from-[#C2EB2C] dark:to-[#C2EB2C]/90
                                    text-white dark:text-[#0C2501]
                                    hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-[#C2EB2C]/20
                                    disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span
                    className={`flex items-center justify-center gap-2 transition-opacity duration-200
                                    ${isLoading ? "opacity-0" : "opacity-100"}`}
                  >
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight01Icon className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                  {isLoading && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Link03Icon className="w-5 h-5 animate-spin" />
                    </span>
                  )}
                </button>
              </form>
            )}

            {/* OTP Verification Form */}
            {showOtpVerification && (
              <form
                onSubmit={handleSubmit}
                className="transform transition-all duration-300 ease-in-out space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    Verify Your Email
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We've sent a verification code to {formData.email}
                  </p>
                </div>

                <Input
                  name="otp"
                  label="Verification Code"
                  icon={<Key01Icon />}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  id="otp"
                  type="text"
                  placeholder="Enter verification code"
                  className="transition-all duration-300 hover:border-[#C2EB2C]/50 focus:border-[#C2EB2C]"
                  error={error.includes("otp")}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl font-medium
                                    relative overflow-hidden group transition-all duration-300
                                    bg-gradient-to-r from-[#0C2501] to-[#0C2501]/90
                                    dark:from-[#C2EB2C] dark:to-[#C2EB2C]/90
                                    text-white dark:text-[#0C2501]
                                    hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-[#C2EB2C]/20
                                    disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span
                    className={`flex items-center justify-center gap-2 transition-opacity duration-200
                                    ${isLoading ? "opacity-0" : "opacity-100"}`}
                  >
                    Verify Email
                    <ArrowRight01Icon className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                  {isLoading && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Link03Icon className="w-5 h-5 animate-spin" />
                    </span>
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-sm hover:underline transition-colors duration-200
                                        dark:text-[#C2EB2C]/70 text-[#0C2501]/70
                                        hover:text-[#0C2501] dark:hover:text-[#C2EB2C]"
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}

            {/* Toggle Form Type */}
            <div
              className={`mt-6 text-center transform transition-all duration-300 ease-in-out
                        ${
                          isAnimating
                            ? "translate-y-full opacity-0"
                            : "translate-y-0 opacity-100"
                        }`}
            >
              <button
                onClick={toggleForm}
                className="text-sm hover:underline transition-colors duration-200
                                dark:text-[#C2EB2C]/70 text-[#0C2501]/70
                                hover:text-[#0C2501] dark:hover:text-[#C2EB2C]"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default SyncHub;
