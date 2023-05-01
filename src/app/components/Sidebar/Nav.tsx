'use client'

import styled from "styled-components"

const NavWrap = styled.nav`
    background:white;
    padding:10px 20px;
    border-radius:10px;
    border:1px solid #eaeaea;
    margin:5px 20px;
`

function Nav({categories}:{categories:string[]}) {
    return<NavWrap>
        <ul>
            {categories.map(category => <li>{category}</li>)}
        </ul>
    </NavWrap>
}

export default Nav