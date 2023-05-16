"use client"

import styled from "styled-components"
import { useState } from "react";

const MainWrap = styled.section`
    width:700px;
    padding:10px 20px;

    // @media screen and (max-width:1023px) {

    // }

    @media screen and (max-width:767px) {
        width:100vw;
        padding:10px 0px;
    }
`

function Main({children}:{children: React.ReactNode}) {
    return <MainWrap>
        {children}
    </MainWrap>
}

export default Main