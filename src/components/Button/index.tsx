'use client'

import styled from '@emotion/styled';
import React from "react";
import Link from "next/link";
import theme from "@/styles/theme";

interface ButtonProps {
	title: string;
	type?: string;
	className?: string;
	isHyperlink?: boolean;
	hrefLink?: string;
	
	[key: string]: any;
}

const Btn = styled.button`
	text-decoration: none;
	
	&.btn-button_2 {
		${ theme.buttons.button_2 }
	}
	
	&.btn-button_3 {
		${ theme.buttons.button_3 }
	}
	
	&.btn-button_4 {
		${ theme.buttons.button_4 }
	}
	
	&.btn-button_5 {
		${ theme.buttons.button_5 }
	}
	
	&.btn-button_1 {
		${ theme.buttons.button_1 }
	}
	
	&.loading {
		background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAzOCAzOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2U9IiNmZmYiPiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlLXdpZHRoPSIyIj4gICAgICAgICAgICA8Y2lyY2xlIHN0cm9rZS1vcGFjaXR5PSIuNSIgY3g9IjE4IiBjeT0iMTgiIHI9IjE4Ii8+ICAgICAgICAgICAgPHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4Ij4gICAgICAgICAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgICAgICAgICAgICAgICAgICAgIHR5cGU9InJvdGF0ZSIgICAgICAgICAgICAgICAgICAgIGZyb209IjAgMTggMTgiICAgICAgICAgICAgICAgICAgICB0bz0iMzYwIDE4IDE4IiAgICAgICAgICAgICAgICAgICAgZHVyPSIxcyIgICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+ICAgICAgICAgICAgPC9wYXRoPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+);
		background-size: auto 80%;
		color: transparent;
		pointer-events: none;
		background-repeat: no-repeat;
		background-position: center center;
	}
	
	&.disabled {
		pointer-events: none;
		opacity: 0.6;
	}
	
	&.btn-link-type_1 {
		${ theme.links.type_1 }
	}
	
	&.btn-link-type_2 {
		${ theme.links.type_2 }
	}
	
	&.btn-link-hyperPrimary {
		${ theme.links.hyperPrimary }
	}
	
	&.btn-link-hyperSecondary {
		${ theme.links.hyperSecondary }
	}
`;

const HyperLink = Btn.withComponent( Link );

const Button: React.FC<ButtonProps> = ( {
	title,
	type = 'button_1',
	className = '',
	isHyperlink = false,
	hrefLink = '',
	...rest
} ) => {
	
	return (
		<>
			{
				isHyperlink &&
        <HyperLink className={ `btn btn-${ type } ${ className }` } { ...rest } href={ hrefLink }>
					{ title }
        </HyperLink>
			}
			{
				!isHyperlink &&
        <Btn className={ `btn btn-${ type } ${ className }` } { ...rest }>
					{ title }
        </Btn>
			}
		</>
	);
};

export default Button;