import { IncomingMessage, ServerResponse } from "http";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export async function AuthGuardUI(req: IncomingMessageWithCookies, res: ServerResponse) {
    // Get session from next auth
    const session = await unstable_getServerSession(req, res, authOptions);
    const user = session?.user;

    // If no user logged in, redirect
    if (!user) {
        return {
            redirect: {
                destination: "/welcome",
                permanent: false,
            },
        };
    }
    // Otherwise, attatch user to page props
    return {
        props: {
            user,
        },
    };
}

type IncomingMessageWithCookies = IncomingMessage & {
    cookies: Partial<{
        [key: string]: string;
    }>;
}