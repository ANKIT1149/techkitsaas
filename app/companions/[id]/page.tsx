
import getCompanionById from "@/lib/actions/GetCompanionById";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getSubjectColor} from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent/CompanionComponent";

interface CompanionProps{
    params: Promise<{ id: string }>
}
const CompanionSession = async ({params}: CompanionProps) => {
    const {id} = await params
    const companion = await getCompanionById(id)
    const user = await currentUser();

    if(!user) return redirect("/sign-in");
    if(!companion) return redirect("/companions");

    return(
        <main>
            <article className="flex rounded-border justify-between p-6 max-md:flex-col">
               <div className="flex items-center gap-2 ">
                   <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{backgroundColor: getSubjectColor(companion.subject)}}>
                       <Image src={`/icons/${companion.subject}.svg`} alt="subject" width={15} height={15} />
                   </div>

                   <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                          <p className="font-bold text-2xl">
                              {companion.name}
                          </p>
                          <div className="subject-badge max-md:hidden">
                              {companion.subject}
                          </div>
                      </div>
                       <p className="text-lg">
                           {companion.topic}
                       </p>
                   </div>
               </div>
                <div className="items-center text-2xl max-md:hidden">
                    {companion.duration} minutes
                </div>
            </article>
            <CompanionComponent {...companion} companionId={companion.id} userName={user.firstName} userImage={user.imageUrl}/>
        </main>
    )
}

export default CompanionSession;