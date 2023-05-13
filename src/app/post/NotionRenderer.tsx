'use client';

import NotionPost from 'notion-to-react';
import { FirstBlock } from '@/utils/block-types';
import styled from 'styled-components';
import moment from 'moment';


type Tables = {[key:string]:FirstBlock}

interface Props {
    blocks:FirstBlock;
    tables?:Tables;
    info: {
        id: string;
        title: string;
        desc: string;
        cover: string | null;
        created_time: string;
    }
}

const NotionWrap = styled.div`
    background:white;
    border-radius:15px;
    border:1px solid #eaeaea;
    padding:40px;
    margin-bottom:15px;
    position:relative;
`

const Title = styled.h1`
    padding-bottom:15px;
    z-index: 0;
    position: relative;
    font-size:30px;
`

const CreatedTime = styled.p`
    text-align:right;
    margin-right:15px;
    z-index: 0;
    position: relative;
`

const TitleWrap = styled.div<{background:string|null}>`
    text-align:center;
    height:200px;
    margin-bottom:30px;
    position:relative;
    display:flex;
    flex-direction:column;
    justify-content: center;
    ${props=>props.background ? `color:white;` : 'color:black;'}

    &:before {
        ${props=>props.background ? `background:url(${props.background});` : ''}
        background-size: cover;
        // opacity: 0.6;
        content: '';
        position: absolute;
        top: 0; 
        left:0; 
        right:0;
        bottom:0;
        filter: blur(3px) brightness(70%);
        border-radius:10px;
    }
`

function NotionRenderer({blocks, tables, info}:Props) {
    return <NotionWrap>
        <TitleWrap background={info.cover}>
            <Title>{info.title}</Title>
            <CreatedTime>{moment(info.created_time).format('YYYY-MM-DD')}</CreatedTime>
        </TitleWrap>
        <NotionPost blocks={blocks} tables={tables} />
    </NotionWrap>
}

export default NotionRenderer;