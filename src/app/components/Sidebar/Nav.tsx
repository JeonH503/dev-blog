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

    & ul > li > a {
        margin:8px 0;
        text-decoration:none;
        color:black;
    }

    & ul > li > a:hover  {
        font-weight:bold;
    }

    & ul > li > a:active  {
        font-weight:bold;
    }

    @media screen and (max-width:1023px) {
        border:0px;
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
            <List selected={pathname === '/dev-blog/' || pathname === '/dev-blog/index'}><Link href={'/index'}>전체보기</Link></List>
            {categories.map(category => <List key={category} selected={decodeURIComponent(pathname) === '/dev-blog/category/'+category}><Link href={'/category/'+category}>{category}</Link></List>)}
        </ul>
    </NavWrap>
}

export default Nav