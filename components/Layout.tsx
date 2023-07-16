import React from "react";
import { ReactNode } from "react";

const Layout = ({children}:{ children: ReactNode }) =>{
    return(
        <section className="Layout">
            {children}
        </section>
    )
}

export default Layout;