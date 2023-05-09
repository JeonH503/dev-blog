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

    const hamburgerEvent = () => {
        if(hamburgerDisplay) {
            document.body.style.overflowY = 'auto'
        } else {
            document.body.style.overflowY = 'hidden'
        }

        setHamburgerDisplay(!hamburgerDisplay)
    }

    const closeHamburger = () => {
        document.body.style.overflowY = 'auto'
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
                setHamburgerDisplay(false);
                document.body.style.overflowY = 'auto'
            }
        },true)
    })

    return <HeaderWrap>
        <HamburgerWrap hamburgerDisplay={hamburgerDisplay} onClick={hamburgerEvent}>
            {/* 캡쳐링 비활성화 */}
            <span onClick={(event)=>{event.stopPropagation()}}>
                <Sidebar categories={categories} header={true}/>
            </span>
        </HamburgerWrap>
        <FlexBox>
            <Link href={'/'}><h2>JJH&apos;s Blog</h2></Link>
            <Image alt="hamburger" src={hamburger} width={30} height={30} onClick={hamburgerEvent}/>
        </FlexBox>
    </HeaderWrap>
}

export default Header