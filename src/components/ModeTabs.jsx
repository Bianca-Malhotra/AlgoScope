import { Link } from 'react-router-dom'
import { useMode } from '../context/useMode'

const MODES = [
  {
    key: 'prep',
    label: 'Prep',
    href: '/prep',
  },
  {
    key: 'practice',
    label: 'Practice',
    href: '/practice',
  },
  {
    key: 'about',
    label: 'About',
    href: '/about',
  },
  {
    key: 'interview',
    label: 'Interview',
    href: '/interview',
  },
]

export default function ModeTabs({ mobile = false, onNavigate }) {
  const { activeMode, setActiveMode } = useMode()

  return (
    <div
      className={mobile ? 'flex flex-col gap-2' : 'flex flex-nowrap items-center gap-1'}
    >
      {MODES.map((mode) => {
        const isActive = activeMode === mode.key

        return (
          <Link
            key={mode.key}
            to={mode.href}
            onClick={() => {
              setActiveMode(mode.key)
              onNavigate?.()
            }}
            aria-current={isActive ? 'page' : undefined}
            className={`group relative rounded-xl border px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              mobile ? 'w-full text-left' : 'min-w-0'
            } ${
              isActive
                ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.14)]'
                : 'border-slate-200/80 bg-white/55 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800/80 dark:bg-slate-950/55 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-100'
            }`}
          >
            <span className="block tracking-tight">{mode.label}</span>
          </Link>
        )
      })}

    </div>
  )
}