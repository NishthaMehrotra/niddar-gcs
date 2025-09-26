import MapBox from "./mapbox";
import { DarkModeToggle } from "./darkmodetoggle";

function App() {
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/20 dark:bg-black/20 border-b border-gray-300 dark:border-white/10 backdrop-blur-md">
        {/* Left side - Logo */}
        <div className="flex items-center justify-start min-w-0 flex-1">
          <img
            src="/logo.png"
            alt="Team Logo"
            className="w-12 h-12 animate-spin rounded-full border-2 border-white/20 dark:invert"
          />
        </div>

        {/* Right side - Dark mode toggle */}
        <div className="flex items-center justify-end min-w-0 flex-1">
          <DarkModeToggle />
        </div>
      </nav>

      {/* Main Dashboard */}
      <div className="p-6 space-y-6">
        {/* Map Section */}
        <div className="bg-white/30 dark:bg-black/30 border border-gray-300 dark:border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
          {/* Map Header */}
          <div className="flex items-center justify-between p-4 bg-white/20 dark:bg-black/20 border-b border-gray-300 dark:border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <span className="text-pink-400 text-lg">📍</span>
              </div>
              <div>
                <h2 className="text-gray-900 dark:text-white text-lg font-semibold">Live Map View</h2>
                <p className="text-gray-600 dark:text-white/50 text-sm">Real-time positioning & tracking</p>
              </div>
            </div>

            {/* Map Controls */}
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors">
                Satellite
              </button>
              <button className="px-3 py-1.5 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/70 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-white/20 transition-colors">
                Terrain
              </button>
              <button className="px-3 py-1.5 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/70 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-white/20 transition-colors">
                Street
              </button>
            </div>
          </div>

          {/* Map Container */}
          <div className="h-[600px] w-full relative group">
            <MapBox />
            {/* Map Overlay */}
            <div className="absolute top-4 right-4 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-gray-900 dark:text-white text-sm">
                <div>Lat: 28.6139° N</div>
                <div>Lng: 77.2090° E</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission Controls */}
          <div className="bg-white/30 dark:bg-black/30 border border-gray-300 dark:border-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">🎮</span>
              Mission Controls
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-lg py-2 px-4 transition-all duration-300 hover:scale-105">
                ▶ Start Mission
              </button>
              <button className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg py-2 px-4 transition-all duration-300 hover:scale-105">
                ⏸ Pause Mission
              </button>
              <button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg py-2 px-4 transition-all duration-300 hover:scale-105">
                ⏹ Emergency Stop
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white/30 dark:bg-black/30 border border-gray-300 dark:border-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">⚙️</span>
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-white/70">Communication</span>
                <span className="text-green-400 font-semibold">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-white/70">Navigation</span>
                <span className="text-blue-400 font-semibold">LOCKED</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-white/70">Telemetry</span>
                <span className="text-green-400 font-semibold">STREAMING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
