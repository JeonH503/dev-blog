import { getAllPages,getPage, searchPost } from "../../../utils/post-api";
import { notFound } from "next/navigation";
import Comments from "@/app/components/Comments";
import NotionRenderer from '../NotionRenderer';
import { Metadata } from 'next';
// import dynamic from "next/dynamic";
// const NotionRenderer = dynamic(() => import('../NotionRenderer'), { ssr: false });
// const Comments = dynamic(() => import('@/app/components/Comments'), { ssr: false });
type Props = {
  params: { id: string };
};
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = decodeURIComponent(params.id);
    const page_info = await searchPost(id);
    return {
        title: page_info?.title,
        description:page_info?.desc,
        openGraph:{
            title: page_info?.title,
            description:page_info?.desc,
            images: [{
                url: page_info?.cover ? page_info.cover : '',
            }],
        }
    };
}
export default async function post({params}:{params:params}) {
    const post = await getCachedPage(params);
    if(!post)
        notFound()

    return <div>
        {post===null ? '' : <NotionRenderer blocks={post.block} info={post.info} />}
        <Comments/>
    </div>
}