<style lang="scss">
@use "~/assets/scss/sign-in.scss";
</style>

<template>
    <UContainer>
        <div class="container">
            <UContainer>
                <div class="signIn-container">
                    <nuxt-link to="/"><h1>Veri<span>Movies</span></h1></nuxt-link>
                    <h2>Sign in</h2>
                    <UForm :schema="schema" :state="state" class="space-y-4 form" @submit="onSubmit">
                        <UFormGroup label="Email" name="email">
                            <UInput v-model="state.email" />
                        </UFormGroup>
                        <UFormGroup label="Password" name="password">
                            <UInput v-model="state.password" type="password" />
                        </UFormGroup>        
                        <UButton type="submit">
                            Submit
                        </UButton>
                    </UForm>
                    <div class="options">
                        <button>Forgot password?</button>
                        <nuxt-link to="/sign-up"><button>Create new user</button></nuxt-link>
                    </div>
                </div>
            </UContainer>
        </div>
    </UContainer>
  </template>


<script setup lang="ts">
    import { z } from 'zod'
    import type { FormSubmitEvent } from '#ui/types'

    const { login } = useFirebase()

    
    const schema = z.object({
        email: z.string().email('Invalid email'),
        password: z.string().min(6, 'Your password must be at least 8 characters')
    })

    type Schema = z.output<typeof schema>

    const state = reactive({
        email: undefined,
        password: undefined
    })

    async function onSubmit (event: FormSubmitEvent<Schema>) {
        try {
            const userLogin = await login(event.data.email, event.data.password)
        } catch (error) {
            console.log(error)
        }
    }
    
</script>