import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    icon: LucideIcon;
    iconColor?: string;
}

export function StatsCard({
    title,
    value,
    change,
    changeType = "neutral",
    icon: Icon,
    iconColor = "bg-zinc-100 text-zinc-600",
}: StatsCardProps) {
    return (
        <div className="rounded-[10px] border border-zinc-200 bg-white p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-zinc-500">{title}</p>
                    <p className="mt-1 text-2xl font-bold text-zinc-900">
                        {value}
                    </p>
                    {change && (
                        <p
                            className={cn(
                                "mt-1 text-sm",
                                changeType === "positive" && "text-green-600",
                                changeType === "negative" && "text-red-600",
                                changeType === "neutral" && "text-zinc-500",
                            )}
                        >
                            {change}
                        </p>
                    )}
                </div>
                <div
                    className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-[10px]",
                        iconColor,
                    )}
                >
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
