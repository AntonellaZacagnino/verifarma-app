
<style lang="scss">
@use "~/assets/scss/sign-in.scss";
</style>

<template>
    <div class="container">
        <div class="signUp-container">
            <nuxt-link to="/"><h1>Veri<span>Movies</span></h1></nuxt-link>
            <h2>Sign in</h2>
            <div class="form">
                <div class="input">
                    <label for="email">Email</label>
                    <input v-model="email" type="text" name="email" id="email">
                </div>
                <div class="input">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" name="password" id="password">
                </div>
                <button @click="handleLogin">
                    Continue
                </button>
            </div>
            <div class="options">
                <button>Forgot password?</button>
                <button>Create new user</button>
            </div>
        </div>
    </div>
  </template>

 

<script setup lang="ts">
    import { ref } from 'vue';

    const route = useRoute()
    const { $auth } = useNuxtApp()
    const { login } = useFirebase()

    const email = ref('')
    const password = ref('')

    const handleLogin = async() => {
        try{
            await login(email.value, password.value)
        } catch (error){
            console.log('Cannot login')
        }
    }
    
    
</script>