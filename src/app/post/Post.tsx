'use client'

import styled from "styled-components";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

const PostWrap = styled.div`
    background:white;
    border-radius:15px;
    border:1px solid #eaeaea;
    // padding:10px 30px;
    margin-bottom:15px;
`

const FlexWrap = styled.div`
    display:flex;
    justify-content: space-between;
    height:30px;
    align-items: center;
    margin:10px 0;
`

const Tag = styled.p`
    width:80px;
    padding:5px 10px;
    background:#eaeaea;
    border:1px solid #eaeaea;
    border-radius:15px;
    text-align:center;
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
            {cover !== '' ? <Image style={{width:"100%", height:"auto"}} width={660} height={300} src={cover} alt={`${title}-cover`}/> : null}
        </ImageWrap>
        <InfoWrap>
            <h2>
                <Link prefetch={false} href={'/post/'+title}>{title.replaceAll('-',' ')}</Link>
            </h2>
            <FlexWrap>
                <Tag># {tag}</Tag>
                <Time>{moment(created_time).format("YYYY-MM-DD HH:mm:ss")}</Time>
            </FlexWrap>
        </InfoWrap>
    </PostWrap>
}

export default Post