
import { Sidebar } from "@/components/Sidebar";
import { ThemeSwitch } from "@/components/theme-switch";

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            
            <Sidebar />
            <main className="flex-grow overflow-y-auto p-12 z-10">
                <div className="w-full mb-3 text-right">
                    <ThemeSwitch />
                </div>
                {children}
            </main>
        </div>
    );
}
