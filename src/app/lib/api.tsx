import pMemoize from "p-memoize";

const database_id = 'bab4339516874f58b9c7c3e542a791c9';
const token = 'secret_JtdV6RdpsJNiwIs871Lrzkya5Af0hFyXcDoIECGtT96';

interface Posts {
    results:Result[];
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




export const getAllPages = async () => {
    const response:any = await fetch(`https://api.notion.com/v1/databases/${database_id}/query`, //모든 데이터 가져오는 쿼리
        {
            method:"post",
            headers:{Authentication: `Bearer ${token}`}
        }
    )

    const posts:Posts = response.json()
    
    const mappings = posts.results.map((post) => ({
        created_time:post.properties.생성일.created_time,
        id:post.properties.ID.rich_text[0].plain_text,
        tag:post.properties.태그.multi_select,
        name:post.properties.이름.title[0].plain_text
    }))

    return mappings
}

const pageMapping = async (title:string, id:string | null) => { //staticPaths 에서 한번 실행되고 나면 id 필요 없음
    const response:any = await fetch(`https://api.notion.com/v1/blocks/${id}/children`, //block 데이터 가져오는 쿼리
        {
            headers:{Authentication: `Bearer ${token}`}
        }
    )

    return {
        title:title,
        blocks:response.results
    }
}

export const getPage = pMemoize(pageMapping);

export const cachingAllPages = async () => {
    const pages = await getAllPages();
    
    pages.forEach(page => pageMapping(page.name, page.id)); //페이지 전부 캐싱

    return pages
}