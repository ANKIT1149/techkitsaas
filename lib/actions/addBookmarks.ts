
"use server"
import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/Supabase";
import {revalidatePath} from "next/cache";

export const addBookmark = async (companionId: string, path: string) => {
    const { userId } = await auth();
    if (!userId) return;
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from("bookmarks").insert({
        companion_id: companionId,
        user_id: userId,
    });
    if (error) throw new Error(error.message);

    // Revalidate the path to force a re-render of the page

    revalidatePath(path);
    return data;

}