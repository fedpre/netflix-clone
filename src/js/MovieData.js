const API_KEY = '1bbd72f65a0b1467640f1ec5f35f67b9'
const BASE_URL = `https://api.themoviedb.org/3/` 
// search url example: https://api.themoviedb.org/3/search/movie?api_key=1bbd72f65a0b1467640f1ec5f35f67b9&language=en-US&query=spiderman

export default class MovieData {
  constructor() {
    this.imgURL = 'https://image.tmdb.org/t/p/w500'
  }

  init () {
  }

  async getTrendingMovies(timePeriod) {
   return await fetch(`${BASE_URL}trending/all/${timePeriod}?api_key=${API_KEY}`).then(result => result.json())
  }

  async getMovieById(id) {
    return await fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}`).then(res => res.json())
  }
  async getSimilarMovies(id) {
    return await fetch(`${BASE_URL}movie/${id}/similar?api_key=${API_KEY}`).then(res => res.json())
  }

  async discoverMovies() {
    return await fetch(`${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false`).then(res => res.json())
  }

  async getGenres() {
    return await fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`).then(res => res.json())
  }


}
