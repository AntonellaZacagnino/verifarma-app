<style lang="scss">
@use "~/assets/scss/home.scss";
</style>

<template>
  <UContainer>
    <Navbar />
    <Nuxt keep-alive />
    <div class="search-container fade-in">
      
      <div class="search-input">
        <label for="search" aria-label="Find a movie">Find a movie</label>
        <div class="search-wrapper">
          <input 
            class="material-symbols-outlined"
            aria-label="Insert a movie here" 
            v-model="query" 
            type="search" 
            name="search" 
            id="search"
            placeholder="Search for movies..."
            @keyup.enter="findMovie"
          >
        </div>
      </div>
      
      <button class='search ' @click="findMovie" :disabled="!query.trim()">
        Search
      </button>
      
      <div v-if="movieList.length > 0 && noResults == false" class="pagination">
        <button @click="previous" class="pagination-btn previous" :disabled="currentPage <= 1">
          <span aria-hidden="true" class="material-symbols-outlined">arrow_back_ios</span>
          Previous
        </button>
        <button @click="next" class="pagination-btn next" :disabled="currentPage >= totalPages">
          Next
          <span aria-hidden="true" class="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
      
      <div v-else-if="noResults == true" class="no-results slide-up">
        <h1>Sorry, there are no titles available.</h1>
        <p>Try searching with different keywords</p>
      </div>
      
      <ul class="movies-list" v-if="movieList.length > 0">
        <li class="movie slide-up" v-for="(movie, index) in movieList" :key="movie.imdbID" :style="{animationDelay: `${index * 0.1}s`}">
          <div class="image-container">
            <img 
              aria-label='Movie poster' 
              v-if="movie.Poster != 'N/A'" 
              :src="movie.Poster" 
              :alt="`${movie.Title} poster`"
              loading="lazy"
            >
            <img 
              aria-label='Movie poster' 
              v-else 
              src="/not-image.jpg" 
              :alt="`${movie.Title} poster not available`"
              loading="lazy"
            >
            <button @click="movieDetails(movie.imdbID)" class="more-details" :aria-label="`View details for ${movie.Title}`">
              <span>View Details</span>
            </button>
          </div>
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
    var currentPage = ref(1);
    var totalPages = ref(0)
    var noResults = ref(false)
    
    const fetchMovies = async (searchQuery, page) => {
      try {
        movieList.value = []
        const response = await axios.get(`http://www.omdbapi.com/?page=${page}&s=${searchQuery}&type=movie&apikey=87430ed5`);
        if (response.data.Response == 'True'){
          totalPages.value = Math.ceil(parseInt(response.data.totalResults) / 10)
          movieList.value = response.data.Search;
          noResults.value = false
        } else {
          noResults.value = true
        }
      } catch (error) {
        errorResponse = error
      }
    };

    const findMovie = () => {
      currentPage.value = 1;
      fetchMovies(query.value, currentPage.value);
    };
    
    const next = () => {
      if(currentPage.value < totalPages.value) {
        currentPage.value++
        fetchMovies(query.value, currentPage.value)
      }
    }
    
    const previous = () => {
      if(currentPage.value > 1){
        currentPage.value--
        fetchMovies(query.value, currentPage.value)
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
      noResults
    };
  },
  methods:{
    movieDetails(movieID){
      window.location.href = `/movie-detail?${new URLSearchParams({movie: movieID})}`
    },
  }
};
</script>