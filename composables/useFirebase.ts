import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile  } from "firebase/auth";

var displayUsername = ''
const toast = useToast()

export const useFirebase = () => {
    const { $auth } = useNuxtApp()
        const register = async (email: string, password: string) => {
        try{
            const userCredentials = await createUserWithEmailAndPassword($auth, email, password);
            goTo('/home')
        } catch ( error) {
            toast.add({
                title: 'The user already exist.',
                timeout: 20000
            })
            console.log(error, 'error aaaaaaa');
        }
    }

    const login = async (email:string, password:string) => {
        try {
            const userCredentials = await signInWithEmailAndPassword($auth, email, password);
            goTo('/home')
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async () => {
            const result = await signOut($auth)
            goTo('/')
    }

    const goTo = async(path:string) => {
        await navigateTo(path)
    }
    
    return{
        register,
        login,
        logout,
    }
}
