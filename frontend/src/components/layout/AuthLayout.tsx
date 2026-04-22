import type React from "react";

import "./AuthLayout.css";

function AuthLayout({ children }: React.PropsWithChildren<object>) {
  return (
    <div className="auth-layout">
      <div className="auth-pane-left">
        <h1 className="auth-title">⛩ ProjectOtaku</h1>
        <h3 className="auth-heading">
          Your Anime Board
          <br />
          Awaits You
        </h3>
        <p className="auth-detail">Sign in to access your watchlist.</p>
      </div>
      <div className="auth-pane-right">{children}</div>
    </div>
  );
}

export default AuthLayout;
