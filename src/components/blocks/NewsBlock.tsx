'use client'

import React, { useState } from 'react';
import styled from '@emotion/styled';
import Container from '../Container';
import Typography from '../UI/Typography';
import Button from '@/components/Button';
import LatestPosts from '../Posts/LatestPosts';
import CustomClassic from './CustomClassic';
import theme from "@/styles/theme";
import { useThemeContext } from "@/context/theme.context";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "@/data/posts";

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

interface NewsBlockProps {
	data: {
		amount_of_post_to_display: string;
		button_link_text: string;
		button_link_url: {
			title: string; url: string;
		}
		description: string;
		grid_type: "grid-1-2" | "grid-fullwidth" | "grid-4" | "grid-3" | "grid-2" | "grid-2-1" | undefined;
		link_button_type: string;
		title: string;
	}
	posts: Posts
}

const Wrapper = styled.div`
	padding: ${ theme.spaces.medium2 } 0 ${ theme.spaces.large21 };
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
		padding: ${ theme.spaces.normal } 0;
	}
	
	.news-block {
		&__header {
			margin-bottom: ${ theme.spaces.small };
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		
		&__description-wrapper {
			margin-bottom: ${ theme.spaces.medium3 };
		}
		
		&__block-title {
			margin-bottom: 0;
		}
		
		&__btn {
			font-size: 18px;
			text-decoration: underline;
			
			&:hover {
				color: ${ theme.colors.colorOrange };
			}
		}
	}
`;

const NewsBlock: React.FC<NewsBlockProps> = ( {
	data : {
		amount_of_post_to_display,
		button_link_text,
		button_link_url,
		description,
		grid_type,
		link_button_type,
		title,
	},
	posts
} ) => {
	const { isMobile } = useThemeContext();
	const gridType = isMobile ? 'grid-2' : grid_type;
	
	const [postData, setPostData] = useState<Posts>( posts )
	
	const { fetchMore } = useQuery( QUERY_POSTS, {
		variables : {
			first : 9,
			after : null
		},
	} );
	
	return (
		<Wrapper className={ 'news-block' }>
			<Container>
				<div className={ 'news-block__header' }>
					{
						title &&
            <Typography className={ 'news-block__block-title' }
                        variant={ 'subheader1' } type={ 'p' }>
							{ title }
            </Typography>
					}
					{
						button_link_url && button_link_text &&
            <Button type={ link_button_type }
                    className={ 'news-block__btn' }
                    title={ button_link_text }
                    isHyperlink={ true }
                    hrefLink={ button_link_url?.url }
            />
					}
				</div>
				{
					description &&
          <div className="news-block__description-wrapper">
            <CustomClassic data={ { custom_classic : description } } className={ 'news-block__description' }/>
          </div>
				}
			</Container>
			
			<LatestPosts posts={ postData }
			             postToDisplay={ amount_of_post_to_display }
			             gridType={ gridType }
			             setPostData={ setPostData }
			             fetchMore={ fetchMore }
			/>
		</Wrapper>
	);
};

export default NewsBlock;