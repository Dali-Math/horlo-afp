// components/Navigation.tsx
'use client';

import React from 'react';

interface NavigationProps {
  onThemeToggle: () => void;
  theme: 'light' | 'dark';
}

export function Navigation({ onThemeToggle, theme }: NavigationProps) {
  return (
    <header className="nav-header">
      <div className="nav-container">
        <a href="#hero" className="nav-logo">
          HorloLearn
        </a>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#chronologie" className="nav-link">
                Chronologie
              </a>
            </li>
            <li>
              <a href="#geographie" className="nav-link">
                Géographie
              </a>
            </li>
            <li>
              <a href="#manufactures" className="nav-link">
                Manufactures
              </a>
            </li>
            <li>
              <button
                onClick={onThemeToggle}
                className="theme-toggle"
                aria-label="Basculer entre mode clair et sombre"
              >
                {theme === 'dark' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" strokeWidth="2" />
                    <line x1="12" y1="21" x2="12" y2="23" strokeWidth="2" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="2" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="2" />
                    <line x1="1" y1="12" x2="3" y2="12" strokeWidth="2" />
                    <line x1="21" y1="12" x2="23" y2="12" strokeWidth="2" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="2" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
