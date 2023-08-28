'use client'

import React, { useState } from 'react';
import styled from '@emotion/styled';
import Container from "../Container";
import GridSystem from "../UI/Grid/GridSystem";
import Image from "next/image";
import Typography from "../UI/Typography";
import Link from 'next/link';
import theme from "@/styles/theme";
import { convertDate } from "@/helpers";
import Button from "@/components/Button";
import { usePathname } from "next/navigation";

interface Post {
	author: {
		node: {
			name: string;
		};
	};
	date: string;
	excerpt: string;
	featuredImage: {
		node: {
			sourceUrl: string;
			title: string;
		};
	};
	modified: string;
	postId: number;
	slug: string;
	title: string;
}

interface Posts {
	nodes: Post[]
	pageInfo: {
		endCursor: string;
		hasNextPage: boolean
	}
}

interface LatestPostsProps {
	posts: Posts
	gridType: "grid-1-2" | "grid-fullwidth" | "grid-4" | "grid-3" | "grid-2" | "grid-2-1" | undefined;
	postToDisplay: string;
	fetchMore: any;
	setPostData: React.Dispatch<React.SetStateAction<Posts>>;
}

const Wrapper = styled.div`
	
	.latest-posts {
		&__load-more-wrapper {
			padding-top: ${ theme.spaces.medium3 };
			text-align: center;
		}
		
		&__load-more-btn {
			
		}
	}
	
	
	.news-block {
		&__header {
			margin-bottom: ${ theme.spaces.small };
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		
		&__grid-wrapper {
			grid-column-gap: 32px;
			grid-row-gap: 32px;
			
			@media (max-width: 414px) {
				grid-column-gap: ${ theme.spaces.gridGap };
				grid-row-gap: ${ theme.spaces.gridGap };
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}
		
		&__image-wrap {
			margin: 0 0 ${ theme.spaces.mini };
			height: 270px;
			
			img {
				border-radius: 12px;
				object-fit: cover;
			}
		}
		
		&__description {
			color: ${ theme.colors.colorGrey };
		}
		
		&__area {
			position: relative;
		}
		
		&__cover-link {
			position: absolute;
			width: 100%;
			height: 100%;
			display: block;
			z-index: 20;
			top: 0;
			left: 0;
			text-decoration: none;
		}
	}
`;


const LatestPosts: React.FC<LatestPostsProps> = ( {
	posts,
	gridType,
	postToDisplay,
	fetchMore,
	setPostData
} ) => {
	
	const pathname = usePathname();
	const isLoadMoreBtn = Boolean( posts?.pageInfo?.hasNextPage );
	
	const [isLoading, setLoading] = useState( false );
	const [isLoadMorePosts, setIsLoadMorePosts] = useState( false );
	
	let displayedPosts = posts?.nodes;
	if ( postToDisplay && !isLoadMorePosts ) {
		const numberOfPostsToDisplay = parseInt( postToDisplay, 10 );
		displayedPosts = posts?.nodes?.slice( 0, numberOfPostsToDisplay );
	}
	
	return (
		<Wrapper className={ 'latest-posts' }>
			<Container>
				<GridSystem variant={ gridType || 'grid-1-2' } className={ 'news-block__grid-wrapper' }>
					{
						displayedPosts?.map( ( post, idx ) => {
							return (
								<div key={ idx } className="news-block__area">
									<figure className={ 'news-block__image-wrap' }>
										{
											post?.featuredImage?.node?.sourceUrl &&
                      <Image src={ post?.featuredImage?.node?.sourceUrl }
                             width="0"
                             height="0"
                             alt={ 'Post Image' }
                             sizes="100vw"
                             style={ {
												       width     : '100%',
												       maxWidth  : '100%',
												       maxHeight : '100%',
												       height    : '100%',
											       } }
                             quality={ 80 }
                      />
										}
									</figure>
									{
										post?.title &&
                    <Typography className={ 'news-block__title' }
                                variant={ 'subheader1' }
                                type={ 'p' }
                                dangerouslySetInnerHTML={ { __html : post?.title } }
                    />
									}
									{
										post?.date &&
                    <Typography className={ 'news-block__description' } variant={ 'body_1_large' }>
											{ convertDate( post?.date ) }
                    </Typography>
									}
									{
										post?.slug &&
                    <Link href={ `/nyheter/${ post?.slug }` } className={ 'news-block__cover-link' }/>
									}
								</div>
							);
						} )
					}
				</GridSystem>
				{
					isLoadMoreBtn && pathname !== '/' &&
          <div className={ 'latest-posts__load-more-wrapper' }>
            <Button className={ `latest-posts__load-more-btn ${ isLoading ? 'loading' : '' }` }
                    onClick={ async () => {
	                    setLoading( true );
							        const response = await fetchMore( { variables : { after : posts?.pageInfo?.endCursor } } );
	                    setLoading( response?.loading );
							        setIsLoadMorePosts( true )
							        await setPostData( prev => {
								        return {
									        nodes    : [
										        ...prev?.nodes,
										        ...response?.data?.posts?.nodes
									        ],
									        pageInfo : {
										        ...response?.data?.posts?.pageInfo
									        }
								        };
							        } );
						        } }
                    type={ 'button_2' }
                    title={ 'Ladda mer' }
                    isHyperlink={ false }/>
          </div>
				}
			</Container>
		</Wrapper>
	);
};

export default LatestPosts;