import {NextRequest} from "next/server";
import * as jose from 'jose'

const jwtConfig = {
    secret: new TextEncoder().encode("SOOOO_SECRET_KEY"),
}

export async function auth(request: NextRequest) {
    const auth = request.cookies.get("auth")!;

    if(!auth?.value)
        return null

    const decoded = await jose.jwtVerify(auth.value.split(" ")[1], jwtConfig.secret);
    return decoded.payload.id;
}