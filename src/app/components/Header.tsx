"use client"

import styled from "styled-components"

const HeaderWrap = styled.header`
    width:100%;
    height:51px;
    border-bottom:1px solid #eaeaea;
    position:sticky;
    top:0;
    z-index:1000;
    background:rgba(255,255,255,0.8);
    backdrop-filter: blur(5px);
`

const FlexBox = styled.div`
    width:70%;
    height:100%;
    display:flex;
    align-items: center;
    margin:0 auto;
`

function Header() {
    return <HeaderWrap>
        <FlexBox>
            <h2>JJH's Blog</h2>
        </FlexBox>
    </HeaderWrap>
}

export default Header