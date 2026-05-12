import type { Block } from '../../types'
import type { ClientName } from '../../types/health'
import { clientQuirks, clientInfo } from '../../utils/clientQuirks'
import ClientPreviewBlocks from './ClientPreviewBlocks'
import * as React from 'react'

interface ClientColumnProps {
    client: ClientName
    blocks: Block[]
    scrollRef: React.RefObject<HTMLDivElement | null>
    onScroll: (e: React.UIEvent<HTMLDivElement>) => void
}

function countIssues(blocks: Block[], quirks: typeof clientQuirks.outlook): number {
    let count = 0
    blocks.forEach((block) => {
        if (block.type === 'hero' && quirks.noGradient) count++
        if (block.type === 'button' && quirks.noBorderRadius) count++
    })
    return count
}

function ClientColumn({ client, blocks, scrollRef, onScroll }: ClientColumnProps) {
    const quirks = clientQuirks[client]
    const info = clientInfo[client]
    const issueCount = countIssues(blocks, quirks)

    return (
        <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-lg">
            {/* Client header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: info.color }}
                    >
                        {info.name.charAt(0)}
                    </span>
                    <span className="text-gray-900 text-sm font-medium">{info.name}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    issueCount > 0
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-green-100 text-green-600'
                }`}>
                    {issueCount > 0 ? `${issueCount} issues` : '✓ clean'}
                </span>
            </div>

            {/* Email header */}
            <div className="px-4 py-3 border-b border-gray-100">
                <div className="text-sm font-medium text-gray-900 truncate">
                    Welcome to EmailCraft — let's get started
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    EmailCraft Team · May 11
                </div>
            </div>

            {/* Email content */}
            <div
                ref={scrollRef}
                onScroll={onScroll}
                className="flex-1 overflow-auto p-4 bg-white"
            >
                <ClientPreviewBlocks blocks={blocks} quirks={quirks} />
            </div>
        </div>
    )
}

export default ClientColumn