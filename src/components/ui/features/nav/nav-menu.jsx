"use client";;
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  foods,
  travelMenuItems,
} from "@/config/navbar";

export const NavMenu = (props) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-1 space-x-0 text-sm">
      <NavigationMenuItem>
        <Button asChild variant="ghost">
          <Link href="#">Inicio</Link>
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul
            className="grid w-[400px] gap-3 p-1 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {foods.map((food) => (
              <ListItem href="#" icon={food.icon} key={food.title} title={food.title}>
                {food.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button asChild variant="ghost">
          <Link href="#">Sobre</Link>
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button asChild variant="ghost">
          <Link href="#">Contato</Link>
        </Button>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          ref={ref}
          {...props}>
          <props.icon className="mb-4 size-6" />
          <div className="font-semibold text-sm leading-none">{title}</div>
          <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
