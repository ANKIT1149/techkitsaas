import React from 'react'

import CompanionCard from "@/components/CompanionCard";

const Page = () => {
    return (
        <main>
          <h1 className="text-2xl underline">Popular Companion</h1>
            <section className="home-section">
                <CompanionCard
                id="123"
                name="Neura the Brainy Explorer"
                topic="Neural Network of the Brain"
                subject="Science"
                duration="45 mins duration"
                color="#ffda6e"
                />
                <CompanionCard
                    id="123"
                    name="Countsy the Number Wizard"
                    topic="Derivatives & Integrals"
                    subject="Maths"
                    duration="30 mins duration"
                    color="#e5d0ff"
                />
                <CompanionCard
                    id="123"
                    name="Verba the Vocabulary Builder"
                    topic=" English Literature "
                    subject="Language"
                    duration="30 mins duration"
                    color="#e8ff4e"
                />
            </section>
        </main>
    )
}

export default Page