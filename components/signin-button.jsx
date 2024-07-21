import { signIn } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData);
      }}
      className="flex flex-col items-baseline justify-center gap-4 text-2xl"
    >
      <label>
        <div>Email</div>
        <input name="email" type="email" />
      </label>
      <label>
        <div>Password</div>
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}

// // There might be a client-server error here I guess (probably not)
// import { signIn } from "@/auth"

// export function SignIn() {
//   return (
//     <form
//       action={async () => {
//         "use server"
//         await signIn()
//         //  await signIn("github", { redirectTo: "/dashboard" })
//       }}
//     >
//       <button type="submit">Sign in</button>
//     </form>
//   )
// }
