
"use client";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {subjects} from "@/constants";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";

const SubjectFilter = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject");

    const [subject, setSubject] = useState('');

    useEffect(() => {
        if(subject){
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject,
            });

            router.push(newUrl, { scroll: false });
        }else {
            if(pathname === '/companions') {
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["subject"],
                });

                router.push(newUrl, { scroll: false });
            }
        }
    }, [pathname, router, searchParams, subject])
    return(
        <>
            <Select value={subject} onValueChange={(value) => setSubject(value)}>
                <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Enter the Subject" />
                </SelectTrigger>
                <SelectContent>
                    {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject} className="capitalize">{subject}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}

export default SubjectFilter;