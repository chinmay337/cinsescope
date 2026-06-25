const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const moodGenres = {
    Happy: 35,
    Sad: 18,
    "Mind-Blown": 878,
    Relaxed: 16,
    "Thriller Night": 53,
    Romantic: 10749,
    "Cozy Evening": 10751,
    "Laugh Hard": 35,
};

export async function getTrendingMovies() {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
    );
    const data = await response.json();

    return data.results;
}

export async function getMoviesByMood(mood) {
    const genre = moodGenres[mood];

    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}`
    );

    const data = await response.json();

    return data.results;
}