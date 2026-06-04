import { useAuthActions } from "@convex-dev/auth/react"


export function SignIn() {

    const { signIn } = useAuthActions()

    return (

        <form
            onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget)
                void signIn("password", formData)
            }}
        >
            <input name="email" placeholder="Email" type="text" />
            <input name="password" placeholder="Password" type="password" />
            <input name="flow" type="hidden" value={"signIn"} />
            <button>sign in</button>
        </form>

    )

}