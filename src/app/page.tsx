import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "@/components/ui/ModeToggle";


export default function Home() {
  return (
    <div>
      <ModeToggle />
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant={"secondary"}>Sign In</Button>
        </SignInButton>
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>


    </div>
  );
}
