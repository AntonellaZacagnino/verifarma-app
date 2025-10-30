<style lang="scss">
@use "~/assets/scss/sign-in.scss";
</style>

<template>
    <UContainer class="container">
        <div class="signIn-container fade-in">
            <nuxt-link to="/" aria-label="Go to VeriMovies home">
                <h1>Veri<span>Movies</span></h1>
            </nuxt-link>
            <h2>Welcome Back</h2>
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
                        placeholder="Enter your password"
                        autocomplete="current-password"
                    />
                </UFormGroup>        
                
                <UButton type="submit" :loading="isLoading" class="submit-btn">
                    {{ isLoading ? 'Signing In...' : 'Sign In' }}
                </UButton>
            </UForm>
            
            <div class="options">
                <button class="forgot-password">Forgot password?</button>
                <div class="signup-link">
                    <p>Don't have an account?</p>
                    <nuxt-link to="/sign-up" class="link">Create Account</nuxt-link>
                </div>
            </div>
        </div>
    </UContainer>
</template>


<script setup lang="ts">
    import { z } from 'zod'
    import type { FormSubmitEvent } from '#ui/types'

    const { login } = useFirebase()
    const isLoading = ref(false)

    const schema = z.object({
        email: z.string().email('Please enter a valid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long')
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
            await login(event.data.email, event.data.password)
        } catch (error) {
            console.error('Login error:', error)
        } finally {
            isLoading.value = false
        }
    }
</script>