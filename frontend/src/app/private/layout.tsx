'use client'

import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const [nav, setNav] = useState(true)
  
  function manageNav() {
    if(nav === true) {
      setNav(false)
      return
    }
    setNav(true)
  }

  return (
    <html lang="pt-BR">
      <body>
        <main className={nav===true?"":"recolhida"}>
          <Navbar 
            nav={nav}
            manageNav={manageNav}
          />
          {children}
        </main>
      </body>
    </html>
  );
}
