import { getPages,getPage } from "../../../utils/api";

type params = {id:string}

export const dynamicParams = true;

export async function generateStaticParams() {
    let pages = await getPages()
    return Object.keys(pages).map((page) => ({id:page}))
}

async function getCachedPage(params:params) {
    const post = await getPage(params.id);
    return post
}

export default async function post({params}:{params:params}) {
    const post = await getCachedPage(params);
    // post status 400일때 error 페이지로 redirect 필요
    return <>{post.type}</>
}