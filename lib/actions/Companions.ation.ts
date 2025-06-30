"use server";

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/Supabase";

export const CreateLearningCompanion = async(formData: CreateCompanion) => {
    const {userId: author} = await auth()
    const supabase =  createSupabaseClient();

    const {data, error} = await supabase.from('companions').insert({...formData, author}).select();

    if(error || !data) throw new Error(error?.message || "Companion not found")

    return data[0]
}