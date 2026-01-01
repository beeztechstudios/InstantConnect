import { Smartphone, Globe, CheckCircle } from "lucide-react";

const steps = [
    {
        step: "STEP 1",
        icon: Smartphone,
        title: "Tap or Scan",
        description:
            "Tap your phone on the card or scan the QR to get started.",
    },
    {
        step: "STEP 2",
        icon: Globe,
        title: "Open Instantly",
        description: "Your digital profile or review page opens in seconds.",
    },
    {
        step: "STEP 3",
        icon: CheckCircle,
        title: "Connect & Grow",
        description:
            "Share details, collect reviews, and build trust effortlessly.",
    },
];

export function HowItWorks() {
    return (
        <section className="flex justify-center bg-zinc-100 py-6 sm:py-8">
            <div className="w-[95%] overflow-hidden rounded-[10px]">
                <div
                    className="flex flex-col md:flex-row"
                    style={{ backgroundColor: "#38bdf8" }}
                >
                    {/* Left Side - Content */}
                    <div className="w-full md:w-[40%] p-6 sm:p-8 md:p-12 lg:p-16">
                        <p className="text-xs sm:text-sm text-white/70">
                            Collect, share, and collect—instantly.
                        </p>
                        <h2 className="mt-2 sm:mt-3 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                            How it works
                        </h2>

                        {/* Steps */}
                        <div className="mt-6 sm:mt-10 space-y-5 sm:space-y-8">
                            {steps.map((step, index) => (
                                <div key={index}>
                                    <p className="text-[10px] sm:text-xs font-medium text-white/50">
                                        {step.step}
                                    </p>
                                    <div className="mt-1.5 sm:mt-2 flex items-start gap-3 sm:gap-4">
                                        <div className="flex h-9 w-9 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-[10px] bg-white/20">
                                            <step.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm sm:text-base font-semibold text-white">
                                                {step.title}
                                            </h3>
                                            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-white/70">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="w-full md:w-[60%] min-h-[250px] sm:min-h-[350px] md:min-h-[700px] p-2 md:pl-0">
                        <div
                            className="h-full w-full rounded-[10px] bg-cover bg-center"
                            style={{
                                backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop')`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
