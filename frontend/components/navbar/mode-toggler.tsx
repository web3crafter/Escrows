"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ModeToggleProps {
  className?: string
}
export function ModeToggle({ className }: ModeToggleProps) {
  const { setTheme, theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // console.log(theme)
  }, [theme])

  if (!isMounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={
        theme === "dark" ? () => setTheme("light") : () => setTheme("dark")
      }
      className={cn("hover:bg-transparent ", className)}
    >
      {theme === "dark" ? (
        <Sun
          className="mx-auto hover:scale-105 text-accent"
          onClick={() => setTheme("light")}
        />
      ) : (
        <Moon
          className="mx-auto hover:scale-105 text-accent"
          onClick={() => setTheme("dark")}
        />
      )}
    </Button>
  )
}
