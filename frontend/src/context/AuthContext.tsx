import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  type UserResponse,
  apiLogin,
  apiLogout,
  apiMe,
  apiRefresh,
  apiRegister,
} from "../api/authApi";
import { AuthContext, type AuthContextValue } from "../hooks/useAuth";

interface AuthState {
  user: UserResponse | null;
  accessToken: string | null;
  isLoading: boolean;
}

// Refresh 1 minute before the 15-min access token TTL
const REFRESH_INTERVAL_MS = 14 * 60 * 1000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
  });

  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Prevent double-run in StrictMode
  const initialized = useRef(false);

  const clearRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, []);

  // Ref holds the latest scheduler so the setTimeout callback can call it
  // without creating a circular reference in the useCallback dep array.
  const scheduleTokenRefreshRef = useRef<() => void>(null!);

  const scheduleTokenRefresh = useCallback(() => {
    clearRefreshTimer();
    refreshTimerRef.current = setTimeout(async () => {
      try {
        const token = await apiRefresh();
        setState((prev) => ({ ...prev, accessToken: token.access_token }));
        scheduleTokenRefreshRef.current();
      } catch {
        clearRefreshTimer();
        setState({ user: null, accessToken: null, isLoading: false });
      }
    }, REFRESH_INTERVAL_MS);
  }, [clearRefreshTimer]);

  useLayoutEffect(() => {
    scheduleTokenRefreshRef.current = scheduleTokenRefresh;
  });

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    apiRefresh()
      .then(async (token) => {
        const user = await apiMe(token.access_token);
        setState({ user, accessToken: token.access_token, isLoading: false });
        scheduleTokenRefresh();
      })
      .catch(() => {
        setState({ user: null, accessToken: null, isLoading: false });
      });

    return () => clearRefreshTimer();
  }, [scheduleTokenRefresh, clearRefreshTimer]);

  async function login(username: string, password: string) {
    const token = await apiLogin(username, password);
    const user = await apiMe(token.access_token);
    setState({ user, accessToken: token.access_token, isLoading: false });
    scheduleTokenRefresh();
  }

  async function register(username: string, email: string, password: string) {
    const res = await apiRegister(username, email, password);
    setState({
      user: {
        id: res.id,
        username: res.username,
        email: res.email,
      } satisfies AuthContextValue["user"],
      accessToken: res.access_token,
      isLoading: false,
    });
    scheduleTokenRefresh();
  }

  async function logout() {
    clearRefreshTimer();
    try {
      await apiLogout();
    } catch {
      // Best-effort: clear local state even if server-side revocation failed.
    }
    setState({ user: null, accessToken: null, isLoading: false });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
