import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

const toast = useToast()

export const useFirebase = () => {
    const { $auth } = useNuxtApp()
        const register = async (email: string, password: string) => {
        try{
            await createUserWithEmailAndPassword($auth, email, password);
            toast.add({
                title: 'User created!',
                timeout: 2000,
                callback: async() => {
                    await goTo('/home')
                }
            })
        } catch ( error) {
            toast.add({
                title: 'The user already exist.',
                timeout: 2000
            })
            console.log(error);
        }
    }

    const login = async (email:string, password:string) => {
        try {
            signInWithEmailAndPassword($auth, email, password);
            toast.add({
                title: 'Successfully logged',
                timeout: 2000,
                callback: async() => {
                    await goTo('/home')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

      const goTo = async(path:string) => {
        await navigateTo(path)
    }
    
    return{
        register,
        login,
    }
}
