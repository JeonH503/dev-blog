const database_id = 'bab4339516874f58b9c7c3e542a791c9';
const token = 'secret_JtdV6RdpsJNiwIs871Lrzkya5Af0hFyXcDoIECGtT96';

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
    cover: null | string,
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
        }
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

// 새 빌드시 포스트 100개가 넘으면??
export const getAllPages = async (next_cursor?:string) => {
    const response:any = await fetch(`https://api.notion.com/v1/databases/${database_id}/query`, //모든 데이터 가져오는 쿼리
        {
            method:"post",
            headers:{
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
                'Notion-Version' : '2022-02-22'
            },
            body:JSON.stringify({next_cursor})
        }
    )

    const posts:Posts = await response.json()
    let mappings = {} as PostsMap

    posts.results.forEach((post) => {
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
    let post_id = await searchPost(decodedId)
    
    if(post_id === null)
        return null;

    const response:any = await fetch(`https://api.notion.com/v1/blocks/${post_id}/children`, //block 데이터 가져오는 쿼리
        {
            headers:{
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
                'Notion-Version' : '2022-02-22'
            },
            next:{
                revalidate:300
            }
        }
    )

    return await response.json()
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
    
    if(post.results.length === 1)
        return post.results[0].properties.ID.rich_text[0].plain_text
    return null;
}