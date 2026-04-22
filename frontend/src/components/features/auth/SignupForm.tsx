import { NavLink, useNavigate } from "react-router";
import Button from "../../common/Button";
import Input from "../../common/Input";
import * as AuthForm from "./index";
import React, { useState } from "react";

interface FormErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
}

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();

  const register = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password || !confirmPassword) {
      setErrors({
        username: username ? undefined : "Username is required.",
        password: password ? undefined : "Password is required.",
        confirmPassword: confirmPassword
          ? undefined
          : "Confirm password is required.",
      });

      return;
    }

    if (password !== confirmPassword) {
      setErrors({
        confirmPassword: "Confirm password does not match password.",
      });

      return;
    }

    setErrors({});
    setUsername("");
    setPassword("");
    setConfirmPassword("");

    navigate("/kanban");
  };

  return (
    <AuthForm.Card>
      <AuthForm.TabGroup>
        <AuthForm.Tab>Login</AuthForm.Tab>
        <AuthForm.Tab active>Sign Up</AuthForm.Tab>
      </AuthForm.TabGroup>
      <AuthForm.Title>Create an account</AuthForm.Title>
      <AuthForm.Description>
        Start tracking anime for free.
      </AuthForm.Description>
      <form onSubmit={register}>
        <AuthForm.Field>
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            inputSize="lg"
            value={username}
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
            type="password"
            placeholder="Enter your password"
            inputSize="lg"
            value={password}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <AuthForm.Error>{errors.confirmPassword}</AuthForm.Error>
          )}
        </AuthForm.Field>
        <Button type="submit" size="lg" wide>
          Create Account
        </Button>
      </form>
      <AuthForm.Footer>
        Already have an account? <NavLink to="/signin">Login</NavLink>
      </AuthForm.Footer>
    </AuthForm.Card>
  );
}

export default SignupForm;
