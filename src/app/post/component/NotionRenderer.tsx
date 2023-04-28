'use client';

import NotionPost from 'notion-to-react';
import { FirstBlock } from '@/utils/block-types';

type Tables = {[key:string]:FirstBlock}

interface Props {
    blocks:FirstBlock;
    tables?:Tables
}

function NotionRenderer({blocks, tables}:Props) {
    return <NotionPost blocks={blocks} tables={tables} />
}

export default NotionRenderer;