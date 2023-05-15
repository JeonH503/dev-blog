'use client'

import Post from "@/app/post/Post";
import styled from "styled-components";
import { PostsMap } from "@/utils/category-api";
import { useCallback, useEffect,useState } from "react";

interface Props {
    posts:PostsMap,
    category:string,
    next_cursor:string|null
}

const CategoryTitle = styled.h2`
    text-align:center;
    margin-bottom:5px;
`

//next_cursor = 초기값 , _next_cursor 이후 업데이트 될 값
function CategorizedPosts({posts,category="",next_cursor=null}:Props) {
    const [_posts, setPosts] = useState(posts);
    const [_next_cursor, setNextCursor] = useState(next_cursor);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, offsetHeight } = document.documentElement
            if (window.innerHeight + scrollTop >= offsetHeight-50) {
                setLoading(true)
            }
        }

        if(next_cursor)
            window.addEventListener('scroll',handleScroll)
    },[next_cursor])

    const getNextPosts = useCallback(async () => {
        if(!_next_cursor) {
            setLoading(false);
            return;
        }
        let res = await fetch(`/api?category=${category}&next_cursor=${_next_cursor}`,{
            next: { revalidate:0}
        })
        let resData = await res.json()
        let posts:PostsMap = resData.data.posts
        
        setNextCursor(resData.data.next_cursor)
        setPosts({..._posts, ...posts})
        setLoading(false)
    },[_next_cursor,category,_posts])

    useEffect(() => {
        if(loading) {
            getNextPosts()
        }
    },[loading,getNextPosts])

    return <div>
        <CategoryTitle>{category === '' ? '' : '#'+decodeURIComponent(category)}</CategoryTitle>
        {Object.keys(_posts).map((key:string) => <Post key={key} title={_posts[key].name} created_time={_posts[key].created_time} tag={_posts[key].tag} id={_posts[key].id} cover={_posts[key].cover}></Post>)}
        {loading}
    </div>
}

export default CategorizedPosts