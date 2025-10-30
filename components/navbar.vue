<style lang="scss">
@use "~/assets/scss/navbar.scss";
</style>

<template>
  <nav class="navbar-content">
    <div class="logo">
      <nuxt-link to="/" aria-label="VeriMovies Home">
        <h1>Veri<span>Movies</span></h1>
      </nuxt-link>
    </div>
    
    <div class="menu">
      <nuxt-link to="/home" class="nav-link" :class="{active: $route.path === '/home'}">
        Home
      </nuxt-link>
      <nuxt-link to="/" class="nav-link" :class="{active: $route.path === '/'}">
        Logout
      </nuxt-link>
      <button @click="logout" class="nav-link logout-btn" v-if="isAuthenticated">
        Logout
      </button>
    </div>
    
    <button class="menu-toggle-icon" @click="toggleMobileMenu" aria-label="Toggle mobile menu">
      <span class="material-symbols-outlined">{{ mobileMenuOpen ? 'close' : 'menu' }}</span>
    </button>
    
    <div class="menu-toggle" :class="{active: mobileMenuOpen}">
      <ul>
        <li>
          <nuxt-link to="/home" @click="closeMobileMenu" :class="{active: $route.path === '/home'}">
            Home
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" @click="closeMobileMenu" :class="{active: $route.path === '/'}">
            Welcome
          </nuxt-link>
        </li>
        <li v-if="isAuthenticated">
          <button @click="logout" class="logout-mobile">
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

  
  
<script setup>
import { ref, computed } from 'vue'

const mobileMenuOpen = ref(false)
const { $auth } = useNuxtApp()

const isAuthenticated = computed(() => {
  return $auth?.currentUser !== null
})

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const logout = async () => {
  try {
    await $auth.signOut()
    closeMobileMenu()
    await navigateTo('/')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

const handleClickOutside = (event) => {
  if (mobileMenuOpen.value && !event.target.closest('.navbar-content')) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>