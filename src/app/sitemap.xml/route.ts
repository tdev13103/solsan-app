import { sitemapOptions } from "@/lib/sitemapOptions";

interface PostProps {
	slug: string,
	modified: string
}

const URL = process.env.NEXT_PUBLIC_WORDPRESS_APP_URL

function generateSiteMap( posts: PostProps[] ) {
	return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${ posts
		.map( ( post ) => {
			return `
            <url>
                <loc>${ `${ URL }/${ post.slug }` }</loc>
                <lastmod>${ `${ post.modified }` }</lastmod>
            </url>
          `;
		} )
		.join( "" ) }
    </urlset>
  `;
}

export async function GET() {
	const posts = await sitemapOptions();
	const body = generateSiteMap( posts );
	
	return new Response( body, {
		status  : 200,
		headers : {
			"Cache-control" : "public, s-maxage=86400, stale-while-revalidate",
			"content-type"  : "application/xml",
		},
	} );
}
