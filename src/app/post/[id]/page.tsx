import { getAllPages,getPage } from "../../../utils/post-api";
import NotionRenderer from "../component/NotionRenderer";
import { FirstBlock } from '@/utils/block-types';

type params = {id:string}

export const dynamicParams = true;

export async function generateStaticParams() {
    let pages = await getAllPages()
    return Object.keys(pages).map((page) => ({id:page}))
}

async function getCachedPage(params:params) {
    const post = await getPage(params.id);
    return post
}

export default async function post({params}:{params:params}) {
    const post = await getCachedPage(params);
    

    return <div>
        {post===null ? '' : <NotionRenderer blocks={post} />}
    </div>
}