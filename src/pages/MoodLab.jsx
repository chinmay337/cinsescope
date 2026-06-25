function MoodLab() {
    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">

            <h1 className="text-4xl font-bold text-center">
                🎭 Mood Lab
            </h1>

            <p className="text-center text-gray-400 mt-2">
                Tell us how you're feeling and we'll find the perfect movie.
            </p>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">
                    😊 Happy
                </p></div>

                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">
                    😔 Sad
                </p></div>

                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">🤯 Mind-Blown</p></div>

                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">😌 Relaxed</p></div>

                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">😱 Thriller Night</p></div>

                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">❤️ Romantic</p></div>

                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">🌧 Cozy Evening</p></div>

                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer text-center"><p className="text-xl font-medium">😂 Laugh Hard</p></div>
            </div>
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">
                    Or describe your mood
                </h2>

                <textarea
                    placeholder="I want something emotional but hopeful..."
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 outline-none"
                    rows="4"
                />
            </div>
        </div>
    );
}

export default MoodLab;