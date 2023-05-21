import { NextResponse } from 'next/server';
import { getCategorizedPosts } from '@/utils/category-api';

export async function GET(request: Request, context:any) {
    let querys = context.params.slug

    if(querys < 2)
        return NextResponse.json({});

    let category = querys[0];
    let next_cursor = querys[1];

    // let params = request.url.split('api?')
    // let query_strings = params.length === 2 ? params[1].split('&') : ''

    // if(query_strings === '' || query_strings.length < 2)
    //     return NextResponse.json({});

    // let category = query_strings[0].replace('category=','');
    // let next_cursor = query_strings[1].replace('next_cursor=','');
    let data;
    try {
        data = await getCategorizedPosts(category ? category : "",next_cursor)
    } catch {
        data = {
            posts:{},
            next_cursor:null,
        }
    }

    return NextResponse.json(data);
}   