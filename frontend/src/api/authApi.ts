const API_BASE = "http://localhost:8000";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (res.status === 204) return null as T;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      typeof body.errors === "string"
        ? body.errors
        : typeof body.detail === "string"
          ? body.detail
          : "Something went wrong.";
    throw new ApiError(res.status, message);
  }
  return body as T;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterResponse extends UserResponse {
  access_token: string;
}

export async function apiLogin(
  username: string,
  password: string,
): Promise<TokenResponse> {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function apiRegister(
  username: string,
  email: string,
  password: string,
): Promise<RegisterResponse> {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}

export async function apiLogout(): Promise<void> {
  return apiFetch("/auth/refresh", { method: "DELETE" });
}

export function bearerHeaders(accessToken: string) {
  return { Authorization: `Bearer ${accessToken}` };
}

export function jsonBearerHeaders(accessToken: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function apiMe(accessToken: string): Promise<UserResponse> {
  return apiFetch("/auth/me", { headers: bearerHeaders(accessToken) });
}

export async function apiRefresh(): Promise<TokenResponse> {
  return apiFetch("/auth/refresh", { method: "POST" });
}
