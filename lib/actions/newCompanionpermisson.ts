"use server"

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/Supabase";

export const newCompanionPermission = async() => {
    const {userId, has} = await auth();
    const supabase = createSupabaseClient();

    let limit = 0;

    if(has({plan: 'pro_companions'})){
        return true;
    }else if(has({feature: "3_companions_limit"})){
        limit = 3
    }else if(has({feature: "10_companions_limit"})){
        limit = 10
    }

    const {data,error} = await supabase.from("companions").select("id", {count: 'exact'}).eq('author', userId)

    if(error) throw new Error(error.message);

    const companionLength = data?.length

    if(companionLength >= limit){
        return false
    }else{
        return true
    }
}