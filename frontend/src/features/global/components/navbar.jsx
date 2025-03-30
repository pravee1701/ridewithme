import React, { useContext } from 'react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
import { UserDataContext } from '../../user/context/UserContext';
const Navbar = () => {
  const {user} = useContext(UserDataContext);
  return (
    <div className='bg-black w-full fixed top-0 left-0 h-[4em] border-b border-gray-800 flex items-center justify-between px-6 z-50 text-white'>
      <div className="flex items-center gap-10">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Uber</h1>
        
        {/* Main Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(
                "text-white hover:text-gray-600 transition-colors font-medium"
              )}>
                Ride
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(
                "text-white hover:text-gray-600 transition-colors font-medium"
              )}>
                Drive
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(
                "text-white hover:text-gray-600 transition-colors font-medium"
              )}>
                Business
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(
                "text-white hover:text-gray-600 transition-colors font-medium"
              )}>
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-white">
          <Globe className="h-5 w-5" />
        </Button>
        <Button variant="ghost" className="text-white hover:text-gray-600 font-medium">
          EN
        </Button>
       
        <Button variant="ghost" className="text-white hover:text-gray-600 font-medium">
          Help
        </Button>
        {user ? (
          <Button variant="ghost" className="text-white hover:text-gray-600 font-medium">
            Profile
          </Button>
        ) : (
          <>
            <NavLink to="/login">
              <Button variant="ghost" className="text-white hover:text-gray-600 font-medium">
                Log in
              </Button>
            </NavLink>
            <NavLink to="/register">
              <Button className="bg-white text-black hover:bg-gray-200 font-medium rounded-full">
                Register
              </Button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;