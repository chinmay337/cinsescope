import { Link } from "react-router-dom";
const labs = [
  {
    icon: "🎭",
    title: "Mood Lab",
    description: "Find movies based on your mood.",
    path: "/mood"
  },
  {
    icon: "⚔️",
    title: "Debate Lab",
    description: "Compare two movies.",
    path: "/debate"
  },
  {
    icon: "🧠",
    title: "Taste Lab",
    description: "Discover your movie personality.",
    path: "/taste"
  },
  {
    icon: "🕰️",
    title: "Timeline Lab",
    description: "Explore movies through time.",
    path: "/timeline"
  }
];

function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <h1 className="text-5xl font-bold text-center">
          🎬 CineScope
        </h1>

        <p className="text-center text-gray-400 mt-3">
          Explore Movies Differently
        </p>

        <h2 className="text-3xl font-semibold mt-16 mb-8">
           Movie Labs
        </h2>
        <div className="grid grid-cols-2 gap-6">
        {labs.map((lab) => (
            <Link 
              key={lab.title}
              to={lab.path}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition cursor-pointer"
            >
                <h3 className="text-4xl mb-4">{lab.icon}</h3>

                <h2 className="text-xl font-semibold mb-2">
                    {lab.title}
                </h2>

                <p className="text-gray-400">
                    {lab.description}
                </p>
            </Link>
        ))}
        </div>
        <div className="text-center mt-20 text-gray-500">
            Built with ❤️ for Movie Lovers
        </div>
      </div>
    </div>
  );
}

export default Home;