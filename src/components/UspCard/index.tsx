'use client'

import React from 'react';
import styled from '@emotion/styled';
import Typography from "../UI/Typography";
import Svg from "@/components/Svg";
import theme from "@/styles/theme";

interface UspCardProps {
	data: {
		cart_icon: string
		cart_icons_type: string
		cart_subtitle: string
		cart_title: string
	}
}


const Wrapper = styled.div`
	padding: 0 0 0 ${ theme.spaces.large1 };
	position: relative;
	
	.usp-card {
		&__icon-wrap {
			position: absolute;
			left: 0;
			top: 0;
			border-radius: ${ theme.borderRadius.default };
			width: ${ theme.spaces.medium2 };
			height: ${ theme.spaces.medium2 };
			overflow: hidden;
			padding: ${ theme.spaces.mini };
			display: flex;
			align-items: center;
			justify-content: center;
			background: ${ theme.colors.colorOrange };
		}
		
		&__icon {
			width: 100%;
			height: auto;
		}
		
		&__title {
			color: ${ theme.colors.colorWhite };
			margin-bottom: calc(${ theme.spaces.mini } / 2);
		}
		
		&__subtitle {
			color: ${ theme.colors.colorWhite };
			margin-bottom: 0;
		}
	}
	
	&.dark {
		.usp-card__icon-wrap {
			background: ${ theme.colors.colorNavyDark };
		}
	}
`;


const UspCard = ( {
	data : {
		cart_icon,
		cart_icons_type,
		cart_title,
		cart_subtitle
	}
}: UspCardProps ) => {
	
	return (
		<Wrapper className={ `usp-card ${ cart_icons_type }` }>
			{
				cart_icon &&
        <div className={ 'usp-card__icon-wrap' }>
          <Svg className={ 'usp-card__icon' }
               svg={ cart_icon }/>
        </div>
			}
			{
				cart_title &&
        <Typography className={ 'usp-card__title' } variant={ 'subheader1' } type={ 'p' }>
					{ cart_title }
        </Typography>
			}
			{
				cart_subtitle &&
        <Typography className={ 'usp-card__subtitle' } variant={ 'body_1_large' } type={ 'p' }>
					{ cart_subtitle }
        </Typography>
			}
		</Wrapper>
	)
};

export default UspCard;