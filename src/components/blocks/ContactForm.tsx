'use client'

import React, { FormEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/Button';
import Typography from '../UI/Typography';
import InputForm from "@/components/InputForm";
import Container from "../Container";
import GridSystem from "../UI/Grid/GridSystem";
import Image from "next/image";
import theme from "@/styles/theme";
import { useThemeContext } from "@/context/theme.context";

interface ContactFormProps {
	data: {
		contact_form_desc: string;
		contact_form_img: string;
		contact_form_title: string;
		contact_info_label: string;
		contact_message_label: string;
		contact_policy_text: string;
		contact_product_label: string;
		contact_submit_btn_text: {
			title: string;
			url: string;
		}
	}
}

type FormField = {
	name?: string;
	id?: string;
	checkboxLabel?: string;
	checkboxLabelClass?: string;
	btnSize: string;
	classParent: string;
	className: string;
	type: string;
	title: string;
	placeholder: string;
	isRequired: boolean;
	onClick: () => void;
};

const of_wrap = 'contact-form-wrap';

const FormWrapper = styled.div`
	margin-top: ${ theme.spaces.medium3 };
	margin-bottom: ${ theme.spaces.medium3 };
	
	.contact-form-wrap {
		
		&__title {
			margin-bottom: ${ theme.spaces.normal };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				margin-bottom: ${ theme.spaces.small };
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-bottom: ${ theme.spaces.small2 };
			}
		}
		
		&__desc {
			margin-bottom: ${ theme.spaces.normal };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				margin-bottom: ${ theme.spaces.medium2 };
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-bottom: ${ theme.spaces.small2 };
			}
		}
		
		&__inputs-label {
			width: 100%;
			margin-bottom: ${ theme.spaces.small };
			font-weight: 700;
		}
		
		&__message-inputs-label {
			margin-top: ${ theme.spaces.small2 };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-top: ${ theme.spaces.mini };
			}
		}
		
		&__form-image-wrap {
			display: flex;
			align-items: center;
			padding-left: ${ theme.spaces.normal };
			padding-right: ${ theme.spaces.normal };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m1370 }) {
				padding-left: 0;
				padding-right: 0;
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				grid-row: 1;
			}
		}
		
		&__form-image {
			width: 100%;
			border-radius: 12px;
			overflow: hidden;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				height: 375px;
				max-height: 375px;
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				height: 186px;
				max-height: 186px;
			}
		}
		
		&__img {
			width: 100%;
			height: 100%;
			object-fit: cover;
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
		
		&__product-names {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			margin-bottom: ${ theme.spaces.gridGap };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-bottom: ${ theme.spaces.mini };
			}
			
			.contact-form-wrap__product-name-wrap {
				max-width: max-content;
				
				&.form-input {
					margin-right: ${ theme.spaces.small };
				}
			}
		}
		
		&__product-name {
			display: none;
			
			&:checked {
				& + .contact-form-wrap__field-label {
					background-color: ${ theme.colors.colorNavyDark };
					color: ${ theme.colors.colorWhite };
					
					&:after {
						background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjMiIHZpZXdCb3g9IjAgMCAyMiAyMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiAxMi41TDkgMTUuNUwxNiA4LjUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cmVjdCB4PSIwLjc1IiB5PSIxLjI1IiB3aWR0aD0iMjAuNSIgaGVpZ2h0PSIyMC41IiByeD0iNS4yNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L3N2Zz4=) center center no-repeat;
						background-size: contain;
					}
				}
			}
		}
		
		&__product-name-wrap {
			width: max-content;
			margin-bottom: ${ theme.spaces.gridGap };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-bottom: ${ theme.spaces.small };
			}
		}
		
		&__field-label {
			display: flex;
			align-items: center;
			width: max-content;
			height: 49px;
			padding: 12px 24px 12px 42px;
			color: ${ theme.colors.colorNavyDark };
			border: 1px solid ${ theme.colors.colorNavyDark };
			border-radius: ${ theme.borderRadius.default };
			position: relative;
			z-index: 1;
			
			&:after {
				position: absolute;
				content: '';
				display: block;
				left: 12px;
				top: 12px;
				width: 22px;
				height: 22px;
				z-index: 1;
				background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjMiIHZpZXdCb3g9IjAgMCAyMiAyMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiAxMi41TDkgMTUuNUwxNiA4LjUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cmVjdCB4PSIwLjc1IiB5PSIxLjI1IiB3aWR0aD0iMjAuNSIgaGVpZ2h0PSIyMC41IiByeD0iNS4yNSIgc3Ryb2tlPSIjMjIxNTUxIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvc3ZnPg==) center center no-repeat;
				background-size: contain;
			}
		}
		
		&__address-wrap,
		&__message-wrap {
			&.form-input {
				margin-right: 0;
				width: 100%;
			}
		}
		
		&__message-wrap {
			margin-bottom: ${ theme.spaces.medium2 };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-bottom: ${ theme.spaces.small2 };
			}
		}
		
		&__policy-and-submit {
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				display: flex;
				flex-direction: column-reverse;
			}
		}
		
		&__policy-text {
			margin-right: 0;
			width: 100%;
			margin-bottom: ${ theme.spaces.normal };
			color: ${ theme.colors.colorNavyLight };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				margin-bottom: ${ theme.spaces.small };
			}
			
			* {
				color: inherit;
				font-size: inherit;
				font-family: inherit;
				font-weight: inherit;
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
				color: #8f8aa6;
				
				&:last-of-type {
					margin-right: 0;
				}
			}
		}
		
		&__buttons {
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				width: 100%;
				margin-bottom: ${ theme.spaces.mini };
			}
			
			.btn {
				margin-right: ${ theme.spaces.small };
				
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
					width: 100%;
				}
				
				&:last-of-type {
					margin-right: 0;
				}
			}
		}
		
		&__cancel-btn {
			border: 1px solid #8f8aa6;
		}
		
		&__thanks {
			
		}
		
		&__thanks-title {
			margin-bottom: ${ theme.spaces.small };
		}
		
		
		&__thanks-desc {
			margin-bottom: ${ theme.spaces.gridGap2 };
		}
		
		&__thanks-btn-wrap {
			
		}
		
		&__thanks-btn {
			
		}
	}
	
	.contact-form-wrap__list {
		grid-column-gap: ${ theme.spaces.medium1 };
		
		@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
			grid-row-gap: 20px;
		}
	}
`;

const inputs1 = [
	{
		id                 : '',
		btnSize            : 'big',
		name               : 'product',
		classParent        : `${ of_wrap }__product-name-wrap`,
		className          : `${ of_wrap }__product-name`,
		type               : 'radio',
		title              : '',
		placeholder        : 'Solceller',
		checkboxLabel      : '',
		checkboxLabelClass : `${ of_wrap }`,
		isRequired         : true,
		onClick            : () => {
		},
	},
	{
		id                 : '',
		btnSize            : 'big',
		name               : 'product',
		classParent        : `${ of_wrap }__product-name-wrap`,
		className          : `${ of_wrap }__product-name`,
		type               : 'radio',
		title              : '',
		placeholder        : 'Batterier',
		checkboxLabel      : '',
		checkboxLabelClass : `${ of_wrap }`,
		isRequired         : true,
		onClick            : () => {
		},
	},
	{
		id                 : '',
		btnSize            : 'big',
		name               : 'product',
		classParent        : `${ of_wrap }__product-name-wrap`,
		className          : `${ of_wrap }__product-name`,
		type               : 'radio',
		title              : '',
		placeholder        : 'Laddbox',
		checkboxLabel      : '',
		checkboxLabelClass : `${ of_wrap }`,
		isRequired         : true,
		onClick            : () => {
		},
	},
	{
		id                 : '',
		btnSize            : 'big',
		name               : 'product',
		classParent        : `${ of_wrap }__product-name-wrap w-last`,
		className          : `${ of_wrap }__product-name`,
		type               : 'radio',
		title              : '',
		placeholder        : 'Övrigt',
		checkboxLabel      : '',
		checkboxLabelClass : `${ of_wrap }`,
		isRequired         : true,
		onClick            : () => {
		},
	},
];

const inputs2 = [
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
		name        : 'lastname',
		classParent : `${ of_wrap }__lastname-wrap w-last`,
		className   : `${ of_wrap }__lastname`,
		type        : 'text',
		title       : '',
		isRequired  : true,
		placeholder : 'Efternamn',
		onClick     : () => {
		},
	},
	{
		btnSize     : 'big',
		name        : 'email',
		classParent : `${ of_wrap }__email-wrap`,
		className   : `${ of_wrap }__email`,
		type        : 'email',
		title       : '',
		isRequired  : true,
		placeholder : 'E-postadress',
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
		placeholder : 'Telefon',
		isRequired  : true,
		onClick     : () => {
		},
	},
	{
		btnSize     : 'big',
		name        : 'address',
		classParent : `${ of_wrap }__address-wrap w-last`,
		className   : `${ of_wrap }__address`,
		type        : 'text',
		title       : '',
		isRequired  : true,
		placeholder : 'Adress',
		onClick     : () => {
		},
	},
	{
		btnSize     : 'big',
		name        : 'post_code',
		classParent : `${ of_wrap }__post-code-wrap`,
		className   : `${ of_wrap }__post-code`,
		type        : 'number',
		title       : '',
		isRequired  : true,
		placeholder : 'Postnummer',
		onClick     : () => {
		},
	},
	{
		btnSize     : 'big',
		name        : 'place',
		classParent : `${ of_wrap }__place-wrap w-last`,
		className   : `${ of_wrap }__place`,
		type        : 'text',
		title       : '',
		isRequired  : true,
		placeholder : 'Ort',
		onClick     : () => {
		},
	},
];

const inputs3 = [
	{
		btnSize     : 'big',
		name        : 'message',
		classParent : `${ of_wrap }__message-wrap w-last`,
		className   : `${ of_wrap }__message`,
		type        : 'textarea',
		title       : '',
		isRequired  : true,
		placeholder : 'Meddelande',
		onClick     : () => {
		},
	},
];

const ContactForm: React.FC<ContactFormProps> = ( {
	data : {
		contact_form_desc,
		contact_form_img,
		contact_form_title,
		contact_info_label,
		contact_message_label,
		contact_policy_text,
		contact_product_label,
		contact_submit_btn_text
	}
} ) => {
	const { themeSettings } = useThemeContext();
	const {
		cformThanksBtn,
		cformThanksDesc,
		cformThanksTitle,
		formsSetttings
	} = themeSettings;
	
	const [finalFormsFields1, setFinalFormsFields1] = useState<FormField[]>( [] );
	const [finalFormsFields2, setFinalFormsFields2] = useState<FormField[]>( [] );
	const [finalFormsFields3, setFinalFormsFields3] = useState<FormField[]>( [] );
	const [statusSendForm, setStatusSendForm] = useState<boolean>( false );
	
	const currentFormFields = formsSetttings?.filter( ( item ) => item?.formName === 'Contact form' )?.[0];
	
	useEffect( () => {
		setFinalFormsFields1( () => {
			return inputs1
				.map( ( item, index ) => {
					if ( index > 3 ) return null;
					return {
						...item,
						id            : item?.placeholder,
						checkboxLabel : item?.placeholder,
						name          : currentFormFields?.fields?.filter(
							( subItem ) => subItem?.name === item?.name )[0]?.fieldId,
					};
				} )
				.filter( item => item !== null ) as FormField[];
		} );
		setFinalFormsFields2( () => {
			return inputs2
				.map( ( item, index ) => {
					if ( index < 4 && index > 10 ) return null;
					return {
						...item,
						name : currentFormFields?.fields?.filter(
							( subItem ) => subItem?.name === item?.name )[0]?.fieldId,
					};
				} )
				.filter( item => item !== null ) as FormField[];
		} );
		setFinalFormsFields3( () => {
			return inputs3.map( ( item ) => {
				return {
					...item,
					name : currentFormFields?.fields?.filter(
						( subItem ) => subItem?.name === item?.name )[0]?.fieldId,
				};
			} );
		} );
	}, [] );
	
	const sendingFormData = async ( event: FormEvent<HTMLFormElement> ) => {
		event.preventDefault();
		
		const formData = new FormData( event.currentTarget );
		const url = `${ process.env.NEXT_PUBLIC_SITEURL }/wp-json/gf/v2/forms/${ currentFormFields?.formId }/submissions`;
		
		const response = await fetch( url, {
			method : 'POST',
			body   : formData
		} );
		
		const ress = await response.json();
		
		if ( ress?.is_valid ) {
			setStatusSendForm( prev => !prev );
		}
	};
	
	const closeThanks = ( event: React.MouseEvent<HTMLButtonElement> ) => {
		event.preventDefault();
		setStatusSendForm( prev => !prev );
	};
	
	return (
		<FormWrapper className={ `${ of_wrap }` }>
			<Container>
				<GridSystem variant={ 'grid-2' } className={ `${ of_wrap }__list` }>
					<div className={ `${ of_wrap }__form-data` }>
						{
							!statusSendForm &&
              <>
                <Typography className={ `${ of_wrap }__title` } type={ 'h2' }
                            variant={ 'h2' }>
									{ contact_form_title }
                </Typography>
                <Typography className={ `${ of_wrap }__desc` } type={ 'p' }
                            variant={ 'body_1_large' }>
									{ contact_form_desc }
                </Typography>
                <form className={ `${ of_wrap }__form` }
                      onSubmit={ sendingFormData }
                      method="post"
                      encType="multipart/form-data">
                  <Typography className={ `${ of_wrap }__inputs-label` } type={ 'p' } variant={ 'body_1_large' }>
										{ contact_product_label }
                  </Typography>
                  <div className={ `${ of_wrap }__product-names` }>
										{
											(finalFormsFields1 || []).map( ( item, index ) => {
												return <InputForm data={ item } key={ index }/>;
											} )
										}
                  </div>
                  <Typography className={ `${ of_wrap }__inputs-label` } type={ 'p' } variant={ 'body_1_large' }>
										{ contact_info_label }
                  </Typography>
									{
										(finalFormsFields2 || []).map( ( item, index ) => {
											return <InputForm data={ item } key={ index }/>;
										} )
									}
                  <Typography className={ `${ of_wrap }__inputs-label ${ of_wrap }__message-inputs-label` } type={ 'p' }
                              variant={ 'body_1_large' }>
										{ contact_message_label }
                  </Typography>
									{
										(finalFormsFields3 || []).map( ( item, index ) => {
											return <InputForm data={ item } key={ index }/>;
										} )
									}
                  <div className={ `${ of_wrap }__policy-and-submit` }>
                    <Typography className={ `${ of_wrap }__policy-text` } type={ 'p' } variant={ 'body_1_large' }
                                dangerouslySetInnerHTML={ { __html : contact_policy_text } }>
                    </Typography>
                    <div className={ `${ of_wrap }__buttons` }>
                      <Button type={ `button_2` }
                              title={ contact_submit_btn_text?.title }
                              isHyperlink={ false }
                              hrefLink={ '' }
                              className={ `${ of_wrap }__download-btn` }
                      />
                    </div>
                  </div>
                </form>
              </>
						}
						
						{
							statusSendForm &&
              <div className={ `${ of_wrap }__thanks` }>
                <Typography className={ `${ of_wrap }__thanks-title` } type={ 'h5' } variant={ 'h5' }>
									{ cformThanksTitle }
                </Typography>
                <Typography className={ `${ of_wrap }__thanks-desc` } type={ 'p' } variant={ 'body_1_large' }>
									{ cformThanksDesc }
                </Typography>
                <div className={ `${ of_wrap }__thanks-btn-wrap` }>
                  <Button type={ `button_2` }
                          title={ cformThanksBtn?.title }
                          isHyperlink={ false }
                          hrefLink={ '' }
                          className={ `${ of_wrap }__thanks-btn` }
                          onClick={ closeThanks }
                  />
                </div>
              </div>
						}
					</div>
					<div className={ `${ of_wrap }__form-image-wrap` }>
						<div className={ `${ of_wrap }__form-image` }>
							{
								contact_form_img &&
                <Image className={ `${ of_wrap }__img` }
                       src={ contact_form_img }
                       alt={ 'icon' }
                       width={ 600 }
                       height={ 348 }
                />
							}
						</div>
					</div>
				</GridSystem>
			</Container>
		</FormWrapper>
	);
};

export default ContactForm;
