/** @format */

import React, { useState } from "react";
import SearchBar from "../components/Searchbar";
// import { supabase } from "../supabaseClient";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, XIcon } from "lucide-react";

const Header = ({ searchTerm, onSearchChange, coins = [], onCoinSelect }) => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4 font-primary">
        <div className="flex justify-between items-center gap-6">
          {/* Title Section */}
          <div className="flex-shrink-0 ">
            <h1 className="text-lg font-bold text-white">Kipro Currency</h1>
            <p className="text-sm text-gray-400 hidden md:flex">
              Real-time cryptocurrency tracker
            </p>
          </div>

          {/* Desktop navigation  */}
          <nav className="hidden md:flex gap-6 items-center">
            <ul className="flex gap-5">
              {/* Home - Always visible */}
              <li className="text-white font-bold">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400"
                      : "hover:text-blue-400 transition-colors"
                  }
                >
                  Home
                </NavLink>
              </li>

              {/* Conditional links based on auth state */}
              {!loading && (
                <>
                  {/* Show these links only when user is logged in */}
                  {user && (
                    <>
                      <li className="text-white font-bold">
                        <NavLink
                          to="/watchlist"
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-400"
                              : "hover:text-blue-400 transition-colors"
                          }
                        >
                          Watchlist
                        </NavLink>
                      </li>
                      <li className="text-white font-bold">
                        <NavLink
                          to="/profile"
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-400"
                              : "hover:text-blue-400 transition-colors"
                          }
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li className="text-white font-bold">
                        <button
                          onClick={handleSignOut}
                          className="cursor-pointer text-white font-bold "
                        >
                          Sign Out
                        </button>
                      </li>
                    </>
                  )}
                  {/* Show Market link only when user is NOT logged in */}
                  {!user && (
                    <li className="text-white font-bold">
                      <NavLink
                        to="#market" // This will still work for scrolling to the section
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-blue-300" : "hover:text-blue-300"
                          } text-white transition-colors`
                        }
                      >
                        Market
                      </NavLink>
                    </li>
                  )}

                  {/* Show Join Now only when user is NOT logged in */}
                  {!user && (
                    <li className="text-white font-bold">
                      <NavLink
                        to="/signin"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-blue-300" : " hover:text-blue-300"
                          }  text-white  transition-colors`
                        }
                      >
                        Join Now
                      </NavLink>
                    </li>
                  )}
                </>
              )}
            </ul>
          </nav>
          {/* </> */}

          {/* Search Bar Section */}
          <div className="max-w-full hidden md:flex">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              coins={coins}
              onCoinSelect={onCoinSelect}
            />
          </div>

          {/* menu icon */}
          <button onClick={toggleMobileMenu} className="text-white md:hidden">
            {isMobileMenuOpen ? <XIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navbar */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white px-4 py-3 space-y-4 border-t border-gray-700">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="block hover:text-blue-400"
          >
            Home
          </NavLink>

          {!loading && user && (
            <>
              <NavLink
                to="/watchlist"
                onClick={closeMobileMenu}
                className="block hover:text-blue-400"
              >
                Watchlist
              </NavLink>
              <NavLink
                to="/profile"
                onClick={closeMobileMenu}
                className="block hover:text-blue-400"
              >
                Profile
              </NavLink>
              <button
                onClick={handleSignOut}
                className="block text-left hover:text-blue-400"
              >
                Sign Out
              </button>
            </>
          )}

          {!loading && !user && (
            <>
              <NavLink
                to="#market"
                onClick={closeMobileMenu}
                className="block hover:text-blue-400"
              >
                Market
              </NavLink>
              <NavLink
                to="/signin"
                onClick={closeMobileMenu}
                className="block hover:text-blue-400"
              >
                Join Now
              </NavLink>
            </>
          )}

          {/* SearchBar for mobile */}
          <div className="pt-2">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              coins={coins}
              onCoinSelect={onCoinSelect}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
