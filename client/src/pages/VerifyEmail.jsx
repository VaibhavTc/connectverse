import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    console.log(token, email);
    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `/api/auth/verify-email?token=${token}&email=${email}`
        );
        const data = await res.json();
        if (data.success) {
          toast.success("Email verified successfully!");
          navigate("/sign-in");
        } else {
          toast.error(data.message || "Verification failed!");
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong during verification.");
        setLoading(false);
      }
    };

    if (token && email) {
      verifyEmail();
    } else {
      toast.error("Invalid verification link.");
      setLoading(false);
    }
  }, [searchParams, navigate]);

  return (
    <div className="p-3 max-w-lg mx-auto text-center">
      <p>dfsdsfd</p>
      {loading ? <p>Verifying email...</p> : <p>Email verification failed.</p>}
    </div>
  );
}
