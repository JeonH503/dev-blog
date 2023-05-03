'use client';

import NotionPost from 'notion-to-react';
import { FirstBlock } from '@/utils/block-types';
import styled from 'styled-components';

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
`

function NotionRenderer({blocks, tables}:Props) {
    return <NotionWrap>
        <NotionPost blocks={blocks} tables={tables} />
    </NotionWrap>
}

export default NotionRenderer;