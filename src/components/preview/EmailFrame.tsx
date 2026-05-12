interface EmailFrameProps {
    width?: number
    children: React.ReactNode
}

function EmailFrame({ width = 600, children }: EmailFrameProps) {
    return (
        <div
            className="bg-white rounded-lg shadow-2xl overflow-hidden"
            style={{ width: `${width}px` }}
        >
            {/* Mac window header with dots */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-gray-500">Inbox · demo@acme.com</span>
            </div>

            {/* Email header */}
            <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                    Welcome to EmailCraft — let's get started
                </h2>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                            EC
                        </div>
                        <div>
                            <span className="font-medium text-gray-900">EmailCraft Team</span>
                            <span className="text-gray-500 text-sm ml-1">&lt;hello@emailcraft.app&gt;</span>
                        </div>
                    </div>
                    <span className="text-gray-400 text-sm">May 11, 11:24 AM</span>
                </div>
            </div>

            {/* Email content */}
            <div className="p-6">
                {children}
            </div>
        </div>
    )
}

export default EmailFrame