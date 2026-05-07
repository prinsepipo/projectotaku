import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import Logo from "../components/brand/Logo";
import FluidContainer from "../components/layout/FLuidContainer";
import KanbanBoard from "../components/features/kanban/KanbanBoard";
import { useAuth } from "../hooks/useAuth";
import "./KanbanPage.css";

function KanbanPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    setUserMenuOpen(false);
    await logout();
    navigate("/signin");
  }

  return (
    <div className="kanban-page">
      <nav className="board-navbar">
        <FluidContainer className="board-navbar__inner">
          <Logo />
          <button
            className="board-navbar__search-pill"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <Search size={14} />
            Search anime...
          </button>
          <div className="board-navbar__user-wrapper" ref={userMenuRef}>
            <button
              className="board-navbar__user"
              onClick={() => setUserMenuOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={userMenuOpen}
            >
              <div className="board-navbar__avatar">
                {user?.username[0].toUpperCase()}
              </div>
              <span className="board-navbar__username">{user?.username}</span>
              <ChevronDown
                size={14}
                className={`board-navbar__chevron${userMenuOpen ? " board-navbar__chevron--open" : ""}`}
              />
            </button>
            {userMenuOpen && (
              <div className="board-navbar__dropdown" role="menu">
                <button
                  className="board-navbar__dropdown-item board-navbar__dropdown-item--danger"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  <LogOut size={14} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </FluidContainer>
      </nav>

      <KanbanBoard
        searchOpen={searchOpen}
        onSearchOpen={() => setSearchOpen(true)}
        onSearchClose={() => setSearchOpen(false)}
      />
    </div>
  );
}

export default KanbanPage;
