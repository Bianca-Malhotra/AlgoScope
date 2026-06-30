import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { X } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const HAS_CLERK = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)
import { motion, AnimatePresence } from 'framer-motion'

import githubIcon from '../assets/github-mark-white.svg'
import logo from '../assets/logo2.png'
import SearchBar from './SearchBar'
import { useTheme } from '../context/useTheme'
import ModeTabs from './ModeTabs'

const bounceTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 15,
}

const topVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 6 },
}

const middleVariants = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
}

const bottomVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -6 },
}

const Line = ({ variants }) => (
  <motion.div
    className="h-0.5 w-5 bg-current"
    variants={variants}
    transition={bounceTransition}
  />
)

const ThemeToggleButton = ({ compact = false, ...props }) => {
  const { isDark, toggleTheme } = useTheme()
  const label = `Switch to ${isDark ? 'light' : 'dark'} mode`

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`theme-toggle inline-flex items-center justify-center rounded-xl border transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 ${
        compact ? 'h-10 w-10' : 'h-10 w-10 md:h-10 md:w-10'
      }`}
      {...props}
    >
      {isDark ? (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36-1.42 1.42M7.05 16.95l-1.41 1.41m12.72 0-1.42-1.41M7.05 7.05 5.64 5.64M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8z"
          />
        </svg>
      )}
    </button>
  )
}

const algorithmLinks = [
  { name: 'Search', href: '/search', difficulty: 'Beginner' },
  { name: 'Sort', href: '/sort', difficulty: 'Beginner' },
  { name: 'Array Search', href: '/ldssearch', difficulty: 'Beginner' },
  { name: 'Shortest Path', href: '/spath', difficulty: 'Intermediate' },
  { name: 'Abstract Data Types', href: '/adt', difficulty: 'Intermediate' },
  { name: "Kadane's Algorithm", href: '/kadane', difficulty: 'Intermediate' },
  {
    name: "Moore's Voting Algorithm",
    href: '/moore-voting',
    difficulty: 'Intermediate',
  },
  { name: 'Math Theory', href: '/math-theory', difficulty: 'Intermediate' },
  {
    name: 'String Algorithms',
    href: '/string-algorithms',
    difficulty: 'Advanced',
  },
  { name: 'Backtracking', href: '/backtracking', difficulty: 'Advanced' },
  {
    name: 'Dynamic Programming',
    href: '/dynamic-programming',
    difficulty: 'Advanced',
  },
  {
    name: 'DP Optimization Journey',
    href: '/dp-journey',
    difficulty: 'Advanced',
  },
  {
    name: 'Sliding Window',
    href: '/sliding-window',
    difficulty: 'Advanced',
  },
  {
    name: 'Two Pointer Approach',
    href: '/two-pointer',
    difficulty: 'Advanced',
  },
  {
    name: 'Monotonic Stack',
    href: '/monotonic-stack',
    difficulty: 'Advanced',
  },
  { name: 'Practice Sandbox', href: '/practice', difficulty: 'Intermediate' },
  {
    name: 'Guess the Algorithm',
    href: '/challenge',
    difficulty: 'Intermediate',
  },
]

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const [hoveredTab, setHoveredTab] = useState(null)
  const [exploreOpen, setExploreOpen] = useState(false)
  const exploreButtonRef = useRef(null)
  const { isDark } = useTheme()

  const { pathname } = useLocation()
  const isExploreMenuOpen = hoveredTab === 'explore' || exploreOpen
  const isExploreActive = algorithmLinks.some(
    (link) =>
      link.href !== '/practice' &&
      link.href !== '/challenge' &&
      pathname.startsWith(link.href)
  )

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('algo-history')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Failed to parse algo-history:', error)
      return []
    }
  })

  useEffect(() => {
    const current = algorithmLinks.find((link) => link.href === pathname)?.name

    if (current) {
      const timer = setTimeout(() => {
        setHistory((prev) => {
          if (prev[0] === current) return prev
          const updated = [current, ...prev.filter((item) => item !== current)]
          return updated.slice(0, 5)
        })
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  useEffect(() => {
    localStorage.setItem('algo-history', JSON.stringify(history))
  }, [history])

  const closeExploreMenu = useCallback(() => {
    setExploreOpen(false)
    setHoveredTab((current) => (current === 'explore' ? null : current))
  }, [])

  const handleExploreKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setExploreOpen((current) => !current)
      setHoveredTab('explore')
    } else if (event.key === 'Escape') {
      event.preventDefault()
      closeExploreMenu()
      exploreButtonRef.current?.focus()
    }
  }

  const isActive = (path) => {
    if (path === '/prep') return location.pathname === '/' || location.pathname.startsWith('/prep')
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto w-full transition-all duration-200 rounded-2xl border-b border-slate-800/30 backdrop-blur-md bg-slate-900/50 px-4 py-2">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand + Nav */}
        <div className="flex items-center gap-6">
          <Link to="/prep" className="flex items-center gap-3 group">
            <img src={logo} alt="AlgoScope" className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight logo-font">AlgoScope</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/prep"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/prep')
                  ? 'bg-white/8 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.06)]'
                  : 'text-slate-300 hover:text-slate-50 hover:bg-white/2'
              }`}
            >
              Prep
            </Link>

            <Link
              to="/practice"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/practice')
                  ? 'bg-white/8 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.06)]'
                  : 'text-slate-300 hover:text-slate-50 hover:bg-white/2'
              }`}
            >
              Practice
            </Link>

            <Link
              to="/interview"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/interview')
                  ? 'bg-white/8 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.06)]'
                  : 'text-slate-300 hover:text-slate-50 hover:bg-white/2'
              }`}
            >
              Interview Prep
            </Link>
          {/* Desktop Search */}
          <div
            data-tour="search-bar"
            className="hidden md:flex flex-1 justify-center max-w-xs mx-4 z-10"
          >
            <SearchBar onOpen={closeExploreMenu} />
          </div>

          <div className="hidden md:flex items-center gap-6">
            <ul
              className="flex items-center gap-1 relative"
              onMouseLeave={() => setHoveredTab(null)}
            >
              {/* Explore Trigger */}
              <li
                className="relative group py-1.5"
                onMouseEnter={() => setHoveredTab('explore')}
                onBlur={handleExploreBlur}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    event.preventDefault()
                    closeExploreMenu()
                    exploreButtonRef.current?.focus()
                  }
                }}
              >
                <button
                  ref={exploreButtonRef}
                  data-tour="explore-nav"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isExploreMenuOpen}
                  aria-controls="desktop-explore-menu"
                  onClick={() => {
                    setExploreOpen((current) => !current)
                    setHoveredTab('explore')
                  }}
                  onKeyDown={handleExploreKeyDown}
                  className={`relative text-sm font-medium px-4 py-1.5 rounded-lg transition-all duration-300 z-10 cursor-pointer ${
                    isExploreActive
                      ? 'text-indigo-600 dark:text-indigo-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  Explore
                </button>
                {isExploreMenuOpen && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-slate-200/50 dark:bg-slate-900/60 border border-slate-300/30 dark:border-slate-800/50 rounded-lg -z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}


            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/about')
                  ? 'bg-white/8 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.06)]'
                  : 'text-slate-300 hover:text-slate-50 hover:bg-white/2'
              }`}
            >
              About
            </Link>

            <Link
              to="/challenge"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/challenge')
                  ? 'bg-white/8 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.06)]'
                  : 'text-slate-300 hover:text-slate-50 hover:bg-white/2'
              }`}
            >
              Challenge
            </Link>
          </nav>
        </div>
              {/* Top Level Link: Practice */}
              <li
                className="relative py-1.5"
                onMouseEnter={() => setHoveredTab('favorites')}
              >
                <Link
                  to="/favorites"
                  data-tour="favorites-nav"
                  className={`relative text-sm font-medium px-4 py-1.5 rounded-lg transition-all duration-300 z-10 ${
                    pathname === '/favorites'
                      ? 'text-indigo-600 dark:text-indigo-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  Favorites
                </Link>
                {hoveredTab === 'favorites' && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-slate-200/50 dark:bg-slate-900/60 border border-slate-300/30 dark:border-slate-800/50 rounded-lg -z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </li>
              {/* Top Level Link: Concepts */}
              <li
                className="relative py-1.5"
                onMouseEnter={() => setHoveredTab('concepts')}
              >
                <Link
                  to="/concepts"
                  className={`relative text-sm font-medium px-4 py-1.5 rounded-lg transition-all duration-300 z-10 ${
                    pathname === '/concepts'
                      ? 'text-indigo-600 dark:text-indigo-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  Concepts
                </Link>
                {hoveredTab === 'concepts' && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-slate-200/50 dark:bg-slate-900/60 border border-slate-300/30 dark:border-slate-800/50 rounded-lg -z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </li>

              <li
                className="relative py-1.5"
                onMouseEnter={() => setHoveredTab('practice')}
              >
                <Link
                  to="/practice"
                  data-tour="practice-nav"
                  className={`relative text-sm font-medium px-4 py-1.5 rounded-lg transition-all duration-300 z-10 ${
                    pathname === '/practice'
                      ? 'text-indigo-600 dark:text-indigo-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  Practice
                </Link>
                {hoveredTab === 'practice' && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-slate-200/50 dark:bg-slate-900/60 border border-slate-300/30 dark:border-slate-800/50 rounded-lg -z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </li>

          {/* Right (desktop): Search, Theme, Github, Sign In */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-64">
              <SearchBar />
            </div>

            <ThemeToggleButton data-tour="theme-toggle" />

            <a
              href="https://github.com/algoscope-hq/AlgoScope"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-transparent hover:bg-white/2 transition-all duration-200"
              aria-label="GitHub"
            >
              <img src={githubIcon} alt="Github" className="w-5 h-5" />
            </a>

            <div className="ml-2">
              {HAS_CLERK ? (
                <>
                  <SignedOut>
                    <SignInButton
                      mode="modal"
                      appearance={{ baseTheme: isDark ? dark : undefined }}
                    >
                      <button className="theme-button-primary relative group overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 px-6 py-2 text-sm font-bold transition-all duration-300 shadow-md active:scale-95">
                        <span className="relative z-10">Sign In</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </SignInButton>
                  </SignedOut>

                  <SignedIn>
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox:
                            'w-9 h-9 border border-white/10 shadow-xl',
                        },
                      }}
                    />
                  </SignedIn>
                </>
              ) : (
                <>
                  <button
                    title="Auth not configured"
                    disabled
                    className="theme-button-primary relative group overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-200 px-6 py-2 text-sm font-bold transition-all duration-300 shadow-md opacity-50 cursor-not-allowed"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggleButton compact />

            {HAS_CLERK && (
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: 'w-8 h-8 border border-white/10',
                    },
                  }}
                />
              </SignedIn>
            )}

            <motion.button
              type="button"
              data-tour="mobile-menu-btn"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              animate={open ? 'open' : 'closed'}
              className="inline-flex flex-col items-center justify-center gap-1 rounded-lg p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors"
            >
              <Line variants={topVariants} />
              <Line variants={middleVariants} />
              <Line variants={bottomVariants} />
            </motion.button>
          </div>
        </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
            />
            {/* Slide-out Drawer Panel */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800/80 p-6 shadow-2xl backdrop-blur-2xl z-50 md:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/80">
                <Link
                  to="/prep"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                >
                  <img src={logo} alt="AlgoScope Logo" className="w-8 h-8" />
                  <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white logo-font">
                    AlgoScope
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Body - Scrollable */}
              <div className="flex-grow overflow-y-auto space-y-6 pr-2">
                <div className="w-full">
                  <SearchBar onOpen={closeExploreMenu} />
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3 px-2">
                    Modes
                  </h3>
                  <ModeTabs mobile onNavigate={() => setOpen(false)} />
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3 px-2">
                    Interview Prep
                  </h3>
                  <Link
                    to="/interview"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-50 dark:hover:bg-slate-900 transition-all duration-200"
                  >
                    Interview Prep Mode
                  </Link>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3 px-2">
                    Games
                  </h3>
                  <Link
                    to="/challenge"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-50 dark:hover:bg-slate-900 transition-all duration-200"
                  >
                    Guess the Algorithm
                  </Link>
                </div>

                <div className="flex justify-center pt-2">
                  <Link
                    to="/about"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/90 px-5 py-2 text-sm font-semibold text-slate-600 transition-all duration-300 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-slate-100"
                  >
                    About
                  </Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
                {HAS_CLERK ? (
                  <SignedOut>
                    <SignInButton
                      mode="modal"
                      appearance={{ baseTheme: isDark ? dark : undefined }}
                    >
                      <button className="w-full relative group overflow-hidden rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 active:scale-[0.98]">
                        <span className="relative z-10">Sign In</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </SignInButton>
                  </SignedOut>
                ) : (
                  <button
                    title="Auth not configured"
                    disabled
                    className="w-full rounded-xl bg-slate-100 dark:bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-500 border border-slate-200 dark:border-slate-800 transition-all duration-300 opacity-50 cursor-not-allowed"
                  >
                    Sign In
                  </button>
                )}

                <a
                  href="https://github.com/algoscope-hq/AlgoScope"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all duration-300 shadow-md active:scale-95"
                >
                  <img
                    src={githubIcon}
                    alt="Github Repository Link"
                    className="w-5 h-5 dark:invert-0 invert"
                  />
                  <span>Github</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
