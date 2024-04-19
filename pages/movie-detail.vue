
<style lang="scss">
@use "~/assets/scss/movie-detail.scss";
</style>

<template>
    <Navbar />
    <div v-if="movieDetails">
      <div class="go-back">
        <nuxt-link to="/home"><button><span class="material-symbols-outlined">arrow_circle_left</span>Go back</button></nuxt-link>
      </div>
      <div class="movie-container">
        <div class="details-container">
          <h1>{{ movieDetails.Title}}({{ movieDetails.Year }})</h1>
          <h5>{{ movieDetails.Runtime }}</h5>
          <div class="details">
            <div class="info">
              <span><strong>Released date:</strong> {{ movieDetails.Released }}</span>
              <span><strong>Rated:</strong> {{ movieDetails.Rated }}</span>
              <span><strong>Genre:</strong> {{ movieDetails.Genre }}</span>
              <span><strong>Director:</strong> {{ movieDetails.Director }}</span>
              <span><strong>Cast:</strong> {{ movieDetails.Actors }}</span>
            </div>
            <div class="ratings">
              <h6>Ratings</h6>
              <ul>
                <li v-for="rating in movieDetails.Ratings" :key="movieDetails.Source">
                  <span>{{ rating.Source }}: {{ rating.Value }}</span>
                </li>
              </ul>
            </div>
          </div>
          <p>{{ movieDetails.Plot }}</p>

        </div>
        <div >
          <img :src="movieDetails.Poster" alt="">
        </div>
        <!-- <pre>{{ movieDetails }}</pre> -->
      </div>
    </div>
    <div v-else class="loader-container"> 
      <div class="dots-spinner" :style="spinnerStyle">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
</template> 


<script>
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import Navbar from '~/components/navbar.vue'
  import { ref } from 'vue';

  var movieID = '';
  export default {
    components:{
      Navbar
    },
    setup() {
      const route = useRoute();
      const movieDetails = ref(null);

      console.log(route.query.movie)
      async function fetchMovieDetails(movieID) {
        console.log(2)
        try {
          const response = await axios.get(`http://www.omdbapi.com/?apikey=87430ed5&i=${movieID}`);
          console.log(response)
          return response.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    
      (async () => {
        const movieID = route.query.movie;
        if (movieID) {
          console.log(1)
          movieDetails.value = await fetchMovieDetails(movieID);
        }
      })();
      return {
        movieDetails
      }
    }
  };  
</script>