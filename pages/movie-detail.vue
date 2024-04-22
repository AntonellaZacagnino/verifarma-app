<style lang="scss">
@use "~/assets/scss/movie-detail.scss";
</style>

<template>
    <Navbar />
    <div v-if="movieDetails">
      <div  class="go-back">
        <nuxt-link to="/home"><button aria-label="Go back"><span class="material-symbols-outlined" aria-label="hidden" >arrow_circle_left</span>Go back</button></nuxt-link>
      </div>
      <UContainer>
        <div class="title">
          <h1>{{ movieDetails.Title}}({{ movieDetails.Year }})</h1>
          <h5>{{ movieDetails.Runtime }}</h5>
        </div>
        <div class="movie-container">
          <div class="details-container">
            <div class="ratings">
              <h6>Ratings</h6>
              <ul>
                <li v-for="rating in movieDetails.Ratings" :key="movieDetails.Source">
                  <span>{{ rating.Source }}: {{ rating.Value }}</span>
                </li>
              </ul>
            </div>
            <p>{{ movieDetails.Plot }}</p>
          </div>
        <div class="poster-and-details">
          <img aria-label='Movie poster' v-if="movieDetails.Poster != 'N/A' ":src="movieDetails.Poster" alt="">
          <img aria-label='Movie poster' v-else src="/not-image.jpg">
          <div class="details">
            <div class="info">
              <span><strong>Released date:</strong> {{ movieDetails.Released }}</span>
              <span><strong>Rated:</strong> {{ movieDetails.Rated }}</span>
              <span><strong>Genre:</strong> {{ movieDetails.Genre }}</span>
              <span><strong>Director:</strong> {{ movieDetails.Director }}</span>
              <span><strong>Cast:</strong> {{ movieDetails.Actors }}</span>
            </div>
          </div>
        </div>
      </div>
      </UContainer>
    </div>
    <div v-else class="loader-container"> 
      <div class="dots-spinner" >
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

  export default {
    components:{
      Navbar
    },
    setup() {
      var route = useRoute();
      var movieDetails = ref(null);
      var errorResponse = ''
      async function fetchMovieDetails(movieID) {
        try {
          const response = await axios.get(`http://www.omdbapi.com/?apikey=87430ed5&i=${movieID}`);
          return response.data;
        } catch (error) {
          errorResponse = error
          return errorResponse;
        }
      }
    
      (async () => {
        const movieID = route.query.movie;
        if (movieID) {
          movieDetails.value = await fetchMovieDetails(movieID);
        }
      })();
      return {
        movieDetails
      }
    }
  };  
</script>