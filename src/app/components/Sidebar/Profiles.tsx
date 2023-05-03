'use client'

import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import profilePhoto from '../../../../public/profile.jpg'
import github from '../../../../public/github.png'

const ProgilesWrap = styled.nav`
    background: rgb(57,62,70);
    background: linear-gradient(180deg, rgba(57,62,70,1) 48%, rgba(234,234,234,1) 100%);
    padding:10px 20px;
    border-radius:10px;
    border:1px solid #eaeaea;
    width:100%;
    position:relative;
    overflow:hidden;

    & h4 {
        text-align:center;
        margin:10px 0;
    }

    & * {
        position:relative;
        z-index:100;
    }

    &:before {
        content:"";
        position:absolute;
        left: 0;
        bottom: 0;
        height: 170px;
        width: 100%;
        background:white;
        border-top-left-radius:50px;
        border-top-right-radius:50px;
        z-index:1;
    }
`

const PhotoWrap = styled.div`
    width:150px;
    height:150px;
    border-radius:150px;
    overflow:hidden;
    margin:0 auto;
`

const GithubWrap = styled.div`
    margin:0 auto;
    width:25px;
`

function Progiles() {
    return<ProgilesWrap>
        <PhotoWrap>
            <Image src={profilePhoto} width={150} height={150} alt="profile"></Image>
        </PhotoWrap>
        <h4>JunHui Jeon</h4>
        <GithubWrap>
            <Link href="https://github.com/JeonH503">
                <Image src={github} width={25} height={25} alt="profile-github"></Image>
            </Link>
        </GithubWrap>
    </ProgilesWrap>
}

export default Progiles