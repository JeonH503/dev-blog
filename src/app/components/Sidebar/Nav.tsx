'use client'

import styled from "styled-components"
import Link from "next/link"

const NavWrap = styled.nav`
    background:white;
    padding:10px 20px;
    border-radius:10px;
    border:1px solid #eaeaea;
    margin-top:15px;
    width:100%;

    & ul {
        list-style: none;
        text-align:center;
    }

    & h4 {
        margin:8px 0;
    }

    & ul li {
        margin:8px 0;
    }

    & ul a {
        margin:8px 0;
        text-decoration:none;
        color:black;
    }

    & ul a:hover {
        font-weight:bold;
    }
`

const Divider = styled.div`
    height: 1px;
    border-bottom: 1px solid rgba(55,53,47,0.16);
    width: 100%;
`

function Nav({categories}:{categories:string[]}) {
    return<NavWrap>
        <h4>분류</h4>
        <Divider/>
        <ul>
            {categories.map(category => <Link key={category} prefetch={false} href={'/category/'+category}><li>{category}</li></Link>)}
        </ul>
    </NavWrap>
}

export default Nav