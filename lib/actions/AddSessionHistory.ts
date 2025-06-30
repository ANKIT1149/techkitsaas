"use server"
import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/Supabase";

export const AddSessionHistory = async (companionId: string) => {
    const {userId} = await auth();
    const supabase = createSupabaseClient();

    const {data, error} = await supabase
        .from("session_history")
        .insert({companion_id: companionId, user_id: userId});

    if (error) throw new Error(error.message);

    return data;
}