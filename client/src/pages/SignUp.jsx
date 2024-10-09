import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import OAuth from "../components/OAuth";
import validator from "validator";
import zxcvbn from "zxcvbn";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [hasEnteredPassword, setHasEnteredPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    if (e.target.id === "username") {
      checkUsernameAvailability(e.target.value);
    }

    if (e.target.id === "password") {
      setHasEnteredPassword(e.target.value.length > 0);
      checkPasswordStrength(e.target.value);
      setIsPasswordValid(e.target.value.length >= 8);
    }

    if (e.target.id === "email") {
      setEmailValid(validator.isEmail(e.target.value));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const checkUsernameAvailability = async (username) => {
    if (!username) return;
    setCheckingUsername(true);
    try {
      const res = await fetch("/api/auth/check-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      setUsernameAvailable(data.available);
    } catch (error) {
      setUsernameAvailable(false);
    }
    setCheckingUsername(false);
  };

  const checkEmailAvailability = async (email) => {
    try {
      const res = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return data.available;
    } catch (error) {
      return false;
    }
  };

  const checkPasswordStrength = (password) => {
    const result = zxcvbn(password);
    const score = result.score;
    const strengthLevels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    setPasswordStrength(strengthLevels[score]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match!");
      return;
    }

    if (usernameAvailable === false) {
      setError("Username is already taken");
      toast.error("Username is already taken!");
      return;
    }

    if (!emailValid) {
      toast.error("Invalid email format!");
      return;
    }

    if (!isPasswordValid) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    const isEmailAvailable = await checkEmailAvailability(formData.email);
    if (!isEmailAvailable) {
      setError("Email is already registered");
      toast.error("Email is already registered!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError("Something went wrong");
        toast.error("Something went wrong!");
        return;
      }
      toast.success("Signup successful!");
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
      toast.error("Something went wrong!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Username"
            id="username"
            required
            className="bg-slate-100 p-3 rounded-lg w-full"
            onChange={handleChange}
          />
          <span className="absolute right-3 top-3 text-slate-500">
            {checkingUsername
              ? "Checking..."
              : usernameAvailable === null
              ? ""
              : usernameAvailable
              ? "✔️ Available"
              : "❌ Taken"}
          </span>
        </div>
        <input
          type="email"
          placeholder="Email"
          id="email"
          required
          className={`bg-slate-100 p-3 rounded-lg ${
            !emailValid ? "border-red-500" : ""
          }`}
          onChange={handleChange}
        />
        {!emailValid && (
          <p className="text-red-500 text-sm">Invalid email format</p>
        )}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            required
            className={`bg-slate-100 p-3 rounded-lg w-full ${
              !isPasswordValid ? "border-red-500" : ""
            }`}
            onChange={handleChange}
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-slate-500"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        {!isPasswordValid && (
          <p className="text-red-500 text-sm">
            Password must be at least 8 characters long
          </p>
        )}
        {hasEnteredPassword && (
          <p
            className={`text-sm ${
              passwordStrength === "Weak"
                ? "text-red-500"
                : passwordStrength === "Fair"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            Password Strength: {passwordStrength}
          </p>
        )}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            required
            className="bg-slate-100 p-3 rounded-lg w-full"
            onChange={handleConfirmPasswordChange}
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-slate-500"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </span>
        </div>
        <button
          disabled={
            loading ||
            usernameAvailable === false ||
            !emailValid ||
            !isPasswordValid
          }
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
}