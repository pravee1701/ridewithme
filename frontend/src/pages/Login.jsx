import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserRound, Car, ArrowRight, LogIn } from 'lucide-react'
import { NavLink } from 'react-router-dom'


const Login = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400">Choose how you want to continue</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Rider Card */}
          <div 
           
          >
            <Card className="border-2 hover:border-black dark:hover:border-white transition-all duration-300 overflow-hidden h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <UserRound className="h-5 w-5" />
                    <span>Rider Account</span>
                  </CardTitle>
                  <span className="bg-black text-white dark:bg-white dark:text-black text-xs font-medium px-2.5 py-1 rounded-full">Passenger</span>
                </div>
                <CardDescription>Login to book rides and manage your trips</CardDescription>
              </CardHeader>
              
              <CardContent className="flex flex-col justify-center items-center pt-4">
                <div className="relative group w-full aspect-video max-w-[280px] mb-4">
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg transform group-hover:scale-95 transition-all duration-300"></div>
                  <img 
                    src="/ride.svg" 
                    alt="Rider illustration" 
                    className="relative z-10 w-full h-full object-contain p-4"
                  />
                </div>
                
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300 w-full">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-black dark:text-white" />
                    <span>Book rides instantly</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-black dark:text-white" />
                    <span>Track your ride history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-black dark:text-white" />
                    <span>Save favorite destinations</span>
                  </li>
                </ul>
              </CardContent>
              
              <CardFooter className="pt-4">
              <NavLink to={"/user-login"} className={"w-full"}>
                <Button className="w-full group hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 py-6">
                  <span className="mr-2">Login as Rider</span>
                  <LogIn className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                </NavLink>
              </CardFooter>
            </Card>
          </div>
          
          {/* Captain Card */}
          <div 
            
          >
            <Card className="border-2 hover:border-black dark:hover:border-white transition-all duration-300 overflow-hidden h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    <span>Captain Account</span>
                  </CardTitle>
                  <span className="bg-black text-white dark:bg-white dark:text-black text-xs font-medium px-2.5 py-1 rounded-full">Driver</span>
                </div>
                <CardDescription>Login to accept rides and manage your earnings</CardDescription>
              </CardHeader>
              
              <CardContent className="flex flex-col justify-center items-center pt-4">
                <div className="relative group w-full aspect-video max-w-[280px] mb-4">
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg transform group-hover:scale-95 transition-all duration-300"></div>
                  <img 
                    src="/captain.svg" 
                    alt="Captain illustration" 
                    className="relative z-10 w-full h-full object-contain p-4"
                  />
                </div>
                
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300 w-full">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-black dark:text-white" />
                    <span>Accept ride requests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-black dark:text-white" />
                    <span>Track your earnings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-black dark:text-white" />
                    <span>Manage your availability</span>
                  </li>
                </ul>
              </CardContent>
              
              <CardFooter className="pt-4">
                <NavLink to={"/captain-login"} className={"w-full"}>
                <Button className="w-full group hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 py-6">
                  <span className="mr-2">Login as Captain</span>
                  <LogIn className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                </NavLink>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Don't have an account? <a href="/register" className="font-medium underline underline-offset-4 hover:text-black dark:hover:text-white">register</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login
