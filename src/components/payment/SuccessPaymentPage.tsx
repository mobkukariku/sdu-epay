import { FC } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const SuccessPaymentPage: FC = () => {
    return (
        <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center px-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-green-800">Payment Successful!</h1>
                <p className="text-green-700 mt-2 text-lg">
                    Thank you for your payment. You may return to the site.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/"
                    className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded-xl shadow-md transition-all"
                >
                    Go to Homepage
                </motion.a>
            </motion.div>
        </div>
    );
};
