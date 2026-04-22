import AuthLayout from "../components/layout/AuthLayout";
import SigninForm from "../components/features/auth/SigninForm";

function SigninPage() {
  return (
    <div className="singin-page">
      <AuthLayout>
        <SigninForm />
      </AuthLayout>
    </div>
  );
}

export default SigninPage;
