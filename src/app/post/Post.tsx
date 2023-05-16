'use client'

import styled from "styled-components";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

const PostWrap = styled.div`
    background:white;
    border-radius:15px;
    border:1px solid #eaeaea;
    margin-bottom:15px;
    transition: all .05s ease-in;

    & a {
        text-decoration:none;
        color:black;
    }

    &:has(a:hover) {
        transform: scale(1.02, 1.02);
    }

    & div:first-child:hover + div h2 a {
        text-decoration:underline;
    }

    & h2 > a:hover {
        text-decoration:underline;
    }
`

const FlexWrap = styled.div`
    display:flex;
    justify-content: space-between;
    height:30px;
    align-items: center;
    margin:10px 0;
`

const Tag = styled.p`
    padding:5px 10px;
    background:#eaeaea;
    border:1px solid #eaeaea;
    border-radius:15px;
    text-align:center;
    transition: all .05s ease-in;

    &:hover {
        transform: scale(1.05, 1.05);
    }
`

const Time = styled.p`
    color:#747474;
`

const ImageWrap = styled.div<{cover:string}>`
    position:relative;
    height:${props=>props.cover === '' ? '0px' : '250px'};
    overflow:hidden;
    
    & img {
        border-top-left-radius:15px;
        border-top-right-radius:15px;
    }
`

const InfoWrap = styled.div`
    padding:10px 30px;
`

interface Props {
    title:string;
    created_time:string;
    tag:string;
    id:string;
    cover:string;
}

function Post({title,created_time,tag,id,cover}:Props) {
    return <PostWrap>
        <ImageWrap cover={cover}> 
            {
                cover !== '' ? 
                <Link href={'/post/'+title}>
                    <Image style={{width:"100%", height:"auto"}} quality={40} width={660} height={300} src={cover} alt={`${title}-cover`}/>
                </Link> : 
                null
            }
        </ImageWrap>
        <InfoWrap>
            <h3>
                <Link href={'/post/'+title}>{title.replaceAll('-',' ')}</Link>
            </h3>
            <FlexWrap>
                <Link href={'/category/'+tag}>
                    <Tag># {tag}</Tag>
                </Link>
                <Time>{moment(created_time).format("YYYY-MM-DD")}</Time>
            </FlexWrap>
        </InfoWrap>
    </PostWrap>
}

export default Post