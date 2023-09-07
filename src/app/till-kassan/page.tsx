import React from 'react';
import ProductCheckout from "@/components/ProductCheckout";
import {pageSettings} from "@/lib/pageSettings";
import Error404 from "@/components/Error404";
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    const data = await pageSettings('till-kassan');
    if (data !== null) {
        const {seo}: any = data;

        return {
            title: seo?.opengraphTitle,
            openGraph: {
                title: seo?.opengraphTitle,
                description: seo?.opengraphDescription,
            },
        }
    }
    return {}
}

const TillKassanPage = async () => {
    const data = await pageSettings('till-kassan');

    if (data !== null) {
        const {seo}: any = data;

        return (
            <div>
                {
                    seo?.schema?.raw &&
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{__html: JSON.stringify(seo?.schema?.raw)}}
					/>
                }
                <ProductCheckout data={data}/>
            </div>

        );
    }
    return <Error404/>
};

export default TillKassanPage;