"use client"
import { useCallback, useEffect, useRef, useState } from "react"

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}
