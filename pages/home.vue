<style lang="scss">
@use "~/assets/scss/home.scss";
</style>

<template>
  <div>
    <Navbar />
    <div class="search-container">
      <div class="search-input">
        <label for="search">Find a movie</label>
        <input v-model="query" type="search" name="search" id="search">
      </div>
      <button @click="findMovie">Search</button>
      <ul class="movies-list">
        <li class="movie" v-for="movie in movieList" :key="movie.imdbID">
          <button @click="movieDetails(movie.imdbID)">
            <div class="more-details"><span>more details</span></div>
            <img v-if="movie.Poster != 'N/A'" :src="movie.Poster" alt="">
            <img v-else src="/not-image.jpg" alt="">
          </button>
          <h6>{{ movie.Title }}</h6>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import Navbar from '~/components/navbar.vue';
import { useRoute } from 'vue-router';


export default {
  components: {
    Navbar
  },
  setup() {
    var route = useRoute();
    var movieList = ref([]);
    var query = ref('');
    var errorResponse = ''

    const fetchMovies = async (query) => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?s=${query}&type=movie&apikey=87430ed5`);
        movieList.value = response.data.Search;
        console.log(response)
      } catch (error) {
        errorResponse = error
      }
    };

    const findMovie = () => {
      fetchMovies(query.value);
    };
    
    
    return {
      movieList,
      query,
      findMovie
    };
  },
  methods:{
    movieDetails(movieID){
      window.location.href = `/movie-detail?${new URLSearchParams({movie: movieID})}`
    }
  }
};
</script>