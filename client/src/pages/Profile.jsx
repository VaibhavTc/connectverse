import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice";
import { toast } from "sonner";
import zxcvbn from "zxcvbn";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [hasEnteredPassword, setHasEnteredPassword] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "username") {
      checkUsernameAvailability(value);
    }

    if (id === "password") {
      setHasEnteredPassword(e.target.value.length > 0);
      checkPasswordStrength(e.target.value);
      setIsPasswordValid(e.target.value.length >= 8);
    }

    if (id === "confirmPassword") {
      setConfirmPassword(value);
      setPasswordMatch(value === formData.password);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameAvailable === false) {
      toast.error("Username is already taken!");
      return;
    }
    if (!passwordMatch) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!isPasswordValid) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      toast.success("Information Updated Successfully");
    } catch (error) {
      dispatch(updateUserFailure(error));
      toast.error("Couldn't update information");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success("Account Deleted Successfully");
    } catch (error) {
      dispatch(deleteUserFailure(error));
      toast.error("Couldn't delete account");
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", { credentials: "include" });
      if (res.ok) {
        dispatch(signOut());
      } else {
        const error = await res.json();
      }
    } catch (error) {}
  };

  const checkPasswordStrength = (password) => {
    const result = zxcvbn(password);
    const score = result.score;
    const strengthLevels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    setPasswordStrength(strengthLevels[score]);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="flex items-center justify-center flex-col">
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
            onClick={() => fileRef.current.click()}
          />
          <button
            type="button"
            className="text-blue-700 text-sm"
            onClick={() => fileRef.current.click()}
          >
            Change Profile Picture
          </button>
        </div>
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <div className="relative">
          <input
            required
            defaultValue={currentUser.username}
            type="text"
            placeholder="Username"
            id="username"
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
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
          disabled={true}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Update Password"
            id="password"
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
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
    </div>
  );
}
