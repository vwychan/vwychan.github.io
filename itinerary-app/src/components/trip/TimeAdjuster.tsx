import { useState, useEffect, useRef } from 'react';

interface TimeAdjusterProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (minutes: number) => void;
    onReset: () => void;
}

export function TimeAdjuster({ isOpen, onClose, onApply, onReset }: TimeAdjusterProps) {
    const [delay, setDelay] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-paper-cream p-6 rounded-xl shadow-2xl w-full max-w-sm border-4 border-accent-gold animate-in fade-in zoom-in duration-200">
                <h3 className="text-xl font-bold text-accent-red mb-4 flex items-center gap-2">
                    ⏰ 調整時間
                </h3>

                <div className="mb-6">
                    <label className="block text-ink-medium mb-2 text-sm">
                        延遲分鐘數（輸入負數可提前）：
                    </label>
                    <input
                        ref={inputRef}
                        type="number"
                        className="w-full p-3 text-lg border-2 border-accent-blue/30 rounded focus:border-accent-blue focus:outline-none bg-white text-ink-dark"
                        value={delay}
                        onChange={(e) => setDelay(parseInt(e.target.value) || 0)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onApply(delay);
                                onClose();
                            }
                        }}
                        step={15}
                        min={-999}
                        max={999}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => {
                            onApply(delay);
                            onClose();
                        }}
                        className="w-full py-3 bg-accent-red text-white font-bold rounded hover:bg-red-700 transition shadow-lg active:transform active:scale-95"
                    >
                        套用
                    </button>
                    <button
                        onClick={() => {
                            onReset();
                            onClose();
                        }}
                        className="w-full py-2 bg-accent-gold text-white font-bold rounded hover:bg-yellow-600 transition shadow active:transform active:scale-95"
                    >
                        重置為原時間
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-2 text-ink-light hover:text-ink-dark transition text-sm"
                    >
                        取消
                    </button>
                </div>
            </div>
        </div>
    );
}
