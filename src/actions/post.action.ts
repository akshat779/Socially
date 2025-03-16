"use server"  
import { getDbUserId } from "./user.action"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(content:string, image: string){

  
    try{
        const userId = await getDbUserId();
        if(!userId){
            return;
        }
        const post  = await prisma.post.create({
            data:{
                content,
                image,
                authorId : userId,
            }
        })

        revalidatePath("/")
        return({success:true,post})
    }
    catch(error){
        console.log(`Error in CreatePost ${error}`) 
    }

}