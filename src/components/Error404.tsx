'use client'

import React from 'react';
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Container from "./Container";
import Typography from "./UI/Typography";
import Button from "@/components/Button";
import theme from "@/styles/theme";

const cs = 'error-message';

const Wrapper = styled.div`
	background-color: #23154A;
	min-height: calc(100vh - 200px);
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: ${ theme.spaces.large15 };
	
	.error-message {
		&__error-404-wrapper {
			text-align: center;
			width: 100%;
		}
		
		&__error-404 {
			color: ${ theme.colors.colorSkyLight };
			font-size: 70px;
			margin-bottom: ${ theme.spaces.medium3 };
		}
	}
	
	@media screen and (max-width: 850px) {
		min-height: calc(100vh - 92px);
	}

`;


const Error404 = () => {
	const router = useRouter();
	
	return (
		<Wrapper className={ `${ cs }` }>
			<Container>
				<div className={ `${ cs }__error-404-wrapper` }>
					<Typography variant={ 'h1' } className={ `${ cs }__error-404` }>
						404
					</Typography>
					<Button className={ `${ cs }__error-btn` }
					        type={ 'button_1' }
					        title={ "Tillbaka Hem" }
					        onClick={ () => router.back() }
					/>
				</div>
			</Container>
		</Wrapper>
	);
}

export default Error404;