'use client';

import NotionPost from 'notion-to-react';
import { FirstBlock } from '@/utils/block-types';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import moment from 'moment';
import { Suspense } from 'react';


type Tables = {[key:string]:FirstBlock}

interface Props {
    blocks:FirstBlock;
    tables?:Tables
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
    border-bottom: 1px solid rgba(55,53,47,0.16);
    padding-bottom:15px;
`

const CreatedTime = styled.p`
    color: #666666;
    text-align:right;
    margin-right:5px;
`

const TitleWrap = styled.div`
    text-align:center;
    margin-bottom:30px;
`

function NotionRenderer({blocks, tables}:Props) {
    const pathname = usePathname();

    return <NotionWrap>
        <TitleWrap>
            <Title>{decodeURIComponent(pathname).split('/')[2].replaceAll("-",' ')}</Title>
            <CreatedTime>{moment(Array.isArray(blocks.results) ? blocks.results[0].created_time : '').format('YYYY-MM-DD')}</CreatedTime>
        </TitleWrap>
        <Suspense fallback={"test"}>
            <NotionPost blocks={blocks} tables={tables} />
        </Suspense>
    </NotionWrap>
}

export default NotionRenderer;