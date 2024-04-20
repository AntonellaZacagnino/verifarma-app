import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const useFirebase = () => {
    const { $auth } = useNuxtApp()

    const register = async (username: string, email: string, password: string) => {
        try{
            const userCredentials = await createUserWithEmailAndPassword($auth, email, password);
            const user = userCredentials.user;
            updateProfile(userCredentials.user, {
                displayName: username
            }).then(() => {
            }).catch((error) => {
            });
            goTo('/home')
        } catch ( error) {
            console.log(error);
        }
    }

    const login = async (email:string, password:string) => {
        try {
            const userCredentials = await signInWithEmailAndPassword($auth, email, password);
            const user = userCredentials.user;
            goTo('/home')
        } catch (error) {
            console.log('Login error')
        }
    }

    const logout = async () => {
        console.log('aaaaaaaa')
            await signOut($auth)
            goTo('/')
    }

    const goTo = async(path:string) => {
        await navigateTo(path)
    }
    

    return{
        register,
        login,
        logout
    }
}
