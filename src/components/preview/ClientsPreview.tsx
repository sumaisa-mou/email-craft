import { useRef, useCallback } from 'react'
import type { Block } from '../../types'
import type { ClientName } from '../../types/health'
import ClientColumn from './ClientColumn'

interface ClientsPreviewProps {
    blocks: Block[]
}

const clients: ClientName[] = ['gmail', 'apple', 'outlook', 'yahoo']

function ClientsPreview({ blocks }: ClientsPreviewProps) {
    const gmailRef = useRef<HTMLDivElement>(null)
    const appleRef = useRef<HTMLDivElement>(null)
    const outlookRef = useRef<HTMLDivElement>(null)
    const yahooRef = useRef<HTMLDivElement>(null)

    const refs: Record<ClientName, React.RefObject<HTMLDivElement | null>> = {
        gmail: gmailRef,
        apple: appleRef,
        outlook: outlookRef,
        yahoo: yahooRef,
    }

    const isScrolling = useRef(false)

    const handleScroll = useCallback((sourceClient: ClientName) => {
        return (e: React.UIEvent<HTMLDivElement>) => {
            if (isScrolling.current) return

            isScrolling.current = true
            const scrollTop = e.currentTarget.scrollTop

            clients.forEach((client) => {
                if (client !== sourceClient) {
                    const el = refs[client].current
                    if (el) {
                        el.scrollTop = scrollTop
                    }
                }
            })

            requestAnimationFrame(() => {
                isScrolling.current = false
            })
        }
    }, [])

    return (
        <div className="flex flex-col gap-4 w-full max-w-6xl">
            {/* Simulated banner */}
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-white font-medium">Simulated</span>
                    <span className="text-white">— rendering quirks applied from known client behavior.</span>
                    <span className="text-white">Not a real-device test.</span>
                </div>
            </div>

            {/* Client columns */}
            <div className="grid grid-cols-4 gap-4 h-[550px]">
                {clients.map((client) => (
                    <ClientColumn
                        key={client}
                        client={client}
                        blocks={blocks}
                        scrollRef={refs[client]}
                        onScroll={handleScroll(client)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ClientsPreview