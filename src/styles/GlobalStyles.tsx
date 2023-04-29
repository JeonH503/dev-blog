"use client"

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body {
        background:rgb(245, 245, 245);
        min-height:100vh; 
        max-width: 100vw;
        overflow: overlay;
    }
    
`

export default GlobalStyles