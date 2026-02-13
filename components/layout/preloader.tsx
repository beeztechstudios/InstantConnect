"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        if (isLoading) {
            document.body.style.overflow = "hidden";
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "auto";
        }, 2500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#EBEBEB]"
                >
                    <div className="relative flex flex-col items-center">
                        {/* Logo Animation */}
                        <motion.img
                            src="/Logo_3.svg"
                            alt="Instant Connect"
                            initial={{ scale: 0.8, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-[180px] md:w-[250px] object-contain mb-8"
                        />

                        {/* Loading Bar */}
                        <div className="h-[2px] w-[120px] bg-black/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-black"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.2, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
