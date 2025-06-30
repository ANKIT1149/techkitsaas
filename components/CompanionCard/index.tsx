"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {removeBookmark} from "@/lib/actions/removeBookMarks";
import {addBookmark} from "@/lib/actions/addBookmarks";

interface CompanionCardProps{
    name:string,
    topic:string,
    subject:string,
    duration:string,
    color:string,
    id: string,
    bookmarked: boolean,
}

const CompanionCard = ({id, name, topic, subject, duration,color, bookmarked}: CompanionCardProps) => {
    const pathname = usePathname();
    const handleBookmark = async () => {
        if (bookmarked) {
            await removeBookmark(id, pathname);
        } else {
            await addBookmark(id, pathname);
        }
    };
    return(
        <article className="companion-card" style={{backgroundColor:color}}>
            <div className="flex items-center justify-between">
                <div className="subject-badge">{subject}</div>
                <button className="companion-bookmark" onClick={handleBookmark}>
                    <Image
                        src={
                            bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
                        }
                        alt="bookmark"
                        width={12.5}
                        height={15}
                    />
                </button>
            </div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm">Topic: {topic}</p>
            <div className="flex items-center gap-2">
                <Image src="/icons/clock.svg" alt="bookmark" width={13.5} height={15.5}/>
                <p>{duration}</p>
            </div>
            <Link href={`/companions/${id}`} className="w-full">
                <button className="btn-primary w-full justify-center">Launch Button</button>
            </Link>
        </article>
    )
}

export default CompanionCard;