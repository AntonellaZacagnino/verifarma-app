<style lang="scss">
@use "~/assets/scss/navbar.scss";
</style>

<template>
    <div class="navbar-content">
        <div class="logo">
            <h1>Veri<span>Movies</span></h1>
        </div>
        <div v-if="windowWidth > 425" class="menu">
            <p>Welcome {{ username }}</p>
            <p>Profile</p>
            <p @click="handleLogin">Logout</p>
        </div>
        <div v-else>
          <input type="checkbox" id="menu-toggle" @click="toggleMenu">
          <label for="menu-toggle" class="menu-toggle-icon">&#9776;</label>
          <div class="menu-toggle" :class="{ 'active': menuOpen }">
            <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Acerca de</a></li>
              <li><a href="#">Servicios</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
        </div>
    </div>
  </template>

  <script>
import { getAuth } from "firebase/auth";
const auth = getAuth()
const {logout} = useFirebase()
const handleLogin = async() => {
  try{
    await logout()
  } catch (error){
    console.log(error)
  }
}

  export default {
    data() {
      return {
        menuOpen: false,
        windowWidth: window.innerWidth,
        username: auth.currentUser.displayName
      };
    },
    methods: {
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      }
    }
  };
  </script>
  
  