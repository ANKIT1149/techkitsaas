import {GetAllCompanion} from "@/lib/actions/GetAllCompanions";
import CompanionCard from "@/components/CompanionCard";
import {getSubjectColor} from "@/lib/utils";
import SearchInput from "@/components/SearchInput/SearchInput";
import SubjectFilter from "@/components/SubjectFIlter/SubjectFilter";

const companions = async({searchParams}: SearchParams) => {

    const params = await searchParams
    const subject = params?.subject ? params?.subject : ''
    const topic = params?.topic ? params?.topic : ''

    const companions = await GetAllCompanion({subject, topic});

    console.log(companions);

    return(
        <main>
            <section className='flex justify-between gap-4 max-sm:flex-col'>
                <h1>Companion Library</h1>
                <SearchInput />
                <SubjectFilter />
            </section>

            <section className="companions-grid">
                {companions?.map((companion) => (
                    <CompanionCard key={companion.id} {...companion}  color={getSubjectColor(companion.subject)}/>
                ))}
            </section>

        </main>
    )
}

export default companions;