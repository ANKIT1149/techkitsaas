"use server"

import {createSupabaseClient} from "@/lib/Supabase";

export const GetcompanionById = async(id: string) => {
    const supabase = createSupabaseClient();
    const query = await supabase.from("companions").select().eq("id", id)

    const {data, error} = await query

    if(error) return console.error(error)

    return data[0]
}

export default GetcompanionById;