import { NextResponse } from 'next/server';
import { getCategorizedPosts } from '@/utils/category-api';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const next_cursor = searchParams.get('next_cursor');
    let data;

    console.log("test")
    try {
        data = await getCategorizedPosts(category ? category : "",next_cursor)
    } catch {
        data = {
            posts:{},
            next_cursor:null,
        }
    }
    return NextResponse.json({ data });
}