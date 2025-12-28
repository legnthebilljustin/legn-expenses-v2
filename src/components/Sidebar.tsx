import { Button } from "@heroui/button";
import { NavLink } from "react-router-dom";

import { ThemeSwitch } from "./theme-switch";

import { siteConfig } from "@/config/site";


export const Sidebar = () => {

    return (
        <aside className="w-54 h-full flex-shrink-0">
            <div className="flex flex-col h-full py-8 px-2 bg-[#F0F2FF]/80 border-r border-indigo-50">
                <div className="mb-14 px-2">
                    <h1 className="text-xl font-black tracking-tight text-slate-800">
                        Legn
                    </h1>
                </div>

                <nav className="flex-grow">
                    <ul className="flex flex-col gap-2">
                        {siteConfig.navItems.map((item) => (
                            <li key={item.label}>
                                <NavLink
                                    className={({ isActive }) => `
                                        flex items-center px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300
                                        ${isActive 
                                ? "bg-[#5D5FEF]/20 text-[#6a6cfc] shadow-lg shadow-indigo-100" 
                                : "text-slate-600 hover:bg-indigo-100 hover:text-indigo-600"
                            }
                                    `}
                                    to={item.href}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <ul><ThemeSwitch /></ul>
                </nav>

                <div className="mt-auto pt-8 border-t border-indigo-100 flex items-end justify-between">
                    <Button 
                        className="text-indigo-500 hover:bg-indigo-100 w-full"
                        size="sm"
                        variant="flat"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </aside>
    );
};