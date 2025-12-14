import MapBox from "./mapbox";
import { DarkModeToggle } from "./darkmodetoggle";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [startLat, setStartLat] = useState("");
  const [startLng, setStartLng] = useState("");
  const [autoStartPoint, setAutoStartPoint] = useState(false);
  const [kmlFile, setKmlFile] = useState(null);
  const [drone1Mission, setDrone1Mission] = useState(false);
  const [drone2Mission, setDrone2Mission] = useState(false);

  const handleKmlUpload = (event) => {
    const file = event.target.files[0];
    setKmlFile(file);
  };

  const handleSetStartPoint = () => {
    if (startLat && startLng) {
      console.log("Start point set:", { lat: startLat, lng: startLng });
      // Add your logic here to set the start point
    }
  };

  const handleSetMission = () => {
    // Add your mission setup logic here
    console.log("Mission set with:", {
      kmlFile,
      startPoint: { lat: startLat, lng: startLng },
      autoStartPoint,
    });
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    // Reset form if needed
    setStartLat("");
    setStartLng("");
    setAutoStartPoint(false);
    setKmlFile(null);
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Top Navigation Bar - Floating */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-black/90 border-b border-gray-300 dark:border-white/10 backdrop-blur-md">
        {/* Left side - Logo */}
        <div className="flex items-center justify-start">
          <img
            src="/logo.png"
            alt="Team Logo"
            className="w-20 h-20 border-white/20 dark:invert"
          />
        </div>

        {/* Center - Drone Control Boxes */}
        <div className="flex items-center space-x-4">
          {/* Drone 1 Box */}
          <div className="bg-white/30 dark:bg-black/30 border border-gray-300 dark:border-white/10 backdrop-blur-sm rounded-lg p-3">
            <h3 className="text-gray-900 dark:text-white text-sm font-semibold mb-2">Drone 1</h3>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setDrone1Mission(!drone1Mission)}
                className={drone1Mission 
                  ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-500/30 backdrop-blur-sm" 
                  : "bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30 backdrop-blur-sm"
                }
              >
                {drone1Mission ? "⏸ Pause Mission" : "▶ Start Mission"}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30 backdrop-blur-sm"
              >
                🏠 RTH
              </Button>
            </div>
          </div>

          {/* Drone 2 Box */}
          <div className="bg-white/30 dark:bg-black/30 border border-gray-300 dark:border-white/10 backdrop-blur-sm rounded-lg p-3">
            <h3 className="text-gray-900 dark:text-white text-sm font-semibold mb-2">Drone 2</h3>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setDrone2Mission(!drone2Mission)}
                className={drone2Mission 
                  ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-500/30 backdrop-blur-sm" 
                  : "bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30 backdrop-blur-sm"
                }
              >
                {drone2Mission ? "⏸ Pause Mission" : "▶ Start Mission"}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30 backdrop-blur-sm"
              >
                🏠 RTH
              </Button>
            </div>
          </div>
        </div>

        {/* Right side - Set Mission Button and Dark mode toggle */}
        <div className="flex items-center justify-end space-x-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30 backdrop-blur-sm px-6 py-6 text-lg"
              >
                🎯 Set Mission
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white/95 dark:bg-black/95 backdrop-blur-md border border-gray-300 dark:border-white/10">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-white flex items-center">
                  <span className="mr-2">🎯</span>
                  Set Mission Parameters
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                {/* KML Upload */}
                <div className="space-y-2">
                  <Label htmlFor="kml-upload" className="text-gray-900 dark:text-white">
                    Upload KML File
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="kml-upload"
                      type="file"
                      accept=".kml,.kmz"
                      onChange={handleKmlUpload}
                      className="bg-white/50 dark:bg-black/50 border-gray-300 dark:border-white/20"
                    />
                    {kmlFile && (
                      <span className="text-green-400 text-sm">✓ {kmlFile.name}</span>
                    )}
                  </div>
                </div>

                {/* Start Point Coordinates */}
                <div className="space-y-4">
                  <Label className="text-gray-900 dark:text-white font-semibold">
                    Drone Start Point
                  </Label>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-lat" className="text-gray-700 dark:text-white/70">
                        Latitude
                      </Label>
                      <Input
                        id="start-lat"
                        type="number"
                        step="any"
                        placeholder="28.6139"
                        value={startLat}
                        onChange={(e) => setStartLat(e.target.value)}
                        disabled={autoStartPoint}
                        className="bg-white/50 dark:bg-black/50 border-gray-300 dark:border-white/20 disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="start-lng" className="text-gray-700 dark:text-white/70">
                        Longitude
                      </Label>
                      <Input
                        id="start-lng"
                        type="number"
                        step="any"
                        placeholder="77.2090"
                        value={startLng}
                        onChange={(e) => setStartLng(e.target.value)}
                        disabled={autoStartPoint}
                        className="bg-white/50 dark:bg-black/50 border-gray-300 dark:border-white/20 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSetStartPoint}
                    disabled={!startLat || !startLng || autoStartPoint}
                    className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 disabled:opacity-50"
                    variant="outline"
                  >
                    📍 Set Start Point
                  </Button>
                </div>

                {/* Auto Start Point Switch */}
                <div className="flex items-center space-x-3 p-4 bg-white/30 dark:bg-black/30 rounded-lg border border-gray-300 dark:border-white/10">
                  <Switch
                    id="auto-start"
                    checked={autoStartPoint}
                    onCheckedChange={setAutoStartPoint}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="auto-start" className="text-gray-900 dark:text-white font-medium">
                      Auto Start Point
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-white/70">
                      Use drone's current position as start point
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter className="space-x-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSetMission}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                  variant="outline"
                >
                  Set Mission
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <DarkModeToggle />
        </div>
      </nav>

      {/* Main Dashboard */}
      <div className="pt-30 p-6 space-y-6">
        {/* Map + Camera Feeds in one row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white/30 dark:bg-black/30 border border-gray-300 dark:border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
            {/* Map Header */}
            <div className="flex items-center justify-between p-4 bg-white/20 dark:bg-black/20 border-b border-gray-300 dark:border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-pink-400 text-lg">📍</span>
                </div>
                <div>
                  <h2 className="text-gray-900 dark:text-white text-lg font-semibold">
                    Live Map View
                  </h2>
                  <p className="text-gray-600 dark:text-white/50 text-sm">
                    Real-time positioning & tracking
                  </p>
                </div>
              </div>
            </div>

            {/* Map Container - Full Fill */}
            <div className="relative group" style={{height: '545px'}}>
              <MapBox style={{width: '100%', height: '300px'}} />
              {/* Map Overlay */}
              <div className="absolute top-4 right-4 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="text-gray-900 dark:text-white text-sm">
                  <div>Lat: 28.6139° N</div>
                  <div>Lng: 77.2090° E</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Panel - Camera Feeds */}
          <div className="space-y-6">
            {/* Camera Feed 1 */}
            <div className="bg-white/30 dark:bg-black/30 border border-gray-300 dark:border-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-white/20 dark:bg-black/20 border-b border-gray-300 dark:border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-purple-400 text-lg">📹</span>
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
                      Camera Feed 1
                    </h3>
                    <p className="text-gray-600 dark:text-white/50 text-sm">
                      Scout Drone
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[220px] w-full bg-black/50 flex items-center justify-center dark:invert">
                <div className="text-grey-400 text-center">
                  <div>Camera Feed 1</div>
                </div>
              </div>
            </div>

            {/* Camera Feed 2 */}
            <div className="bg-white/30 dark:bg-black/30 border border-gray-300 dark:border-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-white/20 dark:bg-black/20 border-b border-gray-300 dark:border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-cyan-400 text-lg">📹</span>
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
                      Camera Feed 2
                    </h3>
                    <p className="text-gray-600 dark:text-white/50 text-sm">
                      Delivery Drone
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[220px] w-full bg-black/50 flex items-center justify-center dark:invert">
                <div className="text-grey-400 text-center">
                  <div>Camera Feed 2</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Telemetry Data 1 */}
          <div className="bg-white/30 dark:bg-black/30 border border-gray-300 dark:border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
            {/* Telemetry Data 1 Header */}
            <div className="flex items-center justify-between p-4 bg-white/20 dark:bg-black/20 border-b border-gray-300 dark:border-white/10">
              <div className="flex items-center space-x-3">
                <div>
                  <h2 className="text-gray-900 dark:text-white text-lg font-semibold">
                    Telemetry Data 1
                  </h2>
                  <p className="text-gray-600 dark:text-white/50 text-sm">
                    Scout Drone
                  </p>
                </div>
              </div>
            </div>

            {/* Drone 1 Data - Elevated UI with 10 Boxes */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {/* Altitude Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-blue-300/30 dark:border-blue-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 dark:text-blue-400 text-xs font-medium uppercase tracking-wider">Altitude</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">125.4 m</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 text-sm">⬆️</span>
                    </div>
                  </div>
                </div>

                {/* Battery Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-green-300/30 dark:border-green-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 dark:text-green-400 text-xs font-medium uppercase tracking-wider">Battery</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">80%</p>
                    </div>
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 text-sm">🔋</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-green-500 w-4/5 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Latitude Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-purple-300/30 dark:border-purple-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 dark:text-purple-400 text-xs font-medium uppercase tracking-wider">Latitude</p>
                      <p className="text-gray-900 dark:text-white text-lg font-bold mt-1">28.6139° N</p>
                    </div>
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-purple-400 text-sm">📍</span>
                    </div>
                  </div>
                </div>

                {/* Longitude Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-orange-300/30 dark:border-orange-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 dark:text-orange-400 text-xs font-medium uppercase tracking-wider">Longitude</p>
                      <p className="text-gray-900 dark:text-white text-lg font-bold mt-1">77.2090° E</p>
                    </div>
                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-orange-400 text-sm">🌍</span>
                    </div>
                  </div>
                </div>

                {/* Roll Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-cyan-300/30 dark:border-cyan-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyan-600 dark:text-cyan-400 text-xs font-medium uppercase tracking-wider">Roll</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">-2.3°</p>
                    </div>
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-cyan-400 text-sm">↔️</span>
                    </div>
                  </div>
                </div>

                {/* Pitch Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-indigo-300/30 dark:border-indigo-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-600 dark:text-indigo-400 text-xs font-medium uppercase tracking-wider">Pitch</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">1.8°</p>
                    </div>
                    <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-400 text-sm">↕️</span>
                    </div>
                  </div>
                </div>

                {/* Heading Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-pink-300/30 dark:border-pink-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-pink-600 dark:text-pink-400 text-xs font-medium uppercase tracking-wider">Heading</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">245°</p>
                    </div>
                    <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-pink-400 text-sm">🧭</span>
                    </div>
                  </div>
                </div>

                {/* GPS Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-emerald-300/30 dark:border-emerald-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-600 dark:text-emerald-400 text-xs font-medium uppercase tracking-wider">GPS</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">15 Sats</p>
                    </div>
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-400 text-sm">🛰️</span>
                    </div>
                  </div>
                </div>

                {/* Connectivity Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-teal-300/30 dark:border-teal-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-teal-600 dark:text-teal-400 text-xs font-medium uppercase tracking-wider">Connectivity</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">Excellent</p>
                    </div>
                    <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-teal-400 text-sm">📡</span>
                    </div>
                  </div>
                </div>

                {/* Flight Time Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-amber-300/30 dark:border-amber-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-600 dark:text-amber-400 text-xs font-medium uppercase tracking-wider">Flight Time</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">23:45</p>
                    </div>
                    <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-amber-400 text-sm">⏱️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Data 2 */}
          <div className="bg-white/30 dark:bg-black/30 border border-gray-300 dark:border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
            {/* Telemetry Data 2 Header */}
            <div className="flex items-center justify-between p-4 bg-white/20 dark:bg-black/20 border-b border-gray-300 dark:border-white/10">
              <div className="flex items-center space-x-3">
                <div>
                  <h2 className="text-gray-900 dark:text-white text-lg font-semibold">
                    Telemetry Data 2
                  </h2>
                  <p className="text-gray-600 dark:text-white/50 text-sm">
                    Delivery Drone
                  </p>
                </div>
              </div>
            </div>

            {/* Drone 2 Data - Elevated UI with 10 Boxes */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {/* Altitude Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-blue-300/30 dark:border-blue-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 dark:text-blue-400 text-xs font-medium uppercase tracking-wider">Altitude</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">98.7 m</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 text-sm">⬆️</span>
                    </div>
                  </div>
                </div>

                {/* Battery Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-yellow-300/30 dark:border-yellow-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 dark:text-yellow-400 text-xs font-medium uppercase tracking-wider">Battery</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">65%</p>
                    </div>
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-400 text-sm">🔋</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-yellow-500 w-2/3 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Latitude Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-purple-300/30 dark:border-purple-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 dark:text-purple-400 text-xs font-medium uppercase tracking-wider">Latitude</p>
                      <p className="text-gray-900 dark:text-white text-lg font-bold mt-1">28.6145° N</p>
                    </div>
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-purple-400 text-sm">📍</span>
                    </div>
                  </div>
                </div>

                {/* Longitude Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-orange-300/30 dark:border-orange-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 dark:text-orange-400 text-xs font-medium uppercase tracking-wider">Longitude</p>
                      <p className="text-gray-900 dark:text-white text-lg font-bold mt-1">77.2085° E</p>
                    </div>
                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-orange-400 text-sm">🌍</span>
                    </div>
                  </div>
                </div>

                {/* Roll Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-cyan-300/30 dark:border-cyan-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyan-600 dark:text-cyan-400 text-xs font-medium uppercase tracking-wider">Roll</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">1.5°</p>
                    </div>
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-cyan-400 text-sm">↔️</span>
                    </div>
                  </div>
                </div>

                {/* Pitch Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-indigo-300/30 dark:border-indigo-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-600 dark:text-indigo-400 text-xs font-medium uppercase tracking-wider">Pitch</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">-0.9°</p>
                    </div>
                    <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-400 text-sm">↕️</span>
                    </div>
                  </div>
                </div>

                {/* Heading Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-pink-300/30 dark:border-pink-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-pink-600 dark:text-pink-400 text-xs font-medium uppercase tracking-wider">Heading</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">312°</p>
                    </div>
                    <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-pink-400 text-sm">🧭</span>
                    </div>
                  </div>
                </div>

                {/* GPS Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-emerald-300/30 dark:border-emerald-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-600 dark:text-emerald-400 text-xs font-medium uppercase tracking-wider">GPS</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">13 Sats</p>
                    </div>
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-400 text-sm">🛰️</span>
                    </div>
                  </div>
                </div>

                {/* Connectivity Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-teal-300/30 dark:border-teal-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-teal-600 dark:text-teal-400 text-xs font-medium uppercase tracking-wider">Connectivity</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">Good</p>
                    </div>
                    <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-teal-400 text-sm">📡</span>
                    </div>
                  </div>
                </div>

                {/* Flight Time Box */}
                <div className="bg-white/40 dark:bg-black/40 border border-amber-300/30 dark:border-amber-500/30 rounded-xl p-4 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-600 dark:text-amber-400 text-xs font-medium uppercase tracking-wider">Flight Time</p>
                      <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">18:32</p>
                    </div>
                    <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-amber-400 text-sm">⏱️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;