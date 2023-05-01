import Post from "@/app/post/Post";
import { PostsMap } from "@/utils/category-api";


function CategorizedPosts({posts}:{posts:PostsMap}) {
    return <div>
        {Object.keys(posts).map((key:string) => <Post key={key} title={posts[key].name} created_time={posts[key].created_time} tag={posts[key].tag} id={posts[key].id} cover={null}></Post>)}
    </div>
}

export default CategorizedPosts