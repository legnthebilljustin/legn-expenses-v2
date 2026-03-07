import { Button, Card, CardBody, Skeleton } from "@heroui/react";
import { ComponentType, SVGProps } from "react";

import SubtitleText from "@/components/SubtitleText";
interface Props {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    value: string | number;
    label: string
    isLoading?: boolean
}

export default function MetricsCard({ icon: Icon, value, label, isLoading }: Props) {
    return (
        <Card radius="sm" >
            <CardBody>
                <Button isIconOnly className="mb-2 text-[#6a6cfc] bg-[#c5c6fc]/30" radius="lg"
                    size="sm" startContent={<Icon />}
                    variant="flat"
                />
                <Skeleton className="mb-1 rounded-full" isLoaded={!isLoading}>
                    <div className="tracking-tight font-light text-2xl">{value}</div>
                </Skeleton>
                <SubtitleText text={label} />
            </CardBody>
        </Card>
    );
}