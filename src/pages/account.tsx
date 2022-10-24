import { getSession, signOut, useSession } from 'next-auth/react'
import React from 'react'

function Account() {
    const { data: session, status } = useSession();
    if (status === 'authenticated') {
        return (
            <div>
                <p>Welcome {session.user?.name}</p>
                <button onClick={() => signOut()}>log out</button>
            </div>
        )
    } else {
        return (
            <div>Account</div>
        )

    }
}

export default Account

export const getServerSideProps = async (context:any) =>{
    const session =  await getSession(context)
    if(!session){
        return {
            redirect:{
                destination:'/login',
            }
        }        
    }
    return {
        props:{session}
    }
}