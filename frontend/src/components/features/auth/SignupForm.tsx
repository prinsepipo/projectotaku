import { NavLink, useNavigate } from "react-router";
import Button from "../../common/Button";
import Input from "../../common/Input";
import * as AuthForm from "./index";
import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { ApiError } from "../../../api/authApi";

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: FormErrors = {};
    if (!username) newErrors.username = "Username is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    setErrors({});
    setServerError("");
    setIsSubmitting(true);

    try {
      await register(username, email, password);
      navigate("/kanban");
    } catch (err) {
      setServerError(
        err instanceof ApiError ? err.message : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthForm.Card>
      <AuthForm.TabGroup>
        <AuthForm.Tab to="/signin">Login</AuthForm.Tab>
        <AuthForm.Tab>Sign Up</AuthForm.Tab>
      </AuthForm.TabGroup>
      <AuthForm.Title>Create an account</AuthForm.Title>
      <AuthForm.Description>
        Start tracking anime for free.
      </AuthForm.Description>
      <form onSubmit={handleSubmit}>
        {serverError && <AuthForm.Alert>{serverError}</AuthForm.Alert>}
        <AuthForm.Field>
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            inputSize="lg"
            value={username}
            error={errors.username !== undefined}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <AuthForm.Error>{errors.username}</AuthForm.Error>
          )}
        </AuthForm.Field>
        <AuthForm.Field>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            inputSize="lg"
            value={email}
            error={errors.email !== undefined}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <AuthForm.Error>{errors.email}</AuthForm.Error>}
        </AuthForm.Field>
        <AuthForm.Field>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            inputSize="lg"
            value={password}
            error={errors.password !== undefined}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <AuthForm.Error>{errors.password}</AuthForm.Error>
          )}
        </AuthForm.Field>
        <AuthForm.Field>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            inputSize="lg"
            value={confirmPassword}
            error={errors.confirmPassword !== undefined}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <AuthForm.Error>{errors.confirmPassword}</AuthForm.Error>
          )}
        </AuthForm.Field>
        <Button type="submit" size="lg" wide disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
      </form>
      <AuthForm.Footer>
        Already have an account? <NavLink to="/signin">Login</NavLink>
      </AuthForm.Footer>
    </AuthForm.Card>
  );
}

export default SignupForm;
