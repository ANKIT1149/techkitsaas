"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const navLinks = [
    {label: "Home", link: "/"},
    {label: "Companions", link: "/companions"},
    {label: "My Journey", link: "/myJourney"},
]

const NavItems = () => {
    const pathName: string = usePathname()
    return(
        <>
            <div className="flex items-center gap-4">
                {navLinks.map((link) => (
                   <Link href={link.link} key={link.link} className={cn(pathName === link.link && "text-primary font-bold")}>
                       {link.label}
                   </Link>
                ))}
            </div>
        </>
    )
}

export default NavItems;