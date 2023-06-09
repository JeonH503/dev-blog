"use client"

import Link from "next/link"
import styled from "styled-components"
import hamburger from '../../../public/hamburger.svg'
import Image from "next/image"
import Sidebar from "./Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation';

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
    width:900px;
    height:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin:0 auto;

    & a {
        text-decoration:none;
        color:black;
        margin:0 20px;
    }

    & img {
        display:none;
        cursor:pointer;
        margin-right:10px;
    }

    @media screen and (max-width:1023px) {
        width:100%;
        
        & img {
            display:block;
            // margin-right:25px;
        }
    }
`

const HamburgerWrap = styled.div<{hamburgerDisplay:boolean}>`
    position:fixed;
    top:0px;
    width:100%;
    height:100vh;
    background:rgba(0,0,0,0.5);
    display:none;

    @media screen and (max-width:1023px) {
        display:${(props)=>props.hamburgerDisplay ? 'flex' : 'none'};
        justify-content: end;
    }
`

function Header({categories}:{categories:string[]}) {
    const [hamburgerDisplay, setHamburgerDisplay] = useState(false);
    
    const pathname = usePathname();

    const openHamburger = () => {
        setHamburgerDisplay(true)
    }

    const closeHamburger = () => {
        setHamburgerDisplay(false)
    }

    // 페이지 이동될때(사용자가 nav를 눌렀을때) nav 창 닫기
    useEffect(() => {
        return () => {
            closeHamburger()
        }
    },[pathname])

    // hamburger가 켜진상태로 리사이즈시 원상태로 되돌리기
    useEffect(() => {
        window.addEventListener('resize', () => {
            if(window.innerWidth > 1023) {
                closeHamburger()
            }
        },true)
    },[])

    return <HeaderWrap>
        <HamburgerWrap hamburgerDisplay={hamburgerDisplay} onClick={closeHamburger}>
            {/* 캡쳐링 비활성화 */}
            {
                hamburgerDisplay && <span onClick={(event)=>{event.stopPropagation()}}>
                    <Sidebar categories={categories} header={true}/>
                </span>
            }
        </HamburgerWrap>
        <FlexBox>
            <Link href={'/index'}><h2>JJH&apos;s Blog</h2></Link>
            <Image alt="hamburger" src={hamburger} width={30} height={30} onClick={openHamburger}/>
        </FlexBox>
    </HeaderWrap>
}

export default Header