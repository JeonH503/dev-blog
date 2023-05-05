'use client'

import Post from "@/app/post/Post";
import { PostsMap } from "@/utils/category-api";
import { useEffect,useState } from "react";

interface Props {
    posts:PostsMap,
    category:string,
    next_cursor:string|null
}

function CategorizedPosts({posts,category="",next_cursor=null}:Props) {
    const [_posts, setPosts] = useState(posts);

    // useEffect(() => {
    //     getNextPosts();
    // },[])

    const getNextPosts = async () => {
        let res = await fetch(`/api?category=${category}&next_cursor=${next_cursor}`)
        let resData = await res.json()
        let posts:PostsMap = resData.data.posts
        setPosts({..._posts, ...posts})
    }

    return <div>
        {Object.keys(_posts).map((key:string) => <Post key={key} title={_posts[key].name} created_time={_posts[key].created_time} tag={_posts[key].tag} id={_posts[key].id} cover={_posts[key].cover}></Post>)}
    </div>
}

export default CategorizedPosts