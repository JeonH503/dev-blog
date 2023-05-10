'use client'

import styled,{ keyframes } from "styled-components"

const LoadingWrap = styled.div`
    position:fixed;
    top:0px;
    left:0px;
    width:100vw;
    height:100vh;
    background:rgb(245,245,245);
    // transition: all 1s ease-out;
`

const LoadingDiv = styled.div`
    display:flex;
    width:100vw;
    height:100vh;
    justify-content:center;
    align-items:center;
`

const LdsRing = keyframes`
    0% {
        transform: rotate(0deg);    
    }
    100% {
        transform: rotate(360deg);
    }
`

const Loader = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    &:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid black;
        border-color: black transparent black transparent;
        animation: ${LdsRing} 1.2s linear infinite;
    }
`

function Loading() {
    return <LoadingWrap>
        <LoadingDiv>
            <Loader/>
        </LoadingDiv>
    </LoadingWrap>
}

export default Loading