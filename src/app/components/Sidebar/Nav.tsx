'use client'

import styled from "styled-components"

const NavWrap = styled.nav`
    background:white;
    padding:10px 20px;
    border-radius:10px;
    border:1px solid #eaeaea;
    margin-top:15px;
    width:100%;
`

function Nav({categories}:{categories:string[]}) {
    return<NavWrap>
        <ul>
            {categories.map(category => <li key={category}>{category}</li>)}
        </ul>
    </NavWrap>
}

export default Nav