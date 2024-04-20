<style lang="scss">
@use "~/assets/scss/sign-up.scss";
</style>

<template>
    <div class="container">
        <div class="signUp-container">
            <nuxt-link to="/"><h1>Veri<span>Movies</span></h1></nuxt-link>
            <h2>Sign up</h2>
            <div class="form">
                <div class="input">
                    <label for="username">Username</label>
                    <input v-model="username" type="text" name="username" id="username">
                </div>
                <div class="input">
                    <label for="email">Email</label>
                    <input v-model="email" type="email" name="email" id="email">
                </div>
                <div class="input">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" name="password" id="password">
                </div>
                <button @click="handleRegistration">Create new user</button>
            </div>
        </div>
    </div>
  </template>

<script setup lang="ts">
    import { ref } from 'vue';

    const route = useRoute()
    const { $auth } = useNuxtApp()
    const { register } = useFirebase()

    const username = ref('')
    const email = ref('')
    const password = ref('')

    const handleRegistration = async() => {
        try{
            await register(username.value, email.value, password.value)
        } catch (error){
            console.log('error')
        }
    }
</script>
 
