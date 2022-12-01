
export default class MoviesListing {
  constructor(movieData, cardsContainerNode) {
    this.movieData = movieData
    this.parentNode = cardsContainerNode
    this.trendingMovies = {} 
    this.discoverMovies = {}
    this.movieGenres = {}
  }

  async init () {
    this.trendingMovies = await this.movieData.getTrendingMovies('week')
    this.discoverMovies = await this.movieData.discoverMovies()
    this.movieGenres = await this.movieData.getGenres()
    this.showMovies(this.discoverMovies)
  }

  movieGenreNames(ids) {
    let arrNames = []
    ids.map(id => {
      const tag = this.movieGenres.genres.filter(genre => genre.id === id)
      arrNames.push(tag[0].name)
      })
    return arrNames
  }

  prepareTemplate(parent, template) {
    this.discoverMovies.results.map(movie => {
      const clone = template.content.cloneNode(true)
      const posterImg = clone.querySelector('.movie-img')
      posterImg.src = this.movieData.imgURL + movie.poster_path 
      const dataId = clone.querySelector('.movie-card')
      dataId.setAttribute('data-id', movie.id)
      const title = clone.querySelector('.movie-title')
      title.innerText = movie.title
      const rating = clone.querySelector('.movie-rating')
      rating.innerText = movie.vote_average
      const genre = clone.querySelector('.movie-genre')
      const movieGenreNames = this.movieGenreNames(movie.genre_ids)
      movieGenreNames.map(g => {
        const span = document.createElement('span')
        span.innerText = g
        span.setAttribute('class', 'movie-genre-span')
        genre.appendChild(span)
      })
      const aTag = clone.querySelector('.movie-anchor')
      aTag.href = `./src/movie-page/index.html?movie=${movie.id}`
      parent.appendChild(clone)
    })
  }

  showMovies(movies) {
    const template = document.querySelector('#movie-card')
    this.prepareTemplate(this.parentNode, template)
  }
}
