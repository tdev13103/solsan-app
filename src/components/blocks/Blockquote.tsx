'use client'
import React, { FC } from 'react';
import Typography from "../UI/Typography";
import Image from "next/image";
import styled from "@emotion/styled";
import Container from "../Container";
import theme from "@/styles/theme";

interface BlockquoteProps {
	data: {
		blockquote_type: string;
		image: string;
		text: string;
		author: string;
	}
}

const b = 'blockquote'

const BlockquoteWrapper = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	overflow: hidden;
	padding-bottom: ${ theme.spaces.large2 };
	padding-top: ${ theme.spaces.large2 };
	
	@media screen and (max-width: 768px) {
		padding-bottom: ${ theme.spaces.medium2 };
		padding-top: ${ theme.spaces.medium2 };
	}
	
	.blockquote {
		max-width: 910px;
		margin: 0 auto;
		
		&.referensers {
			margin: 0 0 0 20px;
		}
		
		&__image {
			flex-shrink: 0;
		}
		
		&__text {
			margin-bottom: ${ theme.spaces.small };
			text-align: center;
			
			&-referensers {
				text-align: left;
				margin-bottom: ${ theme.spaces.small };
			}
		}
		
		&__author {
			font-weight: 700;
			text-align: center;
			
			&-referensers {
				text-align: left;
			}
		}
		
	}

`

const Blockquote: FC<BlockquoteProps> = ( {
	data : {
		blockquote_type,
		image,
		text,
		author,
	}
} ) => {
	
	return (
		<BlockquoteWrapper>
			{ blockquote_type === 'default' &&
        <Container>
          <div className={ `${ b }__image` }>
						{
							image &&
              <Image src={ image }
                     alt="author image"
                     width={ 68 }
                     height={ 68 }
              />
						}
          </div>
          <div className={ `${ b }` }>
            <Typography variant={ 'h3' } className={ `${ b }__text` }
                        dangerouslySetInnerHTML={ { __html : text } }
            />
            <Typography className={ `${ b }__author` }
                        dangerouslySetInnerHTML={ { __html : author } }
            />
          </div>
        </Container>
			}
			
			{ blockquote_type === 'referensers' &&
        <>
          <div className={ `${ b }__image` }>
						{
							image &&
              <Image src={ image }
                     alt="author image"
                     width={ 68 }
                     height={ 68 }
              />
						}
          </div>
          <div className={ `${ b } referensers` }>
            <Typography className={ `${ b }__text-referensers` }
                        dangerouslySetInnerHTML={ { __html : text } }
            />
            <Typography className={ `${ b }__author-referensers` }
                        dangerouslySetInnerHTML={ { __html : author } }
            />
          </div>
        </>
			}
		
		
		</BlockquoteWrapper>
	);
};

export default Blockquote;