import {NextResponse} from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const authorizationToken = body?.authorization_token

        if (
            !process.env.KLARNA_API_URL_DEV ||
            !process.env.KLARNA_API_USERNAME_DEV ||
            !process.env.KLARNA_API_PASSWORD_DEV
        ) {
            return NextResponse.error();
        }

        const tokenEndpoint = `${process.env.KLARNA_API_URL_DEV}/authorizations/${authorizationToken}/order`;

        try {
            const response = await axios.post(tokenEndpoint, body?.body, {
                auth: {
                    username: process.env.KLARNA_API_USERNAME_DEV,
                    password: process.env.KLARNA_API_PASSWORD_DEV,
                },
            });

            return NextResponse.json({
                success: true,
                data: response.data,
            });
        } catch (error) {
            console.error('An error occurred:', error);
            return NextResponse.error();
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.error();
    }
}
