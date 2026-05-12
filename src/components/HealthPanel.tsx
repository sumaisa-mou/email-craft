import type { HealthResult, ClientName, ClientStatus } from '../types/health'

interface HealthPanelProps {
    result: HealthResult
    onClose: () => void
}

const clientInfo: Record<ClientName, { label: string; color: string; letter: string }> = {
    gmail: { label: 'Gmail', color: 'bg-red-500', letter: 'G' },
    apple: { label: 'Apple', color: 'bg-gray-800', letter: 'A' },
    outlook: { label: 'Outlook', color: 'bg-blue-600', letter: 'O' },
    yahoo: { label: 'Yahoo', color: 'bg-purple-600', letter: 'Y' }
}

const statusIcon: Record<ClientStatus, { icon: string; color: string }> = {
    pass: { icon: '✓', color: 'text-green-500' },
    warning: { icon: '⚠', color: 'text-yellow-500' },
    fail: { icon: '✕', color: 'text-red-500' }
}

function HealthPanel({ result, onClose }: HealthPanelProps) {
    const { score, status, clients, issues } = result

    const statusColors = {
        healthy: 'text-green-500',
        warning: 'text-yellow-500',
        critical: 'text-red-500'
    }

    const barColors = {
        healthy: 'bg-green-500',
        warning: 'bg-yellow-500',
        critical: 'bg-red-500'
    }

    const warnings = issues.filter(i => i.rule.severity === 'warning')
    const errors = issues.filter(i => i.rule.severity === 'error')

    return (
        <div className="absolute top-full text-xs mt-2 right-0 w-96 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
            {/* Score Header */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{score}</span>
                    <span className="text-gray-400">/100</span>
                </div>
                <span className={`font-medium ${statusColors[status]}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
                <div
                    className={`h-full ${barColors[status]} transition-all duration-500`}
                    style={{ width: `${score}%` }}
                />
            </div>

            {/* Client Status Grid */}
            <div className="grid grid-cols-4 gap-2 mb-4">
                {(Object.entries(clients) as [ClientName, ClientStatus][]).map(([client, clientStatus]) => (
                    <div key={client} className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 ${clientInfo[client].color} text-white rounded-lg flex items-center justify-center font-bold mb-1`}>
                            {clientInfo[client].letter}
                        </div>
                        <span className="text-xs text-gray-600">{clientInfo[client].label}</span>
                        <span className={statusIcon[clientStatus].color}>
                            {statusIcon[clientStatus].icon}
                        </span>
                    </div>
                ))}
            </div>

            {/* Errors */}
            {errors.length > 0 && (
                <div className="mb-3">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        {errors.length} {errors.length === 1 ? 'Error' : 'Errors'}
                    </h4>
                    <div className="space-y-2">
                        {errors.map((issue) => (
                            <div key={issue.rule.id} className="flex gap-2 text-sm">
                                <span className="text-red-500">✕</span>
                                <div>
                                    <span className="font-medium">{issue.rule.name}</span>
                                    <span className="text-gray-500"> — {issue.message}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        {warnings.length} {warnings.length === 1 ? 'Warning' : 'Warnings'}
                    </h4>
                    <div className="space-y-2">
                        {warnings.map((issue) => (
                            <div key={issue.rule.id} className="flex gap-2 text-sm">
                                <span className="text-yellow-500">⚠</span>
                                <div>
                                    <span className="font-medium">{issue.rule.name}</span>
                                    <span className="text-gray-500"> — {issue.message}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* No Issues */}
            {issues.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                    <span className="text-2xl">🎉</span>
                    <p className="mt-1">No issues found!</p>
                </div>
            )}
        </div>
    )
}

export default HealthPanel