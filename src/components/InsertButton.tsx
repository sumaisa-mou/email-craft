import {useState} from "react";

interface InsertButtonProps {
    onClick: () => void
    isActive?: boolean
}

function InsertButton({ onClick, isActive = false }: InsertButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const isVisible = isHovered || isActive;

    return (
        <div
            className="relative h-6 flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`absolute inset-0 flex items-center transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex-1 h-px bg-blue-400" />
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onClick()
                    }}
                    className="w-6 h-6 rounded-full border-2 border-blue-400 bg-white text-blue-400 flex items-center justify-center text-sm hover:bg-blue-50"
                >
                    +
                </button>
                <div className="flex-1 h-px bg-blue-400" />
            </div>
        </div>
    )
}

export default InsertButton