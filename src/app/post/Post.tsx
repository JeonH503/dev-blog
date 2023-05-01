'use client'

import styled from "styled-components";


const PostWrap = styled.div`
    display:flex;
`

interface Props {
    title:string;
    created_time:string;
    tag:string;
    id:string;
    cover:string|null;
}

function Post({title,created_time,tag,id,cover}:Props) {
    return <PostWrap>
        {title}
    </PostWrap>
}

export default Post