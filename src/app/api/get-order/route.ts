import {NextResponse} from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const orderId = await req.json();

        if (
            !process.env.KLARNA_API_ORDER_URL ||
            !process.env.KLARNA_API_USERNAME ||
            !process.env.KLARNA_API_PASSWORD
        ) {
            return NextResponse.error();
        }

        const tokenEndpoint = `${process.env.KLARNA_API_ORDER_URL}/${orderId}`;

        try {
            const response = await axios.get(tokenEndpoint, {
                headers: {
                    'Klarna-Integrator': 'string'
                },
                auth: {
                    username: process.env.KLARNA_API_USERNAME,
                    password: process.env.KLARNA_API_PASSWORD,
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
