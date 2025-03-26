"use client"

import { useState } from "react"
import { Lightbulb, Thermometer, Fan, Wind, Power, Plus, Minus, Sun, Moon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function HomeAutomation() {
  // State for lights
  const [livingRoomLight, setLivingRoomLight] = useState(false)
  const [kitchenLight, setKitchenLight] = useState(false)
  const [bedroomLight, setBedroomLight] = useState(false)

  // State for temperature
  const [temperature, setTemperature] = useState(72)

  // State for AC
  const [acPower, setAcPower] = useState(false)
  const [acMode, setAcMode] = useState("cool")
  const [acFanSpeed, setAcFanSpeed] = useState(3)

  // State for fans
  const [ceilingFan, setCeilingFan] = useState(false)
  const [ceilingFanSpeed, setCeilingFanSpeed] = useState([2])

  // State for theme
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen p-4 md:p-8 ${isDarkMode ? "dark" : ""}`}>
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Smart Home Control</h1>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </header>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="lights">Lights</TabsTrigger>
            <TabsTrigger value="climate">Climate</TabsTrigger>
            <TabsTrigger value="fans">Fans</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Room Status Card - Added as first card */}
              <Card>
                <CardHeader>
                  <CardTitle>Room Status</CardTitle>
                </CardHeader>
                <CardContent className="py-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2" />
                        <span>Lights</span>
                      </div>
                      <span className="text-sm font-medium">
                        {livingRoomLight || kitchenLight || bedroomLight ? "Some On" : "All Off"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Thermometer className="h-5 w-5 mr-2" />
                        <span>Temperature</span>
                      </div>
                      <span className="text-sm font-medium">{temperature}°F</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Wind className="h-5 w-5 mr-2" />
                        <span>AC</span>
                      </div>
                      <span className="text-sm font-medium">{acPower ? "On" : "Off"}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Fan className="h-5 w-5 mr-2" />
                        <span>Fan</span>
                      </div>
                      <span className="text-sm font-medium">
                        {ceilingFan ? `On (Speed ${ceilingFanSpeed[0]})` : "Off"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setLivingRoomLight(false)
                      setKitchenLight(false)
                      setBedroomLight(false)
                      setAcPower(false)
                      setCeilingFan(false)
                    }}
                  >
                    Turn All Off
                  </Button>
                </CardFooter>
              </Card>

              {/* Lights Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Lights
                  </CardTitle>
                  <CardDescription>Control your home lighting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Living Room</span>
                    <Switch checked={livingRoomLight} onCheckedChange={setLivingRoomLight} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Kitchen</span>
                    <Switch checked={kitchenLight} onCheckedChange={setKitchenLight} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Bedroom</span>
                    <Switch checked={bedroomLight} onCheckedChange={setBedroomLight} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setLivingRoomLight(false)
                      setKitchenLight(false)
                      setBedroomLight(false)
                    }}
                  >
                    Turn All Off
                  </Button>
                </CardFooter>
              </Card>

              {/* Temperature Control */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Thermometer className="mr-2 h-5 w-5" />
                    Temperature
                  </CardTitle>
                  <CardDescription>Adjust room temperature</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <span className="text-4xl font-bold">{temperature}°F</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" onClick={() => setTemperature(Math.max(60, temperature - 1))}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Slider
                      value={[temperature]}
                      min={60}
                      max={85}
                      step={1}
                      onValueChange={(value) => setTemperature(value[0])}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" onClick={() => setTemperature(Math.min(85, temperature + 1))}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AC Control */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wind className="mr-2 h-5 w-5" />
                    Air Conditioner
                  </CardTitle>
                  <CardDescription>Control your AC unit</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Power</span>
                    <Switch checked={acPower} onCheckedChange={setAcPower} />
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Mode</span>
                    <div className="grid grid-cols-3 gap-2">
                      {["cool", "heat", "auto"].map((mode) => (
                        <Button
                          key={mode}
                          variant={acMode === mode ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAcMode(mode)}
                          disabled={!acPower}
                          className="capitalize"
                        >
                          {mode}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Fan Speed</span>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((speed) => (
                        <Button
                          key={speed}
                          variant={acFanSpeed === speed ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAcFanSpeed(speed)}
                          disabled={!acPower}
                        >
                          {speed}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ceiling Fan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Fan className="mr-2 h-5 w-5" />
                    Ceiling Fan
                  </CardTitle>
                  <CardDescription>Control your ceiling fan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Power</span>
                    <Switch checked={ceilingFan} onCheckedChange={setCeilingFan} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Fan Speed</span>
                      <span className="text-sm">{ceilingFanSpeed[0]}</span>
                    </div>
                    <Slider
                      value={ceilingFanSpeed}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={setCeilingFanSpeed}
                      disabled={!ceilingFan}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" disabled={!ceilingFan}>
                        Fan Options
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setCeilingFanSpeed([1])}>Quiet Mode</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCeilingFanSpeed([3])}>Normal Mode</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCeilingFanSpeed([5])}>Turbo Mode</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lights" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Individual Light Cards */}
              <Card>
                <CardHeader>
                  <CardTitle>Living Room Light</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <Lightbulb
                    className={`h-16 w-16 mb-4 ${livingRoomLight ? "text-yellow-400" : "text-muted-foreground"}`}
                  />
                  <Switch checked={livingRoomLight} onCheckedChange={setLivingRoomLight} className="mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kitchen Light</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <Lightbulb
                    className={`h-16 w-16 mb-4 ${kitchenLight ? "text-yellow-400" : "text-muted-foreground"}`}
                  />
                  <Switch checked={kitchenLight} onCheckedChange={setKitchenLight} className="mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bedroom Light</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <Lightbulb
                    className={`h-16 w-16 mb-4 ${bedroomLight ? "text-yellow-400" : "text-muted-foreground"}`}
                  />
                  <Switch checked={bedroomLight} onCheckedChange={setBedroomLight} className="mt-4" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="climate" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Temperature Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Thermometer className="mr-2 h-5 w-5" />
                    Temperature Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl font-bold">{temperature}°F</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" onClick={() => setTemperature(Math.max(60, temperature - 1))}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Slider
                      value={[temperature]}
                      min={60}
                      max={85}
                      step={1}
                      onValueChange={(value) => setTemperature(value[0])}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" onClick={() => setTemperature(Math.min(85, temperature + 1))}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AC Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wind className="mr-2 h-5 w-5" />
                    AC Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Power</span>
                    <Switch checked={acPower} onCheckedChange={setAcPower} />
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Mode</span>
                    <div className="grid grid-cols-3 gap-2">
                      {["cool", "heat", "auto"].map((mode) => (
                        <Button
                          key={mode}
                          variant={acMode === mode ? "default" : "outline"}
                          onClick={() => setAcMode(mode)}
                          disabled={!acPower}
                          className="capitalize"
                        >
                          {mode}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Fan Speed</span>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((speed) => (
                        <Button
                          key={speed}
                          variant={acFanSpeed === speed ? "default" : "outline"}
                          onClick={() => setAcFanSpeed(speed)}
                          disabled={!acPower}
                        >
                          {speed}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fans" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ceiling Fan Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Fan className="mr-2 h-5 w-5" />
                    Ceiling Fan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center py-4">
                    <Fan
                      className={`h-20 w-20 mb-4 ${ceilingFan ? "text-primary animate-spin" : "text-muted-foreground"}`}
                      style={{ animationDuration: ceilingFan ? `${6 - ceilingFanSpeed[0]}s` : "0s" }}
                    />
                    <div className="flex items-center mt-4 space-x-2">
                      <Power className="h-4 w-4" />
                      <Switch checked={ceilingFan} onCheckedChange={setCeilingFan} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Fan Speed</span>
                      <span className="text-sm">{ceilingFanSpeed[0]}</span>
                    </div>
                    <Slider
                      value={ceilingFanSpeed}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={setCeilingFanSpeed}
                      disabled={!ceilingFan}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full" disabled={!ceilingFan}>
                        Fan Presets
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setCeilingFanSpeed([1])}>Sleep Mode</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCeilingFanSpeed([3])}>Normal Mode</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCeilingFanSpeed([5])}>Cooling Mode</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

