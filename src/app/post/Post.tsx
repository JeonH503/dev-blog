'use client'

import styled from "styled-components";
import Image from "next/image";

const PostWrap = styled.div`
    background:white;
    border-radius:15px;
    border:1px solid #eaeaea;
    padding:10px 30px;
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

interface Props {
    title:string;
    created_time:string;
    tag:string;
    id:string;
    cover:string;
}

function Post({title,created_time,tag,id,cover}:Props) {
    return <PostWrap>
        {cover !== '' ? <Image src={cover} width={500} height={300} alt={`${title}-cover`}/> : null}
        <h2>{title}</h2>
        <FlexWrap>
            <Tag># {tag}</Tag>
            <Time>{created_time}</Time>
        </FlexWrap>
    </PostWrap>
}

export default Post