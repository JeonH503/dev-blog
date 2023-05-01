"use client"

import styled from "styled-components"

const MainWrap = styled.section`
    width:40%;
    background:white;
    padding:10px 20px;
    border-radius:10px;
    border:1px solid #eaeaea;
`

function Main({children}:{children: React.ReactNode}) {
    return <MainWrap>
        {children}
    </MainWrap>
}

export default Main