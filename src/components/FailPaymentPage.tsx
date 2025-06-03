import { motion } from "framer-motion";
import { FC } from "react";
import { XCircle } from "lucide-react";

export const FailPaymentPage: FC = () => {
    return (
        <div className="min-h-screen bg-red-50 flex flex-col justify-center items-center px-4">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <XCircle className="w-20 h-20 text-red-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-red-800">Payment Failed</h1>
                <p className="text-red-700 mt-2 text-lg">
                    An error occurred during the payment. Please try again.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/"
                    className="inline-block mt-6 px-6 py-3 bg-red-600 text-white rounded-xl shadow-md transition-all"
                >
                    Try Again
                </motion.a>
            </motion.div>
        </div>
    );
};
