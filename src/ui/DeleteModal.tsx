import { FC, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDeleteClick?: () => void;
}

export const DeleteModal: FC<DeleteModalProps> = ({ isOpen, onClose, onDeleteClick }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                >
                    <motion.div
                        className="absolute inset-0 bg-black/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <h2 className="mb-4 text-xl font-bold text-gray-800 text-center">Confirm Deletion</h2>
                        <p className="mb-6 text-center text-gray-700">
                            Are you sure you want to delete this item?
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={onDeleteClick}
                                className="w-full rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
