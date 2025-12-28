import { Button, Card, CardBody } from "@heroui/react";
import { ComponentType, SVGProps } from "react";

import SubtitleText from "@/components/SubtitleText";
interface Props {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    value: string | number;
    label: string
}

export default function MetricsCard({ icon: Icon, value, label }: Props) {
    return (
        <Card radius="sm" >
            <CardBody>
                <Button isIconOnly className="mb-2 text-[#6a6cfc] bg-[#c5c6fc]/30" radius="lg"
                    size="sm" startContent={<Icon />}
                    variant="flat"
                />
                <div className="tracking-tight font-light text-2xl">{value}</div>
                <SubtitleText text={label} />
            </CardBody>
        </Card>
    );
}