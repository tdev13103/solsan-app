'use client'

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Typography from '../UI/Typography';
import InputForm from "@/components/InputForm";
import ThanksPopup from '../Popup/ThanksPopup';
import Button from "@/components/Button";
import { useAppDispatch } from "@/redux/hooks";
import { setPopupState } from "@/redux/features/popupActions";
import theme from "@/styles/theme";
import { useThemeContext } from "@/context/theme.context";

type FormField = {
	name?: string;
	btnSize: string;
	classParent: string;
	className: string;
	type: string;
	title: string;
	placeholder: string;
	isRequired: boolean;
	onClick: () => void;
};

const of_wrap = 'offer-form-wrap';

const FormWrapper = styled.div`
	
	.offer-form-wrap {
		
		&__title {
			margin-bottom: ${ theme.spaces.normal };
		}
		
		&__desc {
			margin-bottom: ${ theme.spaces.medium2 };
		}
		
		&__inputs-title {
			margin-bottom: ${ theme.spaces.mini };
			
			@media screen and (max-width: 991px) {
				font-size: 16px;
			}
		}
		
		&__form {
			display: flex;
			flex-wrap: wrap;
			
			.form-input {
				width: calc((100% - 16px) / 2);
				margin-right: ${ theme.spaces.small };
				margin-left: 0;
				
				@media screen and (max-width: 480px) {
					width: 100%;
					margin-right: 0;
				}
				
				&.w-last {
					margin-right: 0;
				}
			}
			
			.offer-form-wrap__download-btn-wrap,
			.offer-form-wrap__cancel-btn-wrap {
				width: max-content;
			}
			
			.offer-form-wrap__file-wrap {
				width: 100%;
				margin-right: 0;
			}
		}
		
		&__file-wrap {
			display: none;
		}
		
		&__file-input-wrap {
			width: 100%;
			margin-bottom: ${ theme.spaces.medium2 };
		}
		
		&__file-label {
			display: block;
			width: 100%;
			background: rgba(140, 150, 255, 0.15);
			border: 1px dashed #221551;
			border-radius: 12px;
			padding: ${ theme.spaces.small };
			padding-top: ${ theme.spaces.medium3 };
			position: relative;
			z-index: 1;
			cursor: pointer;
			
			&:after {
				position: absolute;
				content: '';
				display: block;
				left: 50%;
				top: 14px;
				transform: translateX(-50%);
				width: 24px;
				height: 24px;
				z-index: 1;
				background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNCAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuMDYwMSAxN1YxMiIgc3Ryb2tlPSIjMjkyRDMyIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTQuNSAxNC41SDkuNSIgc3Ryb2tlPSIjMjkyRDMyIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjIgMTEuNVYxNy41QzIyIDIxLjUgMjEgMjIuNSAxNyAyMi41SDdDMyAyMi41IDIgMjEuNSAyIDE3LjVWNy41QzIgMy41IDMgMi41IDcgMi41SDguNUMxMCAyLjUgMTAuMzMgMi45NCAxMC45IDMuN0wxMi40IDUuN0MxMi43OCA2LjIgMTMgNi41IDE0IDYuNUgxN0MyMSA2LjUgMjIgNy41IDIyIDExLjVaIiBzdHJva2U9IiMyOTJEMzIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48L3N2Zz4=) center center no-repeat;
				background-size: contain;
			}
		}
		
		&__file-download-title {
			
			text-align: center;
			width: max-content;
			margin-left: auto;
			margin-right: auto;
			text-decoration: underline;
			text-decoration-color: ${ theme.colors.colorNavyDark };
		}
		
		&__file-ext {
			display: flex;
			justify-content: center;
			margin-bottom: ${ theme.spaces.mini };
			
			span {
				${ theme.p };
				margin-right: ${ theme.spaces.mini };
				line-height: 1.4;
				color: #8F8AA6;
				
				&:last-of-type {
					margin-right: 0;
				}
			}
		}
		
		&__buttons {
			
			.btn {
				margin-right: ${ theme.spaces.small };
				
				&:last-of-type {
					margin-right: 0;
				}
			}
		}
		
		&__cancel-btn {
			border: 1px solid #8F8AA6;
		}
	}
`;

const inputs = [
	{
		btnSize     : 'big',
		name        : 'name',
		classParent : `${ of_wrap }__user-name-wrap`,
		className   : `${ of_wrap }__user-name`,
		type        : 'text',
		title       : '',
		placeholder : 'Namn',
		isRequired  : true,
		onClick     : () => {
		},
	},
	{
		btnSize     : 'big',
		name        : 'phone',
		classParent : `${ of_wrap }__phone-wrap w-last`,
		className   : `${ of_wrap }__phone`,
		type        : 'text',
		title       : '',
		isRequired  : true,
		placeholder : 'Telefonnummer',
		onClick     : () => {
		},
	},
	{
		btnSize     : 'big',
		name        : 'address',
		classParent : `${ of_wrap }__address-wrap`,
		className   : `${ of_wrap }__address`,
		type        : 'text',
		title       : '',
		placeholder : 'Adress',
		isRequired  : true,
		onClick     : () => {
		},
	},
	{
		btnSize     : 'big',
		name        : 'email',
		classParent : `${ of_wrap }__email-wrap w-last`,
		className   : `${ of_wrap }__email`,
		type        : 'email',
		title       : '',
		isRequired  : true,
		placeholder : 'E-postadress',
		onClick     : () => {
		},
	},
];

const OfferForm = () => {
	const { themeSettings } = useThemeContext();
	
	const {
		oformCancelBtn,
		oformDesc,
		oformDownloadBtn,
		oformDownloadFileTitle,
		oformInputsTitle,
		oformTitle,
		formsSetttings
	} = themeSettings;
	const dispatch = useAppDispatch();
	
	const [finalFormsFields, setFinalFormsFields] = useState<FormField[]>( [] );
	const currentFormFields = formsSetttings?.filter( ( item ) => item?.formName === 'Offer form' )?.[0];
	
	useEffect( () => {
		setFinalFormsFields( () => {
			return inputs.map( item => {
				return {
					...item,
					name : currentFormFields?.fields?.filter(
						( subItem ) => subItem.name === item.name )[0]?.fieldId,
				};
			} );
		} );
	}, [] );
	
	const inputFile = [
		{
			btnSize     : 'big',
			name        : currentFormFields?.fields?.filter(
				( subItem ) => subItem.name === 'upload' )[0]?.fieldId,
			classParent : `${ of_wrap }__file-wrap`,
			className   : `${ of_wrap }__file`,
			type        : 'file',
			title       : '',
			placeholder : '',
			onClick     : () => {
			},
		},
	];
	
	const closePopup = ( event: Event ) => {
		event.preventDefault();
		
		dispatch( setPopupState( {
			state   : '',
			content : '',
			name    : '',
		} ) );
		
		document.querySelector( 'body' )?.classList.remove( 'popup-open' );
	};
	
	const sendingFormData = async ( event: React.FormEvent<HTMLFormElement> ) => {
		event.preventDefault();
		
		const formData = new FormData( event.currentTarget );
		const url = `${ process.env.NEXT_PUBLIC_WORDPRESS_API_URL }/wp-json/gf/v2/forms/${ currentFormFields?.formId }/submissions`;
		
		const responseData = await fetch( url, {
			method : 'POST',
			body   : formData
		} );
		
		const response = await responseData.json();
		
		if ( response?.is_valid ) {
			dispatch( setPopupState( {
				state   : 'open',
				content : <ThanksPopup/>,
				name    : 'thanks-offer-popup',
			} ) );
		}
		
	};
	
	return (
		<FormWrapper className={ `${ of_wrap }` }>
			<Typography className={ `${ of_wrap }__title` } type={ 'h5' }
			            variant={ 'h5' }>
				{ oformTitle }
			</Typography>
			<Typography className={ `${ of_wrap }__desc` } type={ 'p' }
			            variant={ 'body_1_large' }>
				{ oformDesc }
			</Typography>
			<Typography className={ `${ of_wrap }__inputs-title` } type={ 'p' }
			            variant={ 'subheader1' }>
				{ oformInputsTitle }
			</Typography>
			<form className={ `${ of_wrap }__form` }
			      onSubmit={ sendingFormData }
			      method="post"
			      encType="multipart/form-data">
				{
					(finalFormsFields || []).map( ( item, index ) => {
						return <InputForm data={ item } key={ index }/>;
					} )
				}
				<div className={ `${ of_wrap }__file-input-wrap` }>
					<label className={ `${ of_wrap }__file-label` }>
						{
							inputFile.length &&
							inputFile.map( ( item, index ) => {
								return <InputForm data={ item } key={ index }/>;
							} )
						}
						<Typography className={ `${ of_wrap }__file-ext` }
						            type={ 'p' }>
							<span>.PDF</span>
							<span>.JPG</span>
							<span>.PNG</span>
							<span>.DOC</span>
						</Typography>
						<Typography
							className={ `${ of_wrap }__file-download-title` }
							type={ 'p' }>
							{ oformDownloadFileTitle }
						</Typography>
					</label>
				</div>
				<div className={ `${ of_wrap }__buttons` }>
					<Button type={ `button_2` }
					        title={ oformDownloadBtn['title'] }
					        isHyperlink={ false }
					        hrefLink={ '' }
					        className={ `${ of_wrap }__download-btn` }
					/>
					
					<Button type={ `button_4` }
					        title={ oformCancelBtn['title'] }
					        isHyperlink={ false }
					        hrefLink={ '' }
					        className={ `${ of_wrap }__cancel-btn` }
					        onClick={ closePopup }/>
				</div>
			</form>
		</FormWrapper>
	);
};

export default OfferForm;
