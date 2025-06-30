
import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import Cta from "@/components/Cta";
import {GetAllCompanion} from "@/lib/actions/GetAllCompanions";
import {getSessionHistory} from "@/lib/actions/getSessionHistory";
import {getSubjectColor} from "@/lib/utils";

const Page = async () => {
    const companions = await GetAllCompanion({limit: 3})
    const getRecentSession = await getSessionHistory()


    return (
        <main>
          <h1 className="text-2xl underline">Popular Companion</h1>
            <section className="home-section">
                {companions?.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                    />

                ))}
            </section>

            <section className="home-section">
                <CompanionList
                    title="Recently Completed Session"
                    companions={getRecentSession}
                    classNames="w-2/3 max-lg:w-full"
                />
                <Cta />
            </section>
        </main>
    )
}

export default Page