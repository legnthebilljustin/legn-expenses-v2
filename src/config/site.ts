export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Legn",
    description: "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
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
