// There might be a client-server error here I guess (probably not)
import { signIn, signOut } from "@/auth.ts";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        //  await signIn("github", { redirectTo: "/dashboard" })
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  );
}
