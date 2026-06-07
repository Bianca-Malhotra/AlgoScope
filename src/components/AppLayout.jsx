import React from 'react'
import { Navbar } from './Navbar'
import Footer from './Footer'
import { motion } from 'framer-motion'
import SeoHead from './SeoHead'
import Breadcrumbs from './Breadcrumbs'
import ScrollToTopButton from './ScrollToTopButton'
import AlgorithmNotes from './notes/AlgorithmNotes'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useMode } from '../context/useMode'

const MODE_ROUTES = [
  {
    mode: 'prep',
    test: (pathname) => pathname === '/' || pathname === '/prep',
  },
  {
    mode: 'practice',
    test: (pathname) =>
      pathname === '/practice' ||
      pathname === '/challenge' ||
      pathname.startsWith('/practice/'),
  },
  {
    mode: 'about',
    test: (pathname) => pathname === '/about' || pathname.startsWith('/about/'),
  },
  {
    mode: 'prep',
    test: (pathname) =>
      [
        '/search',
        '/math-theory',
        '/spath',
        '/sort',
        '/ldssearch',
        '/adt',
        '/kadane',
        '/moore-voting',
        '/backtracking',
        '/dynamic-programming',
        '/dp-journey',
        '/string-algorithms',
        '/operating-systems',
      ].some((route) => pathname === route || pathname.startsWith(`${route}/`)),
  },
]

const ModeSync = () => {
  const { pathname } = useLocation()
  const { activeMode, setActiveMode } = useMode()

  useEffect(() => {
    const match = MODE_ROUTES.find(({ test }) => test(pathname))

    if (match && match.mode !== activeMode) {
      setActiveMode(match.mode)
    }
  }, [activeMode, pathname, setActiveMode])

  return null
}

const Background = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <div className="theme-grid absolute inset-0 bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
  </div>
)

export default function AppLayout({
  children,
  showBackground = true,
  notesKey,
}) {
  return (
    <motion.div
      className="theme-app min-h-screen flex flex-col relative overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SeoHead />
      <ModeSync />

      {showBackground && <Background />}

      <div className="flex-1 flex flex-col gap-4 p-2 sm:p-4 z-10">
        <Navbar />

        <Breadcrumbs />

        {notesKey ? (
          <AlgorithmNotes key={notesKey} storageKey={notesKey} />
        ) : null}

        <div className="flex-1">{children}</div>

        <Footer />
        <ScrollToTopButton />
      </div>
    </motion.div>
  )
}
