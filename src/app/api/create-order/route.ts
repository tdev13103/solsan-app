import { NextResponse } from "next/server";

export async function POST( req: Request ) {
	try {
		const body = await req.json();
		
		// Ensure process.env.NEXT_PUBLIC_WORDPRESS_API_URL and process.env.NEXT_PUBLIC_CREATE_ORDER are defined
		if (
			!process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
			!process.env.NEXT_PUBLIC_CREATE_ORDER
		) {
			return NextResponse.error();
		}
		
		const tokenEndpoint =
			process.env.NEXT_PUBLIC_WORDPRESS_API_URL +
			process.env.NEXT_PUBLIC_CREATE_ORDER;
		
		// Ensure process.env.CONSUMER_KEY and process.env.CONSUMER_SECRET are defined
		if ( !process.env.CONSUMER_KEY || !process.env.CONSUMER_SECRET ) {
			return NextResponse.error();
		}
		
		const consumerKey = process.env.CONSUMER_KEY;
		const consumerSecret = process.env.CONSUMER_SECRET;
		const str = btoa( `${ consumerKey }:${ consumerSecret }` );
		
		// Base64 encode the request token and turn it into a value of the Authorization header
		const authHeader = `Basic ${ str }`;
		
		const option = {
			method  : 'POST',
			body    : JSON.stringify( body ),
			headers : {
				"Content-Type"  : "application/json",
				"Authorization" : authHeader
			},
		};
		
		let result = await fetch( tokenEndpoint, option );
		let result_data = await result.json();
		console.log('result_data', result_data);
		
		// Rest of the API logic
		return NextResponse.json( {
			success : true,
			data    : result_data
		} );
	}
	catch ( error ) {
		console.error( "An error occurred:", error );
		return NextResponse.error();
	}
}
