"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { menuData } from "@/lib/menu-data"
import { BackButton } from "@/components/ui/back-button"
import { MenuItem } from "@/components/features/menu/menu-item"
import type { MenuSection } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UtensilsCrossed, Wine, QrCode, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useTheme } from "next-themes"
import Image from "next/image"

function OrderPageContent() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [tableId, setTableId] = useState<string | null>(null)
  const [manualTableId, setManualTableId] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("pickup")
  const searchParams = useSearchParams()
  
  useEffect(() => {
    setMounted(true)
    // Set initial mode based on URL parameter
    const mode = searchParams.get('mode')
    if (mode === 'online' || mode === 'pickup') {
      setActiveTab(mode)
    }
  }, [searchParams])

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (manualTableId) {
      // Add the table_ prefix if user didn't include it
      const formattedId = manualTableId.startsWith("table_") 
        ? manualTableId 
        : `table_${manualTableId}`
      setTableId(formattedId)
      console.log("Table ID:", formattedId)
    }
  }

  if (!mounted) return null
  const isDark = theme === 'dark'

  const deliveryServices = [
    {
      name: "DoorDash",
      logo: "/doordash-logo.svg", // You may need to create these logo files
      fee: "No fee",
      time: "Ready in 14–20 min",
      url: "https://www.doordash.com/store/side-hustle-bar-salem-25388462/27964950/?pickup=true&rwg_token=AAiGsoaUs-IokaacEs-XhHOBtqWQSs7LS_l6NK-LVWb7L_nejwaqtWkBlBM4Mkz0t-cbfHHoAElJSLFgY0L4ET5KWS_C0JnWuw=="
    },
    {
      name: "Postmates",
      logo: "/postmates-logo.svg",
      fee: "No fee",
      time: "Ready in 6–21 min",
      url: "https://postmates.com/store/side-hustle-bar/n5ak1cjlRvuf0Hefn7Iddw?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas"
    },
    {
      name: "UberEats",
      logo: "/ubereats-logo.svg",
      fee: "No fee",
      time: "Ready in 6–21 min",
      url: "https://www.ubereats.com/store/side-hustle-bar/n5ak1cjlRvuf0Hefn7Iddw?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas"
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container py-8">
        <div className="mb-4">
          <BackButton />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">Order Online</h1>
          <p className="text-gray-600 dark:text-gray-400">Side Hustle Bar</p>
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <Card className="overflow-hidden border-0">
            <div className="p-0">
              <Tabs 
                defaultValue={activeTab} 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 p-1 rounded-md bg-black">
                  <TabsTrigger 
                    value="pickup"
                    className="text-white border border-transparent data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:shadow-xl data-[state=active]:transform data-[state=active]:scale-110 data-[state=active]:border-white data-[state=active]:z-10 transition-all px-6 py-3 rounded-sm hover:bg-gray-800 outline-none focus:outline-none"
                  >
                    Pickup
                  </TabsTrigger>
                  <TabsTrigger 
                    value="delivery"
                    className="text-white border border-transparent data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:shadow-xl data-[state=active]:transform data-[state=active]:scale-110 data-[state=active]:border-white data-[state=active]:z-10 transition-all px-6 py-3 rounded-sm hover:bg-gray-800 outline-none focus:outline-none"
                  >
                    Delivery
                  </TabsTrigger>
                </TabsList>
                
                <div className="p-4">
                  <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-black'} mb-4`}>Place order with:</h3>
                
                  <div className="space-y-3">
                    {deliveryServices.map((service) => (
                      <a 
                        key={service.name} 
                        href={service.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Card className={`${isDark ? 'bg-white hover:bg-gray-100' : 'bg-black hover:bg-gray-900'} ${isDark ? 'text-black' : 'text-white'} border-0 transition-colors`}>
                          <div className="p-4 flex justify-between items-center">
                            <div>
                              <div className={`font-medium ${isDark ? 'text-black' : 'text-white'} text-lg`}>{service.name}</div>
                              <div className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{service.fee}</div>
                              <div className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{service.time}</div>
                            </div>
                            <div className={`${isDark ? 'bg-black' : 'bg-white'} rounded-full p-2`}>
                              <ExternalLink className={`h-4 w-4 ${isDark ? 'text-white' : 'text-black'}`} />
                            </div>
                          </div>
                        </Card>
                      </a>
                    ))}
                  </div>
                </div>
              </Tabs>
            </div>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="food">
            <div className="flex w-full mb-8 overflow-hidden bg-black dark:bg-black rounded-none">
              <TabsList className="flex w-full rounded-none border-0 p-0 h-auto bg-black relative">
                <TabsTrigger 
                  value="food" 
                  className="flex-1 rounded-none py-4 text-base font-medium uppercase text-white bg-black data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:shadow-xl data-[state=active]:border-white data-[state=active]:border-x data-[state=active]:border-t-2 data-[state=active]:border-b-0 data-[state=active]:translate-y-[-2px] data-[state=inactive]:border-transparent transition-all hover:bg-gray-900 gap-2 items-center justify-center outline-none focus:outline-none"
                >
                  <UtensilsCrossed className="w-5 h-5" />
                  FOOD
                </TabsTrigger>
                <TabsTrigger 
                  value="drinks" 
                  className="flex-1 rounded-none py-4 text-base font-medium uppercase text-white bg-black data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:shadow-xl data-[state=active]:border-white data-[state=active]:border-x data-[state=active]:border-t-2 data-[state=active]:border-b-0 data-[state=active]:translate-y-[-2px] data-[state=inactive]:border-transparent transition-all hover:bg-gray-900 gap-2 items-center justify-center outline-none focus:outline-none"
                >
                  <Wine className="w-5 h-5" />
                  DRINKS
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="food" className="space-y-12">
              {menuData.food.map((section: MenuSection) => (
                <div key={section.title} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-black dark:text-white uppercase">
                    {section.title}
                  </h2>
                  <div>
                    {section.items?.map((item, index) => (
                      <MenuItem key={index} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="drinks" className="space-y-12">
              {menuData.drinks.map((section: MenuSection) => (
                <div key={section.title} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-black dark:text-white uppercase">
                    {section.title}
                  </h2>
                  <div>
                    {section.items?.map((item, index) => (
                      <MenuItem key={index} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Table ID scanner only shown when it's not an online/pickup order */}
        {!activeTab && !tableId && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Ready to Order?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Enter your table number to start your order</p>
            
            <Card className="max-w-xs mx-auto overflow-hidden p-6 bg-white dark:bg-gray-900">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-black dark:bg-white flex items-center justify-center">
                  <QrCode className="h-8 w-8 text-white dark:text-black" />
                </div>
              </div>
              
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tableId" className="text-black dark:text-white">Enter your table number</Label>
                  <Input 
                    id="tableId"
                    type="text" 
                    placeholder="e.g. 42" 
                    value={manualTableId}
                    onChange={(e) => setManualTableId(e.target.value)}
                    className="bg-white dark:bg-gray-950 border-black dark:border-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Start Order
                </Button>
              </form>
              
              <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
                Table numbers are available on the QR code at your table
              </p>
            </Card>
          </div>
        )}

        {!activeTab && tableId && (
          <div className="mt-8 text-center">
            <Card className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6">
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">Table {tableId.replace('table_', '')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your ordering session has started!
              </p>
              <div className="p-4 rounded-md bg-gray-100 dark:bg-gray-800">
                <p className="text-gray-800 dark:text-gray-200">
                  This is a demonstration. Full ordering functionality coming soon!
                </p>
              </div>
              <Button 
                onClick={() => setTableId(null)} 
                variant="outline" 
                className="mt-4 border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Start Over
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading order options...</div>}> 
      <OrderPageContent />
    </Suspense>
  );
}