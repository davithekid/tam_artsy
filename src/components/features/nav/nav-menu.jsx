"use client";

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
import { products } from "@/config/navbar";

export const NavMenu = (props) => (
  <NavigationMenu {...props} className="relative z-50">
    <NavigationMenuList className="gap-1 text-sm">

      <NavigationMenuItem>
        <Button asChild variant="ghost">
          <Link href="/">Início</Link>
        </Button>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>

        <NavigationMenuContent
          className="z-[100] relative bg-background border shadow-xl rounded-xl"
        >
          <ul className="grid w-[400px] gap-3 p-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">

            {products.map((item) => (
              <ListItem
                key={item.title}
                href={item.link}
                icon={item.icon}
                title={item.title}
              >
                {item.description}
              </ListItem>
            ))}

          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <Button asChild variant="ghost">
          <Link href="/sobre">Sobre</Link>
        </Button>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <Button asChild variant="ghost">
          <Link href="/contato">Contato</Link>
        </Button>
      </NavigationMenuItem>

    </NavigationMenuList>
  </NavigationMenu>
);

const ListItem = React.forwardRef(
  ({ className, title, children, icon: Icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            {...props}
            className={cn(
              "flex flex-col rounded-md p-3 no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
          >
            <Icon className="mb-2 size-5 text-muted-foreground" />

            <div className="text-sm font-semibold leading-none">
              {title}
            </div>

            <p className="mt-1 text-sm text-muted-foreground leading-snug">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";