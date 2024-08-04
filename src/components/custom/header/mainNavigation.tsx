"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import AlgoliaBlueButton from "@/components/animata/text/button/algolia-blue-button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const locations: { title: string; href: string; description: string }[] = [
 
  {
    title: "Punjab",
    href: "/docs/primitives/scroll-area",
    description: "Explore the Vibrant Culture and Scenic Beauty of Punjab!",
  },
  {
    title: "Uttarakhand",
    href: "/docs/primitives/tabs",
    description:
      "Discover the Landscapes and Spiritual Serenity of Uttarakhand!",
  },
]


const experiences: { title: string; href: string; description: string }[] = [
 
  {
    title: "Cultural",
    href: "/docs/primitives/scroll-area",
    description: "Explore the Vibrant Culture and Scenic Beauty of Punjab!",
  },
  {
    title: "Farmstay",
    href: "/docs/primitives/tabs",
    description:
      "Discover the Landscapes and Spiritual Serenity of Uttarakhand!",
  },
  {
    title: "Village life",
    href: "/docs/primitives/scroll-area",
    description: "Explore the Vibrant Culture and Scenic Beauty of Punjab!",
  },
  {
    title: "Nature Trails",
    href: "/docs/primitives/tabs",
    description:
      "Discover the Landscapes and Spiritual Serenity of Uttarakhand!",
  },  
]



export default function NavigationMenuDemo() {
  return (

    <>

    <NavigationMenu>
      <NavigationMenuList>
      <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={"uppercase tracking-wider" + navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>        

        <NavigationMenuItem>
          <NavigationMenuTrigger className="uppercase tracking-wider">Destinations</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className=" grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {locations.map((location) => (
                <ListItem
                  key={location.title}
                  title={location.title}
                  href={location.href}
                >
                  {location.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="uppercase tracking-wider">Experiences</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className=" grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {experiences.map((location) => (
                <ListItem
                  key={location.title}
                  title={location.title}
                  href={location.href}
                >
                  {location.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="uppercase tracking-wider">About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
               
                    <div className=" mb-2 mt-4 text-lg font-medium">
                    γερανός (geranós)
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                    The rich Indian culture is best symbolised by the traditional Indian folk art of 'rangolis' made across the length and breadth of the country. The rangoli represents the happiness, positivity and liveliness of a household.
                    </p>
                    <div className="text-slate-800 mb-2 mt-4 text-md font-medium width-auto">
                    Read More
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>

            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>

   <div className="mt-2">
   <AlgoliaBlueButton ctaText="Plan A Trip !" ctaLink="/"/>
   </div>


    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
