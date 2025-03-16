"use client"

import { useUser } from "@clerk/nextjs"
import { useState } from "react";
import { createPost } from "@/actions/post.action";
import toast from "react-hot-toast";
import { Card, CardContent } from "./ui/card";

import { Textarea } from "./ui/textarea";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";

export default function CreatePost() {
    const { user } = useUser();
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [showImageUpload, setShowImageUpload] = useState(false);

    const handleSubmit = async () => {
        if (!content.trim() && !imageUrl) {
            return;
        }

        setIsPosting(true);
        try {
            const result = await createPost(content, imageUrl);
            if (result?.success) {
                setContent("");
                setImageUrl("");
                setShowImageUpload(false);

                toast.success("Post created Successfully");
            }
        }
        catch (error) {
            toast.error("Error Creating Post")
            console.log(`Error Creating Post ${error}`)
        }
        finally {
            setIsPosting(false);
        }
    }

    return <Card className="mb-6">
        <CardContent className="pt-6">
            <div className="space-y-4">
                <div className="flex space-x-4">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={user?.imageUrl || "/avatar.png"} />
                    </Avatar>
                    <Textarea
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[100px] resize-none border-none focus-visible:ring-0 text-base"
                        disabled={isPosting} />
                </div>


                <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex space-x-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-primary"
                            onClick={() => setShowImageUpload(!showImageUpload)}
                            disabled={isPosting}>
                            <ImageIcon className="size-4 mr-2" />
                            Photo
                        </Button>
                    </div>
                    <Button
                        className="flex items-center"
                        onClick={handleSubmit}
                        disabled={(!content.trim() && !imageUrl) || isPosting}>
                        {isPosting ? (
                            <>
                                <Loader2Icon className="size-4 mr-2 animate-spin" />
                                Posting..
                            </>
                        ) : (
                            <>
                                <SendIcon className="size-4 mr-2" />
                                Post
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>

}