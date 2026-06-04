import { useAuthActions } from "@convex-dev/auth/react"


export const SignOut = () => {

    const { signOut } = useAuthActions()

    return <button onClick={() => void signOut()}>Sign out</button>

}