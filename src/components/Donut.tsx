import { useState } from "react";

import SubtitleText from "./SubtitleText";

import { DonutSegment } from "@/types";

type TooltipState = {
    x: number;
    y: number;
    label: string;
    value: number;
};

interface Props {
    data: DonutSegment[]
    subtitle: string
    showCenterText?: boolean
    centerTextData?: string | number
}

export default function CustomDonut({ data, subtitle, centerTextData, showCenterText }: Props) {
    const [tooltip, setTooltip] = useState<TooltipState | null>(null);
    const size = 220;
    const strokeWidth = 20;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    let cumulativePercent = 0;
	
    if (!Array.isArray(data)) {
        return <div className="text-center text-default-500 text-sm">Cannot display chart. Data format mismatch.</div>;
    }
    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative">
                {tooltip && (
                    <div
                        className="fixed z-50 pointer-events-none"
                        style={{ left: tooltip.x + 12, top: tooltip.y + 12}}
                    >
                        <div className="rounded-md bg-content1 px-3 py-2 text-sm shadow-md">
                            <div className="font-medium">{tooltip.label}</div>
                            <div className="text-xs opacity-70">&#8369; {tooltip.value}</div>
                        </div>
                    </div>
                )}
                <svg height={size} viewBox={`0 0 ${size} ${size}`} width={size}>
                    {data.map((segment: DonutSegment, index) => {
                        let segmentLength =
                            index === data.length - 1
                                ? circumference - (cumulativePercent / 100) * circumference
                                : (segment.value / 100) * circumference;

                        const dashArray = `${segmentLength} ${circumference - segmentLength}`;
                        const dashOffset = circumference - (cumulativePercent / 100) * circumference;

                        cumulativePercent += segment.value;

                        return (
                            <circle
                                key={index}
                                cx={size / 2}
                                cy={size / 2}
                                fill="transparent"
                                r={radius}
                                stroke={segment.color}
                                strokeDasharray={dashArray}
                                strokeDashoffset={dashOffset}
                                strokeLinecap="round"
                                strokeWidth={strokeWidth}
                                style={{
                                    cursor: "pointer",
                                    transition: "opacity 0.2s ease",
                                }}
                                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = "1";
                                    setTooltip(null);
                                }}
                                onMouseMove={(e) =>
                                    setTooltip({
                                        x: e.clientX,
                                        y: e.clientY,
                                        label: segment.label,
                                        value: segment.value,
                                    })
                                }
                            />
                        );
                    })}
                </svg>
                {showCenterText && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <SubtitleText text={subtitle} />
                        <span className="text-xl font-bold tracking-tight">{centerTextData}</span>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 mt-4 justify-center w-full">
                {data.map((item) => (
                    <div key={item.label} className="flex items-center space-x-2">
                        <div className={"w-1 h-2 rounded-full"} style={{ backgroundColor: item.color }} />
                        <span className="text-xs whitespace-nowrap tracking-tight">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
		
    );
}