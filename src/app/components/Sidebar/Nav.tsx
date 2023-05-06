'use client'

import styled from "styled-components"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

    & ul > a {
        margin:8px 0;
        text-decoration:none;
        color:black;
    }

    & ul > a:hover > li {
        font-weight:bold;
    }

    & ul > a:active > li {
        font-weight:bold;
    }
`

const List = styled.li<{selected:boolean}>`
    margin:8px 0;
    ${(props)=>props.selected ? 'font-weight:bold;':''}
`

const Divider = styled.div`
    height: 1px;
    border-bottom: 1px solid rgba(55,53,47,0.16);
    width: 100%;
`

function Nav({categories}:{categories:string[]}) {
    const pathname = usePathname();

    return<NavWrap>
        <h4>분류</h4>
        <Divider/>
        <ul>
            {categories.map(category => <Link key={category} prefetch={false} href={'/category/'+category}><List selected={pathname === '/category/'+category}>{category}</List></Link>)}
        </ul>
    </NavWrap>
}

export default Nav