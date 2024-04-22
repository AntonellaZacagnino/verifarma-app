<style lang="scss">
@use "~/assets/scss/home.scss";
</style>

<template>
  <UContainer>
    <Navbar />
    <Nuxt keep-alive />
    <div class="search-container">
      
      <div class="search-input">
        <label for="search" aria-label="Find a movie">Find a movie</label>
        <input aria-label="Insert a movie here" v-model="query" type="search" name="search" id="search">
      </div>
      <button class='search' @click="findMovie">Search</button>
      <div v-if="movieList.length > 0" class="pagination">
        <button @click="previous" class="pagination-btn previous">
          <span aria-hidden="true" class="material-symbols-outlined">arrow_back_ios</span>
          Previous
        </button>
        <button @click="next" class="pagination-btn next">
          Next
          <span aria-hidden="true" class="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
      <ul class="movies-list">
        <li class="movie" v-for="movie in movieList" :key="movie.imdbID">
          <button @click="movieDetails(movie.imdbID)">
            <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl more-details"><span>more details</span></div>
            <img aria-label='Movie poster' v-if="movie.Poster != 'N/A'" :src="movie.Poster" alt="">
            <img aria-label='Movie poster' v-else src="/not-image.jpg" alt="">
          </button>
          <h6>{{ movie.Title }}</h6>
        </li>
      </ul>
    </div>
  </UContainer>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import Navbar from '~/components/navbar.vue';

export default {
  components: {
    Navbar
  },
  setup() {
    var movieList = ref([]);
    var query = ref('');
    var errorResponse = ''
    var currentPage = 1;
    var totalPages = ref('')

    const fetchMovies = async (query,currentPage) => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?page=${currentPage}&s=${query}&type=movie&apikey=87430ed5`);
        totalPages = parseInt(response.data.totalResults / 10)
        movieList.value = response.data.Search;
      } catch (error) {
        errorResponse = error
      }
    };

    const findMovie = () => {
      fetchMovies(query.value, currentPage);
    };
    
    const next = () => {
      if(currentPage >= 1 && currentPage != totalPages) {
        currentPage++
        findMovie()
      }
    }
    
    const previous = () => {
      if(currentPage <= currentPage && currentPage > 1){
        currentPage--
        findMovie()
      }
    }

    return {
      movieList,
      query,
      findMovie,
      currentPage,
      totalPages,
      next,
      previous,
    };
  },
  methods:{
    movieDetails(movieID){
      window.location.href = `/movie-detail?${new URLSearchParams({movie: movieID})}`
    },
  }
};
</script>