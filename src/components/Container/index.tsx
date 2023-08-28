'use client'

import styled from '@emotion/styled';
import React, { FC } from 'react';
import theme from "@/styles/theme";

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}


const ContainerWrap = styled( 'div' )`
	width: 1330px;
	max-width: 100%;
	padding: 0;
	margin: 0 auto;
	position: relative;
	
	@media (max-width: 1370px) {
		width: 1230px;
	}
	
	@media (max-width: 1270px) {
		width: 1040px;
	}
	@media (max-width: 1200px) {
		width: 1000px;
	}
	
	@media (max-width: 1024px) {
		width: 800px;
	}
	
	@media (max-width: 920px) {
		width: 674px;
	}
	
	@media (max-width: 720px) {
		width: 100%;
		padding: 0 ${ theme.spaces.small };
	}
	
	&.сookies-wrapper__container {
		@media screen and (max-width: 850px) {
			margin: 0;
			padding: 0;
			width: 100vw;
		}
	}
`

const Container: FC<ContainerProps> = ( {
	children,
	className = ''
} ) => {
	return (
		<ContainerWrap className={ `container ${ className }` }>
			{ children }
		</ContainerWrap>
	);
};

export default Container;