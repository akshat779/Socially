import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant={"secondary"}>Sign In</Button>
          </SignInButton>
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <h1>Hello Home Page</h1>
    </div>
  );
}
