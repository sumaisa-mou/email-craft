interface HealthBadgeProps {
    score: number
    status: 'healthy' | 'warning' | 'critical'
    isOpen: boolean
    onClick: () => void
}

function HealthBadge({ score, status, isOpen, onClick }: HealthBadgeProps) {
    const colors = {
        healthy: 'text-green-500',
        warning: 'text-yellow-500',
        critical: 'text-red-500'
    }

    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full
  shadow-sm border border-gray-200 hover:shadow-md transition-shadow !text-xs"
        >
            <span className={`text-sm ${colors[status]}`}>●</span>
            <span className="font-medium">Health</span>
            <span className="font-bold">{score}/100</span>
            {status === 'healthy' && <span className="text-green-500">✓</span>}
            <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                  ▾
              </span>
        </button>
    )
}

export default HealthBadge