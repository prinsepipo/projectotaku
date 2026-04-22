import AuthLayout from "../components/layout/AuthLayout";
import SignupForm from "../components/features/auth/SignupForm";

function SigninPage() {
  return (
    <div className="signup-page">
      <AuthLayout>
        <SignupForm />
      </AuthLayout>
    </div>
  );
}

export default SigninPage;
