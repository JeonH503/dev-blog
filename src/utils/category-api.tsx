const database_id = 'bab4339516874f58b9c7c3e542a791c9';
const categories_id = 'b3cd5b5181ad464081f73f7d7772504d';
const token = 'secret_JtdV6RdpsJNiwIs871Lrzkya5Af0hFyXcDoIECGtT96';

import { FileExternal,File } from "./block-types";

interface Posts {
    results:Result[];
    next_cursor: string | null,
    has_more: boolean,
}

interface Result {
    object: string;
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: {
        object: string;
        id: string
    };
    last_edited_by: {
        object: string;
        id: string
    };
    cover: FileExternal|File|null;
    icon: null | string;
    parent: {
        type: string;
        database_id: string
    };
    archived: false;
    properties: {
        생성일: {
            id: string;
            type: string;
            created_time: string
        };
        ID: {
            id: string;
            type: string;
            rich_text: [
                {
                    type: string;
                    text: {
                        content: string;
                        link: null
                    };
                    annotations: {
                        bold: boolean;
                        italic: boolean;
                        strikethrough: boolean;
                        underline: boolean;
                        code: boolean;
                        color: string
                    };
                    plain_text: string;
                    href: null
                }
            ]
        };
        태그: {
            id: string;
            type: string;
            multi_select: [
                {
                    id: string;
                    name: string;
                    color: string
                }
            ]
        };
        이름: {
            id: string;
            type: string;
            title: [
                {
                    type: string;
                    text: {
                        content: string;
                        link: null
                    };
                    annotations: {
                        bold: boolean;
                        italic: boolean;
                        strikethrough: boolean;
                        underline: boolean;
                        code: boolean;
                        color: string
                    };
                    plain_text: string;
                    href: null;
                }
            ];
        };
    },
    url: string
}

export interface PostsMap {
    [key:string]:{
        created_time:string;
        id:string;
        tag:string;
        name:string;
        cover:string;
    }
}

interface Categories {
    results:Category[];
}

interface Category {
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
    has_children: true,
    archived: false,
    type: string,
    child_page: {
        title: string
    }
}


export const getAllCategories = async () => {
    const response:any = await fetch(`https://api.notion.com/v1/blocks/${categories_id}/children`,{
        method:"get",
        headers:{
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json',
            'Notion-Version' : '2022-02-22'
        },
    })
    
    const categories:Categories = await response.json()

    return categories.results.map((category:Category) => category.child_page?.title)
}

// export const getNextCategorizedPosts = async (category:string,) => {

// }

export const getCategorizedPosts = async (category:string = '',next_cursor:null|string = null) => {
    let body = next_cursor ? {
        "filter": {
          "property": "태그",
          "multi_select": {
            "contains": category
          }
        },
        "page_size":20,
        "start_cursor":next_cursor
    } : 
    {
        "filter": {
          "property": "태그",
          "multi_select": {
            "contains": category
          }
        },
        "page_size":20,
    }

    const response:any = await fetch(`https://api.notion.com/v1/databases/${database_id}/query`,{
        method:"post",
        headers:{
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json',
            'Notion-Version' : '2022-02-22'
        },
        body:JSON.stringify(body),
        next: { revalidate:300}
    })

    const posts:Posts = await response.json()

    let mappings = {} as PostsMap
    posts.results.forEach((post) => {
        mappings[post.properties.이름.title[0].plain_text.replaceAll(" ",'-')] = {
            created_time:post.properties.생성일.created_time,
            id:post.properties.ID.rich_text[0].plain_text,
            tag:post.properties.태그.multi_select[0].name,
            name:post.properties.이름.title[0].plain_text,
            cover:post.cover === null ? '' :
            post.cover.type==='file' ? post.cover.file.url : post.cover.external.url
        }
    })
    
    return {
        posts:mappings,
        next_cursor:posts.next_cursor
    } as {posts:PostsMap; next_cursor:string|null}
}