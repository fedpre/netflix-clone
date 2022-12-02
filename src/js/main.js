import MovieData from './MovieData.js' 
import MoviesListing from './MoviesListing.js'
import { footerDate } from './utils.js'

const cardsContainerNode = document.querySelector('.cards-container')
const movieData = new MovieData()
const moviesListing = new MoviesListing(movieData, cardsContainerNode)
moviesListing.init()

const searchForm = document.querySelector('#search-form')
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const queryString = e.target.search.value
  await moviesListing.showMovies('#movie-card', true, queryString)
  e.target.search.value = ''
} ,false)

footerDate()