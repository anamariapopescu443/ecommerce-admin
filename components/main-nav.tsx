"use clinet";

import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";


export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname= usePathname();
    const params=useParams();
    const routes =[
        {
            href:`/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname ===`/${params.storeId}/settings`,
        },
    ]; 
    return (
        <nav 
        className={cn("flex intems-center space-x-4 lg:space-x-6", className)}
        >
            {routes.map((route)=>(
                <link 
                key={route.href}
                href={route.href}
                className={cn(
                    "text-sm font-medium transition-color hover:text-primery",
                    route.active? "text-black dark:text-white " : "text-muted-foreground"
                )}
                
                >
                {route.label}
                </link>
            ))}
        </nav>
    )
};