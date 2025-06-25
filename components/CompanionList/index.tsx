import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import {cn, getSubjectColor} from "@/lib/utils";
import Image from "next/image";

interface CompanionList {
    title: string,
    companions: Companion[],
    classNames: string,
}

const CompanionList = ({title, companions, classNames}: CompanionListProps) => {
    return (
        <article className={cn('companion-list', classNames)}>
            <h2 className="font-bold text-3xl">Recent Session</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg w-2/3">Lessons</TableHead>
                        <TableHead className="text-lg">Subject</TableHead>
                        <TableHead className="text-lg text-right">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions?.map(({id, name, topic, subject, duration}: any) => (
                        <TableRow key={id}>
                            <TableCell>
                                <Link href={`/companion/${id}`}>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="flex items-center justify-center rounded-lg size-[72px] max-md:hidden"
                                            style={{backgroundColor: getSubjectColor(subject)}}>
                                            <Image src={`icons/${subject}.svg`} alt="subject" height={35} width={35}/>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="font-bold text-2xl">{name}</p>
                                            <p className="">{topic}</p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="subject-badge w-fit max-md:hidden">
                                    {subject}
                                </div>
                                <div className="flex justify-center items-center  rounded-lg w-fit p-2 md:hidden"
                                     style={{backgroundColor: getSubjectColor(subject)}}>
                                    <Image src={`icons/${subject}.svg`} alt="subject" height={18} width={18}/>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-end items-center gap-2 w-full">
                                    <p className="text-2xl">{duration} {" "}</p>
                                    <span className="font-bold text-lg">mins</span>
                                    <Image
                                        src="/icons/clock.svg"
                                        alt="clock"
                                        height={18}
                                        width={18}
                                        className="md:hidden"/>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    )
}

export default CompanionList