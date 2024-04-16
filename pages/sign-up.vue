<script setup lang="ts">
const route = useRoute()
</script>

<style lang="scss">
@use "~/assets/scss/sign-up.scss";
</style>

<template>
    <div class="container">
        <div class="signUp-container">
            <h1>Veri<span>Movies</span></h1>
            <h2>Sign up</h2>
            <div class="form">
                <div class="input">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username">
                </div>
                <div class="input">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email">
                </div>
                <div class="input">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password">
                </div>
                <button>Create new user</button>
            </div>
        </div>
    </div>
  </template>

 
