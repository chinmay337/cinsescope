function DebateLab() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center">
          ⚔️ Debate Lab
        </h1>

        <p className="text-center text-gray-400 mt-3">
          Settle the ultimate movie debate.
        </p>

      </div>
      <div className="flex items-center justify-center gap-6 mt-12">

        <input
          type="text"
          placeholder="🔍 Search first movie..."
          className="w-96 bg-gray-900 border border-gray-800 rounded-xl p-4 outline-none"
        />

        <div className="text-2xl font-bold">
          VS
        </div>

        <input
          type="text"
          placeholder="🔍 Search second movie..."
          className="w-96 bg-gray-900 border border-gray-800 rounded-xl p-4 outline-none"
        />

      </div>
      <div className="bg-gray-900 rounded-2xl mt-12 h-72 flex items-center justify-center text-gray-500">

        Movie Cards will appear here

      </div>

      <div className="bg-gray-900 rounded-2xl mt-8 h-64 flex items-center justify-center text-gray-500">

        Comparison Table

      </div>

      <div className="bg-gray-900 rounded-2xl mt-8 h-40 flex items-center justify-center text-gray-500">

        🎬 CineScope Verdict

      </div>
      
    </div>
  );
}

export default DebateLab;