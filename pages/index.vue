<style lang="scss">
@use "~/assets/scss/index.scss";
</style>

<template>
  <UContainer>
    <div class="container">
      <UContainer>
        <div class="login-container">
          <h1 aria-label="VeriMovies">Veri<span aria-label="VeriMovies">Movies</span></h1>
          <h2 aria-label="What do you want to watch today?">What do you want to watch today?</h2>
          <div class="buttons">
            <button>
              <nuxt-link to="/sign-in">Sign in</nuxt-link>
            </button>
            <button>
              <nuxt-link to="/sign-up">Sign up</nuxt-link>
            </button>
          </div>
        </div>
      </UContainer>
    </div>
  </UContainer>
</template>

