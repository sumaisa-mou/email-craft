import Canvas from "./Canvas.tsx";
function EmailEditor() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <span className='bg-gray-900 text-white px-2 py-1 rounded-lg font-semibold text-sm'>EC</span>
                    <span className='font-semibold text-gray-900'>Email Craft</span>
                </div>
                <div className="flex items-center">
                    <span className='flex items-center gap-2 px-3 py-1.5bg-green-50 border border-green-200 rounded-full text-sm text-green-800'>Health</span>
                </div>
                <div className="flex items-center gap-3">
                    <button className='text-sm text-gray-500 hover:text-gray-900'>Preview</button>
                </div>
            </header>

            <main className="flex-1 p-10 flex justify-center">
                <Canvas/>
            </main>
        </div>
    )
}

export default EmailEditor;