"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { UserControl } from "@/components/user-control";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const isScrolled = useScroll();
  return (
   <nav className={cn(
  "p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent",
  isScrolled 
    && "bg-background/90 border-b border-purple-100/30 dark:border-purple-900/30 shadow-sm" 
    
)}>
  <div className="max-w-5xl mx-auto w-full flex justify-between items-center px-4">
    <Link href="/" className="flex items-center gap-2 group">
      <div className={cn(
        "relative transition-all duration-300",
        isScrolled ? "" : "hover:scale-110"
      )}>
        <div className="absolute -inset-1 rounded-full bg-purple-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <Image 
          src="/logo.svg" 
          alt="Aura" 
          width={32} 
          height={32} 
          className="relative z-10 drop-shadow-sm"
        />
      </div>
      <span className="font-semibold text-lg bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Aura</span>
    </Link>
    
    <SignedOut>
      <div className="flex gap-3">
        <SignUpButton>
          <Button 
            variant="outline" 
            size="sm"
            className="border-purple-200 dark:border-purple-900/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-700 dark:text-purple-300 transition-all"
          >
            Sign up
          </Button>
        </SignUpButton>
        <SignInButton>
          <Button 
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow transition-all"
          >
            Sign in
          </Button>
        </SignInButton>
      </div>
    </SignedOut>
    
    <SignedIn>
      <div className="relative">
        <div className={cn(
          "absolute -inset-1 rounded-full bg-purple-500/10 blur-sm transition-opacity",
          isScrolled ? "opacity-0" : "opacity-50"
        )}></div>
        <UserControl showName />
      </div>
    </SignedIn>
  </div>
</nav>
  );
};


{/* <nav className={cn(
  "p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent",
  isScrolled && "bg-background border-border"
  
  )}>
  <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.svg" alt="Aura" width={30} height={30} />
      <span className="font-semibold text-lg">Aura</span>
    </Link>
    <SignedOut>
      <div className="flex gap-2">
        <SignUpButton>
          <Button variant="outline" size="sm">
            Sign up
          </Button>
        </SignUpButton>
        <SignInButton>
          <Button size="sm">Sign in</Button>
        </SignInButton>
      </div>
    </SignedOut>
    <SignedIn>
      <UserControl showName />
    </SignedIn>
  </div>
</nav> */}