import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};


export interface DonutSegment {
    label: string;
    value: number;
    color: string;
}