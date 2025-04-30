import { FC, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export const CustomModal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white pb-[50px] rounded-[4px] shadow-xl w-full max-w-md p-[30px] relative"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 text-[18px] cursor-pointer right-6 text-gray-500 hover:text-gray-800 text-xl"
                        >
                            &times;
                        </button>

                        {title && <h2 className="text-[28px] text-center mt-[20px] font-semibold mb-4">{title}</h2>}

                        <div>{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
