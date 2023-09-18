import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
//import supabase

export default async function getUser(cookieStore: ReadonlyRequestCookies) {
    const sessionid = cookieStore.get("userAccount")

    if (!sessionid) {
        return null
    }
    //const session = await prisma.session.findUnique({
    //    where: {
    //        id: sessionid.value,
    //    },
    //    include: {
    //        User: true,
    //    }
    //})
    //if (!session) {
    //    return null
    //}
//
    //return session.User
}