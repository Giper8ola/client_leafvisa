import {auth} from "@/utils/lib/auth";
import {NextRequest, NextResponse} from "next/server";
import {OrderStatusEnums} from "@/utils/types/enums";

export const config = {
    matcher: '/order_sp/:path*',
}

export async function middleware(request: NextRequest) {
    const id = await auth(request)
    let response: Response | null = await fetch(new URL(`/api/order_sp/${request.nextUrl.pathname.split('/').at(-1)}`, request.url))

    let data = await response.json()

    if("bad" in data)
        return NextResponse.rewrite(new URL(`/order_sp/not_found`, request.url))

    if(!id || id !== data.order_id) {
        if (data.status === OrderStatusEnums.AWAITING_DETAILS)
            return NextResponse.next()
        return NextResponse.rewrite(new URL(`/order_sp/${data.order_id}/auth`, request.url))
    }

    return NextResponse.next()
}