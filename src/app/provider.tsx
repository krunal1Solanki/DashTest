'use client'

import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    //@ts-ignore
      <ChakraProvider>
        {children}
      </ChakraProvider>
  ) 
}