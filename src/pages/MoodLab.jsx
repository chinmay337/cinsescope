import { useState } from "react";
import { getMoviesByGenre, moodToGenre } from "../services/tmbd";
import { analyzeMood } from "../services/gemini";

function MoodLab() {
    const [selectedMood, setSelectedMood] = useState("");

    const [movies, setMovies] = useState([]);

    const [loading, setLoading] = useState(false);

    const [userMood, setUserMood] = useState("");

    const [insight, setInsight] = useState("");

    const moodToGenre = {
        Happy: "Comedy",
        Sad: "Drama",
        "Mind-Blown": "Science Fiction",
        Relaxed: "Animation",
        "Thriller Night": "Thriller",
        Romantic: "Romance",
        "Cozy Evening": "Family",
        "Laugh Hard": "Comedy",
    };

    async function handleMoodClick(mood) {
        setSelectedMood(mood);
        setLoading(true);

        try {
            const genre = moodToGenre[mood];

            const data = await getMoviesByGenre(genre);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            setMovies(data);
        } catch (error) {
            console.error(error);
            alert("Couldn't fetch movies. Please check your internet connection and try again.");

        } finally {
            setLoading(false);
        }
    }

    async function handleCustomMood() {
        if (!userMood.trim()) return;

        setLoading(true);

        try {
            const result = await analyzeMood(userMood);

            setInsight(result.insight);

            const data = await getMoviesByGenre(result.genre);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            setMovies(data);

        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">

            <h1 className="text-4xl font-bold text-center">
                🎭 Mood Lab
            </h1>

            <p className="text-center text-gray-400 mt-2">
                Tell us how you're feeling and we'll find the perfect movie.
            </p>

            <div className="grid grid-cols-2 gap-6">
                <div
                    onClick={() => handleMoodClick("Happy")}
                    className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">
                        😊 Happy
                    </p></div>

                <div
                    onClick={() => handleMoodClick("Sad")}
                    className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">
                        😔 Sad
                    </p></div>

                <div
                    onClick={() => handleMoodClick("Mind-Blown")}
                    className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">🤯 Mind-Blown</p></div>

                <div
                    onClick={() => handleMoodClick("Relaxed")}
                    className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">😌 Relaxed</p></div>

                <div
                    onClick={() => handleMoodClick("Thriller Night")}
                    className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">😱 Thriller Night</p></div>

                <div
                    onClick={() => handleMoodClick("Romantic")}
                    className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">❤️ Romantic</p></div>

                <div
                    onClick={() => handleMoodClick("Cozy Evening")}
                    className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">🌧 Cozy Evening</p></div>

                <div
                    onClick={() => handleMoodClick("Laugh Hard")}
                    className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">😂 Laugh Hard</p></div>

                {selectedMood && (
                    <p className="mt-6 text-lg text-green-400">
                        Selected Mood: {selectedMood}
                    </p>
                )}
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">
                    Or describe your mood
                </h2>

                <textarea
                    onChange={(e) => setUserMood(e.target.value)}
                    placeholder="I want something emotional but hopeful..."
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 outline-none"
                    rows="4"
                />
            </div>

            <button
                onClick={handleCustomMood}
                className="mt-4 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold"
            >
                ✨ Ask CineScope
            </button>

            {loading && (
                <h2 className="text-center text-blue-400 text-xl mt-8">
                    🍿 Curating your best movie for your mood...
                </h2>
            )}

            {insight && (
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mt-8 mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        🎬 CineScope whispers...
                    </h2>

                    <p className="text-gray-300 italic">
                        "{insight}"
                    </p>
                </div>
            )}

            <div className="mt-10">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="bg-gray-900 rounded-xl p-4 mb-6 flex gap-5"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-40 rounded-lg"
                        />

                        <div>
                            <h2 className="text-2xl font-bold">
                                {movie.title}
                            </h2>

                            <p className="text-gray-400">
                                📅 {movie.release_date}
                            </p>

                            <p className="text-yellow-400 mt-2">
                                ⭐ {movie.vote_average.toFixed(1)} / 10
                            </p>

                            <p className="text-gray-400 mt-4">
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default MoodLab;