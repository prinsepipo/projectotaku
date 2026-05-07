import { NavLink, useNavigate } from "react-router";
import Button from "../../common/Button";
import Input from "../../common/Input";
import * as AuthForm from "./index";
import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { ApiError } from "../../../api/authApi";

interface FormErrors {
  username?: string;
  password?: string;
}

function SigninForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setErrors({
        username: username ? undefined : "Username is required.",
        password: password ? undefined : "Password is required.",
      });
      return;
    }

    setErrors({});
    setServerError("");
    setIsSubmitting(true);

    try {
      await login(username, password);
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
        <AuthForm.Tab>Login</AuthForm.Tab>
        <AuthForm.Tab to="/signup">Sign Up</AuthForm.Tab>
      </AuthForm.TabGroup>
      <AuthForm.Title>Welcome</AuthForm.Title>
      <AuthForm.Description>
        Enter your credentials to continue.
      </AuthForm.Description>
      <form onSubmit={handleSubmit}>
        {serverError && <AuthForm.Alert>{serverError}</AuthForm.Alert>}
        <AuthForm.Field>
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            inputSize="lg"
            type="text"
            placeholder="Enter your username"
            value={username}
            error={errors.username !== undefined}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <AuthForm.Error>{errors.username}</AuthForm.Error>
          )}
        </AuthForm.Field>
        <AuthForm.Field>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            inputSize="lg"
            type="password"
            placeholder="Enter your password"
            value={password}
            error={errors.password !== undefined}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <AuthForm.Error>{errors.password}</AuthForm.Error>
          )}
        </AuthForm.Field>
        <Button type="submit" size="lg" wide disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <AuthForm.Footer>
        Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
      </AuthForm.Footer>
    </AuthForm.Card>
  );
}

export default SigninForm;
