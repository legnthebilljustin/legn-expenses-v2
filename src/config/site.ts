export type SiteConfig = typeof siteConfig;
import { ClipboardIcon, CreditCardIcon, DashboardIcon, HomeIcon } from "@/assets/icons";
export const siteConfig = {
    name: "Legn",
    navItems: [
        {
            label: "Home",
            href: "/",
            icon: HomeIcon
        },
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: DashboardIcon
        },
        {
            label: "Expenses",
            href: "/expenses",
            icon: ClipboardIcon
        },
        {
            label: "Cards",
            href: "/cards",
            icon: CreditCardIcon
        },
    ],
    navMenuItems: [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Expenses",
            href: "/expenses",
        },
        {
            label: "Cards",
            href: "/cards",
        },
    ],
    links: {
        github: "https://github.com/heroui-inc/heroui",
        twitter: "https://twitter.com/hero_ui",
        docs: "https://heroui.com",
        discord: "https://discord.gg/9b6yyZKmH4",
        sponsor: "https://patreon.com/jrgarciadev",
    },
};
