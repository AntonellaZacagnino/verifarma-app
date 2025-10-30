<style lang="scss">
@use "~/assets/scss/sign-up.scss";
</style>

<template>
    <UContainer class="container">
        <div class="signUp-container fade-in">
            <nuxt-link to="/" aria-label="Go to VeriMovies home">
                <h1>Veri<span>Movies</span></h1>
            </nuxt-link>
            <h2>Create Account</h2>
            <UForm :schema="schema" :state="state" class="space-y-4 form" @submit="onSubmit">
                <UFormGroup label="Email Address" name="email">
                    <UInput 
                        v-model="state.email" 
                        type="email"
                        placeholder="Enter your email"
                        autocomplete="email"
                    />
                </UFormGroup>
                
                <UFormGroup label="Password" name="password">
                    <UInput 
                        v-model="state.password" 
                        type="password"
                        placeholder="Create a secure password"
                        autocomplete="new-password"
                    />
                </UFormGroup>
                
                <UButton class="submit" type="submit" :loading="isLoading">
                    {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                </UButton>
            </UForm>
            
            <div class="login-link">
                <p>Already have an account?</p>
                <nuxt-link to="/sign-in" class="link">Sign In</nuxt-link>
            </div>
        </div>
    </UContainer>
</template>

<script setup lang="ts">
    import { z } from 'zod'
    import type { FormSubmitEvent } from '#ui/types'

    const route = useRoute()
    const { $auth } = useNuxtApp()
    const { register } = useFirebase()
    const isLoading = ref(false)

    const schema = z.object({
        email: z.string().email('Please enter a valid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters long')
    })

    type Schema = z.output<typeof schema>

    const state = reactive({
        email: undefined,
        password: undefined
    })

    async function onSubmit (event: FormSubmitEvent<Schema>) {
        if (isLoading.value) return
        
        isLoading.value = true
        try {
            await register(event.data.email, event.data.password)
        } catch (error) {
            console.error('Registration error:', error)
        } finally {
            isLoading.value = false
        }
    }
</script>
 
