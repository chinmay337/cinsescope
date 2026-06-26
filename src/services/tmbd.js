const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const moodToGenre = {
  Happy: "Comedy",
  Sad: "Drama",
  "Mind-Blown": "Science Fiction",
  Relaxed: "Animation",
  "Thriller Night": "Thriller",
  Romantic: "Romance",
  "Cozy Evening": "Family",
  "Laugh Hard": "Comedy",
};

export async function getTrendingMovies() {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
    );
    const data = await response.json();

    return data.results;
}

export async function getMoviesByGenre(genre) {
    const genreMap = {
        Action: 28,
        Adventure: 12,
        Animation: 16,
        Comedy: 35,
        Crime: 80,
        Drama: 18,
        Family: 10751,
        Fantasy: 14,
        Horror: 27,
        Romance: 10749,
        "Science Fiction": 878,
        Thriller: 53,
    };

    const genreId = genreMap[genre];

    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );

    const data = await response.json();

    return data.results;
}