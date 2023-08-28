'use client'

import React, { useState } from 'react';
import styled from "@emotion/styled";
import Container from "../Container";
import CustomClassic from "./CustomClassic";
import Button from "@/components/Button";
import Typography from "../UI/Typography";
import { generateKey } from "@/helpers";
import theme from "@/styles/theme";

interface AccordionItem {
	content: string;
	title: string;
	isExpanded?: boolean; // Optional, because we're adding this in the state later.
}

interface ButtonURL {
	title: string;
	url: string;
}

interface AccordionSectionProps {
	data: {
		accordion_sections: AccordionItem[];
		accordion_title: string;
		button_title: string;
		button_type: string;
		button_url: ButtonURL;
	};
}

const Wrapper = styled( 'div' )`
	padding: ${ theme.spaces.large1 } 0;
	
	.accordion {
		@media screen and (max-width: 768px) {
			padding: 0 ${ theme.spaces.normal };
		}
		
		&__title {
			margin-bottom: ${ theme.spaces.normal };
		}
		
		&__card {
			margin-top: -1px;
			margin-bottom: ${ theme.spaces.mini };
			border-bottom: 1px solid rgba(143, 138, 166, .5);
			
			&:last-of-type {
				margin-bottom: 0;
			}
		}
		
		&__button {
			display: flex;
			align-items: center;
			border: none;
			cursor: pointer;
			width: 100%;
			text-align: left;
			padding: ${ theme.spaces.small } ${ theme.spaces.mini };
			position: relative;
			border-radius: 0;
			font-weight: 700;
			font-size: 18px;
			line-height: 1.28;
			background-color: ${ theme.colors.colorWhite };
			
			&:after {
				content: '';
				display: block;
				position: absolute;
				top: 50%;
				transition: transform 0.5s ease-out;
				transform: translateY(-50%);
				right: 8px;
				width: 24px;
				height: 24px;
				background-repeat: no-repeat;
				background-position: center center;
				background-size: cover;
				background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOSAyMkgxNUMyMCAyMiAyMiAyMCAyMiAxNVY5QzIyIDQgMjAgMiAxNSAySDlDNCAyIDIgNCAyIDlWMTVDMiAyMCA0IDIyIDkgMjJaIiBzdHJva2U9IiMyMjE1NTEiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNOC40Njk5NyAxMC42NDA2TDEyIDE0LjE2MDZMMTUuNTMgMTAuNjQwNiIgc3Ryb2tlPSIjMjIxNTUxIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+);
			}
			
			&.show {
				border-bottom: none;
				
				&:after {
					background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTUgMkw5IDJDNCAyIDIgNCAyIDlMMiAxNUMyIDIwIDQgMjIgOSAyMkwxNSAyMkMyMCAyMiAyMiAyMCAyMiAxNUwyMiA5QzIyIDQgMjAgMiAxNSAyWiIgc3Ryb2tlPSIjMjIxNTUxIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTE1LjUzIDEzLjM1OTRMMTIgOS44MzkzOEw4LjQ3MDAzIDEzLjM1OTQiIHN0cm9rZT0iIzIyMTU1MSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==);
				}
			}
		}
		
		&__collapse-description {
			max-height: 0;
			overflow: hidden;
			transition: max-height 0.3s ease-in-out;
			
			&.show {
				max-height: 2000px;
			}
		}
		
		&__btn-wrapper {
			padding-top: ${ theme.spaces.normal }
		}
	}
	
	.custom-classic-block {
		padding: 0 ${ theme.spaces.mini } ${ theme.spaces.small };
		
		&__wysiwyg-content {
			p {
				${ theme.body_1_large };
				color: ${ theme.colors.colorNavyLight };
				
				&:last-of-type {
					margin-bottom: 0;
				}
			}
		}
	}
`;


const AccordionSection: React.FC<AccordionSectionProps> = ( {
	data : {
		accordion_sections,
		accordion_title,
		button_title,
		button_type,
		button_url,
	},
} ) => {
	const [expandedItems, setExpandedItems] = useState<AccordionItem[]>(
		accordion_sections.map( item => ({
			...item,
			isExpanded : false
		}) )
	);
	const handleClick = ( index: number ) => {
		const updatedItems = expandedItems.map( ( item, idx ) => ({
			...item,
			// Only the clicked item's `isExpanded` is toggled. Others are set to false.
			isExpanded : idx === index ? !item.isExpanded : false
		}) );
		setExpandedItems( updatedItems );
	};
	
	return (
		<Wrapper className="accordion">
			<Container>
				{
					accordion_title &&
          <Typography type={ 'h2' } variant={ 'h4' } className={ 'accordion__title' }>
						{ accordion_title }
          </Typography>
				}
				{
					accordion_sections?.map( ( item, index ) => {
						return (
							<div className="accordion__card" key={ generateKey( index ) }>
								<Button onClick={ () => handleClick( index ) }
								        title={ item?.title }
								        type={ 'accordion' }
								        className={ `accordion__button ${ (expandedItems[index]?.isExpanded) ? 'show' : '' }` }
								/>
								<div
									className={ `accordion__collapse-description ${ expandedItems[index]?.isExpanded ? 'show' : '' }` }>
									<CustomClassic data={ { custom_classic : item.content } }/>
								</div>
							</div>
						)
					} )
				}
				{
					button_url && button_title &&
          <div className="accordion__btn-wrapper">
            
            <Button type={ button_type }
                    title={ button_title }
                    isHyperlink={ true }
                    hrefLink={ button_url?.url }
                    className={ 'accordion__btn' }
            />
          </div>
				}
			</Container>
		</Wrapper>
	);
};

export default AccordionSection;