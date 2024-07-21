import { auth } from "../auth";

export async function getUserInfo() {
  try {
    const session = await auth();

    if (!session.user) return null;
    return session.user;
  } catch (err) {
    return null;
  }
}
