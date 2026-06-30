import { useState, useEffect } from "react";
import { getMoviesByGenre, moodToGenre } from "../services/tmbd";
import { analyzeMood } from "../services/gemini";
import suggestions from "../data/suggestions"

function MoodLab() {
    const [selectedMood, setSelectedMood] = useState("");

    const [movies, setMovies] = useState([]);

    const [loading, setLoading] = useState(false);

    const [userMood, setUserMood] = useState("");

    const [insight, setInsight] = useState("");

    const [displayedInsight, setDisplayedInsight] = useState("");

    const [displaySuggestions, setDisplaySuggestions] = useState([]);

    function refreshSuggestions() {
        const shuffled = [...suggestions].sort(() => Math.random() - 0.5);

        setDisplaySuggestions(shuffled.slice(0, 4));
    }

    useEffect(() => {
        refreshSuggestions();
    }, []);

    useEffect(() => {
        if (!insight) return;

        let index = 0;

        setDisplayedInsight("");

        const interval = setInterval(() => {

            setDisplayedInsight(
                insight.slice(0, index + 1)
            );

            index++;

            if (index === insight.length) {
                clearInterval(interval);
            }

        }, 30);

        return () => clearInterval(interval);

    }, [insight]);

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
            const fullPrompt = `I'm in the mood to watch ${userMood}`;

            const result = await analyzeMood(fullPrompt);

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
                <h2 className="text-2xl font-semibold mb-2">
                    🎬 Describe your perfect movie mood
                </h2>

                <p className="text-gray-400 mb-4">
                    I'm in the mood to watch...
                </p>

                <input
                    type="text"
                    value={userMood}
                    onChange={(e) => setUserMood(e.target.value)}
                    placeholder="something comforting after a long day..."
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 outline-none"
                />
            </div>

            <p className="text-gray-400 mt-4 mb-3">
                💡 Need ideas?
            </p>

            <div className="flex flex-wrap gap-3">
                {displaySuggestions.map((suggestion) => (
                    <button
                        key={suggestion}
                        onClick={() => setUserMood(suggestion)}
                        className="bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-full text-sm"
                    >
                        {suggestion}
                    </button>
                ))}

                <button
                    onClick={refreshSuggestions}
                    className="mt-4 text-blue-400 hover:text-blue-300 transition"
                >
                    ✨ Show me more ideas
                </button>

            </div>

            <button
                onClick={handleCustomMood}
                className="mt-4 bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl font-semibold"
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
                        "{displayedInsight}"
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