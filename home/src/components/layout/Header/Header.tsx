import { useState } from 'react'
import type { NavItem } from '../../../types'
import './Header.scss'

interface HeaderProps {
  navLinks: NavItem[]
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
      <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
      <path
        d="M2 3h2l2 9.5a1.2 1.2 0 0 0 1.2 1h7a1.2 1.2 0 0 0 1.2-1L17 6H5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="17" r="1.2" fill="currentColor" />
      <circle cx="14.5" cy="17" r="1.2" fill="currentColor" />
    </svg>
  )
}

export default function Header({ navLinks }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="header">
        <img src="/logo.png" alt="Discount Nutrition" className="header__logo" />

        <nav className="header__nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button key={link.label} className="header__nav-link">
              {link.label}
              {link.hasDropdown && ' ▾'}
            </button>
          ))}
        </nav>

        <div className="header__actions">
          <button className="header__search-btn" aria-label="Search">
            <SearchIcon />
          </button>
          <button className="header__login-btn">Member Login</button>
          <button className="header__cart-btn" aria-label="Cart">
            <CartIcon />
          </button>
          <button
            className="header__hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="header__mobile-menu">
          <div
            className="header__mobile-backdrop"
            onClick={() => setMenuOpen(false)}
          />
          <div className="header__mobile-drawer">
            <button
              className="header__mobile-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            {navLinks.map((link) => (
              <button key={link.label} className="header__mobile-link">
                {link.label} {link.hasDropdown && '▾'}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
