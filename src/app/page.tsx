import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "@/components/ModeToggle";
import { currentUser } from "@clerk/nextjs/server";
import CreatePost from "@/components/CreatePost";
import WhoToFollow from "@/components/WhoToFollow";


export default async function Home() {
  const user = await currentUser();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}
      </div>
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        Who to Follow
        <WhoToFollow />
      </div>
    </div>
  );
}
