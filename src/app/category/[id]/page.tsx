import { getAllCategories, getCategorizedPosts } from "@/utils/category-api"
import CategorizedPosts from "../CategorizedPosts"

type params = {id:string}

export const dynamicParams = true;

export async function generateStaticParams() {
    let categories = await getAllCategories()
    return categories.map((category) => ({id:category}))
}

async function getCachedPage(params:params) {
    return await getCategorizedPosts(params.id)
}

async function Category({params}:{params:params}) {
  let result = await getCachedPage(params)
  return <div>
    <CategorizedPosts posts={result.posts} category="" next_cursor={result.next_cursor} />
  </div>
}

export default Category