import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import getUser from "@/lib/serverSide";
import { redirect } from "next/navigation";
import Action from "./action";

export default async function Home() {

  // Redirect to the dashboard page in case the user is already logged in.
  //const user = await getUser(cookies());
  //if (user) {
  //  redirect("/d");
  //}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className='mb-8'>
          <h1 className='text-xl md:text-4xl'>Organizedmess</h1>
        </div>


      </div>
    </main>
  )
}

//        <div className='grid justify-center items-center grid-cols-1 gap-4'>
//          <Action name="log in" href='/login'></Action>
//          <h2 className='text-xl md:text-2xl'>OR</h2>
//          <Action name="sign up" href='/register'></Action>
//        </div>