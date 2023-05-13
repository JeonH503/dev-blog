'use client'

import styled from "styled-components";

const NotFoundWrap = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    position:fixed;
    left:0;
    top:0;
    width:100vw;
    height:100vh;
    z-index:1000;
    background: rgb(245,245,245);
    text-align:center;
    flex-direction:column;
`

export default function NotFound() {
    return (
      <NotFoundWrap>
        <h1>404 Not Found</h1>
        <h1>존재하지 않는페이지 입니다.</h1>
      </NotFoundWrap>
    );
  }