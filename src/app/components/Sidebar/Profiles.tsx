'use client'

import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import profilePhoto from '../../../../public/profile.jpg'
import github from '../../../../public/github.png'

const ProfilesWrap = styled.nav`
    background: rgb(57,62,70);
    background: linear-gradient(180deg, rgba(57,62,70,1) 48%, rgba(234,234,234,1) 100%);
    padding:10px 20px;
    border-radius:10px;
    border:1px solid #eaeaea;
    width:100%;
    position:relative;
    overflow:hidden;

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

    
    @media screen and (max-width:1023px) {
        border:0px;
        background: white;
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

const Bold = styled.p`
    text-align:center;
    margin-bottom:1px;
    font-size:17px;
    font-weight:bold;
`

function Profiles() {
    return<ProfilesWrap>
        <PhotoWrap>
            <Image src={profilePhoto} width={150} height={150} alt="profile"></Image>
        </PhotoWrap>
        <Bold>전준희</Bold>
        <Bold>JunHui Jeon</Bold>
        <GithubWrap>
            <Link href="https://github.com/JeonH503">
                <Image src={github} width={25} height={25} alt="profile-github"></Image>
            </Link>
        </GithubWrap>
    </ProfilesWrap>
}

export default Profiles