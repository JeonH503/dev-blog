"use client"

import styled from "styled-components"

const MainWrap = styled.section`
    width:700px;
    padding:10px 20px;
`

function Main({children}:{children: React.ReactNode}) {
    return <MainWrap>
        {children}
    </MainWrap>
}

export default Main