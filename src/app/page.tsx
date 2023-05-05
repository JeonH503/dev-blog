import { getCategorizedPosts } from "@/utils/category-api"
import CategorizedPosts from "./category/CategorizedPosts"

export default async function Home() {
  let result = await getCategorizedPosts()
  
  return <div>
    <CategorizedPosts posts={result.posts} category="" next_cursor={result.next_cursor} />
  </div>
}
