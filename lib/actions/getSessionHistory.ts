"use server"

import {createSupabaseClient} from "@/lib/Supabase";

export const getSessionHistory = async(limit=10) => {
    const supabase =  createSupabaseClient()

    const {data, error} = await supabase
        .from("session_history")
        .select(`companions:companion_id(*)`)
        .order("created_at", {ascending: false})
        .limit(limit);

    if (error) throw new Error(error.message);

    return data.map(({companions}) => companions)
}