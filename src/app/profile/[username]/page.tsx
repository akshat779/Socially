import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

export async function generateMetadata({params}:{params:{username:string}}){
    const user = await getProfileByUsername(params?.username);
   
    if(!user){
        return;
    }
    return{
        title: `${user.name ?? user.username}`,
        description: user.bio || `Check Out ${user.username}'s profile `
    }
}


async function ProfilePageServer({params} : {params: {username:string}}){
    const user = await getProfileByUsername(params?.username)
    console.log(user)
    if(!user){
        return notFound();
    }

    const [posts,likedPosts,isCurrentUserFollowing] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        isFollowing(user.id)
    ])

    return <ProfilePageClient
    user={user}
    posts={posts}
    likedPosts={likedPosts}
    isFollowing={isCurrentUserFollowing}>
    </ProfilePageClient>

}


export default ProfilePageServer;

