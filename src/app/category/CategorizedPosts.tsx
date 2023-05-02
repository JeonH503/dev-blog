'use client'

import Post from "@/app/post/Post";
import { PostsMap } from "@/utils/category-api";
import { useEffect,useState } from "react";

function CategorizedPosts({posts}:{posts:PostsMap}) {
    const [_posts, setPosts] = useState(posts);

    // useEffect(() => {

    // },[])

    return <div>
        {Object.keys(_posts).map((key:string) => <Post key={key} title={posts[key].name} created_time={posts[key].created_time} tag={posts[key].tag} id={posts[key].id} cover={posts[key].cover}></Post>)}
    </div>
}

export default CategorizedPosts