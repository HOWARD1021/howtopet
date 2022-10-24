import type { NextPage } from "next";
import { useSession, signIn, signOut ,getSession } from "next-auth/react";
import Image from 'next/image'
const Login: NextPage = () => {

  const { data: session, status } = useSession();
  if (session) {
    return (
      <div>
        Signed in as {session.user?.email} <br />
        {/* <Image src={session.user?.image}
           height={100} width={100} /> */}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
export default Login

export const getServerSideProps = async (context:any) =>{
  const session =  await getSession(context)
  if(session){
      return {
          redirect:{
              destination:'/account',
          }
      }        
  }
  return {
      props:{session}
  }
}