const database_id = 'bab4339516874f58b9c7c3e542a791c9';
const token = 'secret_JtdV6RdpsJNiwIs871Lrzkya5Af0hFyXcDoIECGtT96';

import { FileExternal,File } from "./block-types";

interface Posts {
    results:Result[];
    next_cursor: string | null,
    has_more: boolean,
}

interface Result {
    object: string,
    id: string,
    created_time: string,
    last_edited_time: string,
    created_by: {
        object: string,
        id: string
    },
    last_edited_by: {
        object: string,
        id: string
    },
    cover: FileExternal|File|null;
    icon: null | string,
    parent: {
        type: string,
        database_id: string
    },
    archived: false,
    properties: {
        생성일: {
            id: string,
            type: string,
            created_time: string
        },
        ID: {
            id: string,
            type: string,
            rich_text: [
                {
                    type: string,
                    text: {
                        content: string,
                        link: null
                    },
                    annotations: {
                        bold: boolean,
                        italic: boolean,
                        strikethrough: boolean,
                        underline: boolean,
                        code: boolean,
                        color: string
                    },
                    plain_text: string,
                    href: null
                }
            ]
        },
        태그: {
            id: string,
            type: string,
            multi_select: [
                {
                    id: string,
                    name: string,
                    color: string
                }
            ]
        },
        이름: {
            id: string,
            type: string,
            title: [
                {
                    type: string,
                    text: {
                        content: string,
                        link: null
                    },
                    annotations: {
                        bold: boolean,
                        italic: boolean,
                        strikethrough: boolean,
                        underline: boolean,
                        code: boolean,
                        color: string
                    },
                    plain_text: string,
                    href: null
                }
            ]
        },
        설명: {
            id: string,
            type: string,
            rich_text: [
                {
                    type: string,
                    text: {
                        content: string,
                        link: null
                    },
                    annotations: {
                        bold: boolean,
                        italic: boolean,
                        strikethrough: boolean,
                        underline: boolean,
                        code: boolean,
                        color: string
                    },
                    plain_text: string,
                    href: null
                }
            ]
        },
    },
    url: string
}

interface PostsMap {
    [key:string]:{
        created_time:string;
        id:string;
        tag:string;
        name:string;
    }
}

const nextPages = async (next_cursor:string|null) => {
    const response:any = await fetch(`https://api.notion.com/v1/databases/${database_id}/query`, //모든 데이터 가져오는 쿼리
        {
            method:"post",
            headers:{
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
                'Notion-Version' : '2022-02-22'
            },
            body:next_cursor ? JSON.stringify({start_cursor:next_cursor}) : JSON.stringify({}) //커서가 없으면 빈 객체로 전송
        }
    )

    let posts:Posts = await response.json()
    let post_results:Result[] = posts.has_more ? posts.results.concat(await nextPages(posts.next_cursor)) : posts.results;

    return post_results;
}

export const getAllPages = async () => {
    let posts:Result[] = await nextPages(null)
    let mappings = {} as PostsMap

    posts.forEach((post) => {
        mappings[post.properties.이름.title[0].plain_text.replaceAll(" ",'-')] = {
            created_time:post.properties.생성일.created_time,
            id:post.properties.ID.rich_text[0].plain_text,
            tag:post.properties.태그.multi_select[0].name,
            name:post.properties.이름.title[0].plain_text
        }   
    })
    
    return mappings
}

export const getPage = async (id:string) => { //staticPaths 에서 한번 실행되고 나면 id 필요 없음
    const decodedId = decodeURIComponent(id)
    let post_info = await searchPost(decodedId)
    
    if(post_info === null)
        return null;

    const response:any = await fetch(`https://api.notion.com/v1/blocks/${post_info.id}/children`, //block 데이터 가져오는 쿼리
        {
            headers:{
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
                'Notion-Version' : '2022-02-22'
            }
        }
    )

    return {
        info:post_info,
        block:await response.json()
    }
}

export const searchPost = async (title:string) => {
    const response:any = await fetch(`https://api.notion.com/v1/databases/${database_id}/query`, //block 데이터 가져오는 쿼리
        {
            method:"post",
            headers:{
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
                'Notion-Version' : '2022-02-22' 
            },
            body:JSON.stringify({
                filter:{
                    property:"이름",
                    rich_text: {
                        equals: title
                    }
                }
            })
        }
    )
    
    const post:Posts = await response.json()
    if(post.results.length === 1){
        let cover = null;
        if(post.results[0].cover) {
            if(post.results[0].cover.type === 'external') {
                cover = post.results[0].cover.external.url
            } else if(post.results[0].cover.type === 'file') {
                cover = post.results[0].cover.file.url
            }
        }

        return {
            id:post.results[0].properties.ID.rich_text[0].plain_text,
            title:post.results[0].properties.이름.title[0].plain_text,
            desc:post.results[0].properties.설명.rich_text[0].plain_text,
            created_time:post.results[0].properties.생성일.created_time,
            cover
        }
    }
    return null;
}