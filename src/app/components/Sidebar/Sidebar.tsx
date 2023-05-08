'use client'

import Nav from "./Nav"
import Profiles from "./Profiles"
import styled from "styled-components"

const SidebarWrap = styled.div<{header?:boolean}>`
    display:flex;
    flex-direction: column;
    padding-top:10px;
    width:200px;

    @media screen and (max-width:1023px) {
        background:white;
        padding-right:5px;
        width:250px;
        height:100vh;
        display:${(props)=>props.header ? 'flex' : 'none'};
    }

    @media screen and (max-width:767px) {
        width:260px;
    }
`

function Sidebar({categories,header}:{categories:string[],header?:boolean}) {
    return<SidebarWrap header={header}>
        <Profiles/>
        <Nav categories={categories} />
    </SidebarWrap>
}

export default Sidebar