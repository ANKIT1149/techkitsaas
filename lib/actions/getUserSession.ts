import {createSupabaseClient} from "@/lib/Supabase";

export const getUserSessionHistory = async(userId: string, limit=10) => {
    const supabase =  createSupabaseClient()

    const {data, error} = await supabase
        .from("session_history")
        .select(`companions:companion_id(*)`)
        .eq('user_id', userId)
        .order("created_at", {ascending: false})
        .limit(limit);

    if (error) throw new Error(error.message);

    return data.map(({companions}) => companions)
}