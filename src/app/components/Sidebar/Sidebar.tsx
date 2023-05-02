'use client'

import Nav from "./Nav"
import Profiles from "./Profiles"
import styled from "styled-components"

const SidebarWrap = styled.div`
    display:flex;
    flex-direction: column;
    padding-top:10px;
    width:200px;
`

function Sidebar({categories}:{categories:string[]}) {
    return<SidebarWrap>
        <Profiles/>
        <Nav categories={categories} />
    </SidebarWrap>
}

export default Sidebar