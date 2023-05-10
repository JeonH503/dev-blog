import { Suspense } from "react";
import dynamic from 'next/dynamic';
import { getAllPages,getPage } from "../../../utils/post-api";
import { notFound } from "next/navigation";
import Comments from "@/app/components/Comments";

const NotionRenderer = dynamic(() => import('../NotionRenderer'),{
    loading: () => <p>Loading...</p>,
  },);

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

    if(!post)
        notFound()

    return <div>
        {post===null ? '' : <NotionRenderer blocks={post} />}
        <Comments/>
    </div>
}