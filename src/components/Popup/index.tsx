'use client'

import React, { ReactNode } from "react";
import styled from '@emotion/styled';
import theme from "@/styles/theme";
import { setPopupState } from "@/redux/features/popupActions";
import { useAppDispatch } from "@/redux/hooks";

interface PopupProps {
	open?: boolean;
	setOpenPopup: ( state: boolean ) => void;
	children?: ReactNode;
	customClass?: string;
}

const PopupWrap = styled( 'div' )`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 40000;
	display: block;
	opacity: 0;
	left: 100vw;
	transition: opacity 0.5s;
	overflow-y: scroll;
	
	.popup-btn-back {
		position: absolute;
		top: 16px;
		left: 16px;
		width: 32px;
		height: 32px;
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		background: #FFFFFF;
		box-shadow: 0 8px 16px -8px rgba(15, 15, 15, 0.1);
		transition: transform 0.3s ease;
		border: 2px solid #E6E8EC;
		border-radius: 40px;
		cursor: pointer;
		
		&:hover {
			background: #F7F7FA;
		}
	}
	
	.popup-inner {
		margin: 80px auto;
	}
	
	&.active {
		left: 0;
		opacity: 1;
	}
	
	&.general-popup {
		overflow-y: scroll;
	}
	
	&.offer-form-popup {
		
		.popup-inner {
			max-width: 730px;
			width: 100%;
			padding: ${ theme.spaces.medium3 };
			max-height: unset;
			
			@media screen and (max-width: 850px) {
				max-width: 630px;
			}
			
			@media screen and (max-width: 670px) {
				max-width: 525px;
				padding: ${ theme.spaces.medium1 };
			}
			
			@media screen and (max-width: 480px) {
				padding: ${ theme.spaces.small };
				min-width: unset;
			}
		}
		
		
		.close-popup {
			
			@media screen and (max-width: 480px) {
				top: 15px;
				right: 15px;
			}
		}
	}
	
	&.thanks-offer-popup {
		.popup-inner {
			max-width: 730px;
			width: 100%;
			padding: ${ theme.spaces.medium3 };
			max-height: unset;
			
			@media screen and (max-width: 850px) {
				max-width: 530px;
			}
			
			@media screen and (max-width: 670px) {
				max-width: 430px;
				padding: ${ theme.spaces.medium1 };
			}
			
			@media screen and (max-width: 480px) {
				padding: ${ theme.spaces.small };
				min-width: unset;
			}
		}
		
		.close-popup {
			
			@media screen and (max-width: 480px) {
				top: 15px;
				right: 15px;
			}
		}
	}

`;

const PopupInner = styled( 'div' )`
	max-height: 80%;
	max-width: 90%;
	min-width: 350px;
	width: 100%;
	background-color: #fff;
	position: relative;
	padding: 60px 30px 30px;
	
	@keyframes shakeX {
		from,
		to {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
		
		10%,
		30%,
		50%,
		70%,
		90% {
			-webkit-transform: translate3d(-10px, 0, 0);
			transform: translate3d(-10px, 0, 0);
		}
		
		20%,
		40%,
		60%,
		80% {
			-webkit-transform: translate3d(10px, 0, 0);
			transform: translate3d(10px, 0, 0);
		}
	}
	
	&.animate__animated {
		animation-duration: 1s;
		animation-fill-mode: both;
	}
	
	&.animate__shakeX {
		animation-name: shakeX;
	}
	
	.general-popup &,
	.reviews-popup &,
	.thanks-for-your-review-popup & {
		width: 568px;
		max-height: 2000px;
		box-shadow: 0 64px 64px -48px rgba(15, 15, 15, 0.08);
		border-radius: 16px;
		padding: 70px 115px;
		
		@media screen and (max-width: 815px) {
			padding: 60px 15px 30px 15px;
		}
		
		.popup-btn-back {
			display: none;
		}
	}
	
	.general-popup & {
		
		.popup-btn-back {
			display: flex;
		}
		
		.close-popup {
			
			@media screen and (max-width: 480px) {
				border: 2px solid #E6E8EC;
				border-radius: 32px;
				transform: matrix(1, 0, 0, -1, 0, 0);
			}
		}
		
		.form-input__label {
			
			@media screen and (max-width: 480px) {
				font-weight: 500;
				display: flex;
				color: #777E90;
				margin-bottom: 8px;
				margin-top: 0;
			}
		}
		
		.auth-forms__wrap-input {
			@media screen and (max-width: 480px) {
				margin-bottom: 16px;
			}
		}
	}
`;

const ClosePopup = styled( 'button' )`
	appearance: none;
	border: none;
	background-repeat: no-repeat;
	background-position: center center;
	width: 25px;
	height: 25px;
	background-color: transparent;
	cursor: pointer;
	background-image: url("data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhbCIgZGF0YS1pY29uPSJ0aW1lcyIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjAgNTEyIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtdGltZXMgZmEtdy0xMCBmYS0zeCI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTkzLjk0IDI1NkwyOTYuNSAxNTMuNDRsMjEuMTUtMjEuMTVjMy4xMi0zLjEyIDMuMTItOC4xOSAwLTExLjMxbC0yMi42My0yMi42M2MtMy4xMi0zLjEyLTguMTktMy4xMi0xMS4zMSAwTDE2MCAyMjIuMDYgMzYuMjkgOTguMzRjLTMuMTItMy4xMi04LjE5LTMuMTItMTEuMzEgMEwyLjM0IDEyMC45N2MtMy4xMiAzLjEyLTMuMTIgOC4xOSAwIDExLjMxTDEyNi4wNiAyNTYgMi4zNCAzNzkuNzFjLTMuMTIgMy4xMi0zLjEyIDguMTkgMCAxMS4zMWwyMi42MyAyMi42M2MzLjEyIDMuMTIgOC4xOSAzLjEyIDExLjMxIDBMMTYwIDI4OS45NCAyNjIuNTYgMzkyLjVsMjEuMTUgMjEuMTVjMy4xMiAzLjEyIDguMTkgMy4xMiAxMS4zMSAwbDIyLjYzLTIyLjYzYzMuMTItMy4xMiAzLjEyLTguMTkgMC0xMS4zMUwxOTMuOTQgMjU2eiIgY2xhc3M9IiI+PC9wYXRoPjwvc3ZnPg==");
	position: absolute;
	top: 20px;
	right: 20px;
	
	> svg {
		display: none;
	}
	
	.general-popup &,
	.reviews-popup &,
	.remove-tour-confirmation &,
	.thanks-for-your-review-popup &,
	.last-minute-request-popup &,
	.last-minute-thanks-popup &,
	.login-form-popup & {
		width: 32px;
		height: 32px;
		top: -16px;
		right: -16px;
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		border-radius: 50%;
		background: #FFFFFF;
		box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.1);
		transition: transform 0.3s ease;
		
		> svg {
			pointer-events: none;
			display: block;
		}
		
		&:hover {
			transform: scale(1.2);
		}
		
		@media screen and (max-width: 815px) {
			top: 16px;
			right: 16px;
		}
	}

`;

const Popup: React.FC<PopupProps> = ( {
	open = false,
	setOpenPopup,
	children,
	customClass = ''
} ) => {
	const dispatch = useAppDispatch();
	
	const clickHandler = () => {
		setOpenPopup( false );
		document.querySelector( 'body' )?.classList.remove( 'popup-open' );
		dispatch( setPopupState( {
			state   : '',
			content : '',
			name    : '',
		} ) );
	};
	
	if ( open ) {
		document.querySelector( 'body' )?.classList.add( 'popup-open' );
	}
	
	const openClass = (open) ? 'active' : '';
	
	return (
		<PopupWrap className={ `popup ${ customClass } ${ openClass }` }>
			<PopupInner className="popup-inner">
				<ClosePopup className="close-popup" onClick={ clickHandler }>
					<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd"
						      d="M0.528514 0.52827C0.788864 0.267921 1.21097 0.267921 1.47132 0.52827L4.99992 4.05687L8.52851 0.52827C8.78886 0.26792 9.21097 0.26792 9.47132 0.52827C9.73167 0.788619 9.73167 1.21073 9.47132 1.47108L5.94273 4.99967L9.47132 8.52827C9.73167 8.78862 9.73167 9.21073 9.47132 9.47108C9.21097 9.73143 8.78886 9.73143 8.52851 9.47108L4.99992 5.94248L1.47132 9.47108C1.21097 9.73143 0.788864 9.73143 0.528514 9.47108C0.268165 9.21073 0.268165 8.78862 0.528514 8.52827L4.05711 4.99967L0.528514 1.47108C0.268165 1.21073 0.268165 0.78862 0.528514 0.52827Z"
						      fill="#353945"/>
					</svg>
				</ClosePopup>
				{ children }
			</PopupInner>
		</PopupWrap>
	);
}

export default Popup;