import { getCategorizedPosts } from "@/utils/category-api"
import CategorizedPosts from "./category/CategorizedPosts"

export default async function Home() {
  let posts = await getCategorizedPosts('')
  // console.log(posts)
  return <div>
    <CategorizedPosts posts={posts}/>
  </div>
}
