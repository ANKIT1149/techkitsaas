"use server"

import {createSupabaseClient} from "@/lib/Supabase";

export const GetAllCompanion = async ({limit = 10, page = 1, subject, topic}: GetAllCompanions) => {
    const supabse = createSupabaseClient();

    let query = supabse.from("companions").select();

    if(subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if(subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if(topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const {data: companions, error} = await query;

    if (error) throw new Error(error?.message || "Companion not found");

    return companions;


}