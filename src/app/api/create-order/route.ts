import {NextResponse} from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (
            !process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
            !process.env.NEXT_PUBLIC_CREATE_ORDER ||
            !process.env.CONSUMER_KEY || !process.env.CONSUMER_SECRET
        ) {
            return NextResponse.error();
        }

        const tokenEndpoint =
            process.env.NEXT_PUBLIC_WORDPRESS_API_URL +
            process.env.NEXT_PUBLIC_CREATE_ORDER;

        try {
            const response = await axios.post(tokenEndpoint, body, {
                auth: {
                    username: process.env.CONSUMER_KEY,
                    password: process.env.CONSUMER_SECRET,
                },
            });

            return NextResponse.json({
                success: true,
                orderData: response.data,
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
