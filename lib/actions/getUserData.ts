"use server"
import {createSupabaseClient} from "@/lib/Supabase";

export const getUserData = async(userId: string,) => {
    const supabase =  createSupabaseClient()

    const {data, error} = await supabase
        .from("companions")
        .select()
        .eq('author', userId)

    if (error) throw new Error(error.message);

    return data
}