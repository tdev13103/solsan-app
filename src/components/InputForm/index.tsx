'use client'

import React, { LegacyRef } from "react";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import Button from "@/components/Button";
import theme from "@/styles/theme";
import { Props as SelectProps } from "react-select"; // Assuming the proper import path for the Select props

interface FormField {
	name?: string;
	defaultValue?: string;
	disabled?: boolean; // Change to boolean type
	btnSize?: string;
	classParent?: string;
	className?: string;
	type: string;
	title: string;
	placeholder?: string;
	isRequired?: boolean;
	onClick?: () => void;
	options?: SelectProps["options"];
	onChange?: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
	onBlur?: ( event: React.FocusEvent<HTMLInputElement> ) => void;
	ref?: LegacyRef<HTMLInputElement> | LegacyRef<HTMLTextAreaElement> | undefined;
	checkboxLabel?: string;
	checkboxLabelClass?: string;
	checked?: boolean;
	value?: string;
	change?: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
	id?: string;
	fileLabel?: string;
	fileLabelClass?: string;
}


interface InputFormProps {
	data: FormField,
	error?: {
		error?: boolean;
		errorText?: string
	}
}

const Select = dynamic(
	() => import('react-select').then( ( mod ) => mod.default ),
	{
		ssr     : false,
		loading : () => null,
	},
);

export const InputWrapper = styled.div`
	margin-left: ${ theme.spaces.mini };
	margin-right: ${ theme.spaces.mini };
	margin-bottom: ${ theme.spaces.small };
	position: relative;
	
	@media screen and (max-width: 768px) {
		margin-right: 0;
		margin-left: 0;
	}
	
	&:last-child {
		margin-right: 0;
	}
	
	&.hidden {
		width: 0;
		height: 0;
		overflow: hidden;
		padding: 0;
		margin: 0;
	}
	
	
	.form-input {
		position: relative;
		
		&__field {
			${ theme.text_input };
			
			&[type="text"] + .form-input__show-password-icon {
				width: 22px;
				height: 18px;
				background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYuODgyIDE4LjI5NzFDMTUuMTIzMiAxOS40MTI2IDEzLjA4MjcgMjAuMDAzNCAxMSAyMC4wMDAxQzUuNjA4IDIwLjAwMDEgMS4xMjIgMTYuMTIwMSAwLjE4MSAxMS4wMDAxQzAuNjExMDI5IDguNjcwNzggMS43ODI2MyA2LjU0Mjk2IDMuNTIxIDQuOTM0MDdMMC4zOTIgMS44MDgwN0wxLjgwNyAwLjM5MzA2NkwyMS42MDYgMjAuMTkzMUwyMC4xOTEgMjEuNjA3MUwxNi44ODEgMTguMjk3MUgxNi44ODJaTTQuOTM1IDYuMzUwMDdDMy41NzYgNy41ODU2NiAyLjYyOTMyIDkuMjA4ODUgMi4yMjMgMTEuMDAwMUMyLjUzNTI5IDEyLjM2NjUgMy4xNjIyNiAxMy42NDEyIDQuMDU0IDE0LjcyMjdDNC45NDU3NCAxNS44MDQxIDYuMDc3NjMgMTYuNjYyNSA3LjM1OTU1IDE3LjIyOTRDOC42NDE0OCAxNy43OTYzIDEwLjAzOCAxOC4wNTYxIDExLjQzODEgMTcuOTg4MkMxMi44MzgxIDE3LjkyMDMgMTQuMjAzIDE3LjUyNjQgMTUuNDI0IDE2LjgzODFMMTMuMzk2IDE0LjgxMDFDMTIuNTMyNyAxNS4zNTM5IDExLjUxMDIgMTUuNTg4MiAxMC40OTYyIDE1LjQ3NDVDOS40ODIyOCAxNS4zNjA4IDguNTM3MDQgMTQuOTA2IDcuODE1NTcgMTQuMTg0NUM3LjA5NDEgMTMuNDYzIDYuNjM5MjMgMTIuNTE3OCA2LjUyNTU2IDExLjUwMzhDNi40MTE5IDEwLjQ4OTkgNi42NDYxOCA5LjQ2NzM4IDcuMTkgOC42MDQwN0w0LjkzNSA2LjM1MDA3Wk0xMS45MTQgMTMuMzI4MUw4LjY3MiAxMC4wODYxQzguNDk0MDYgMTAuNTM5IDguNDUyMTkgMTEuMDM0IDguNTUxNTEgMTEuNTEwNEM4LjY1MDgyIDExLjk4NjggOC44ODcwMiAxMi40MjM4IDkuMjMxMTIgMTIuNzY3OUM5LjU3NTIyIDEzLjExMjEgMTAuMDEyMyAxMy4zNDgyIDEwLjQ4ODcgMTMuNDQ3NkMxMC45NjUgMTMuNTQ2OSAxMS40NjAxIDEzLjUwNSAxMS45MTMgMTMuMzI3MUwxMS45MTQgMTMuMzI4MVpNMTkuODA3IDE1LjU5MjFMMTguMzc2IDE0LjE2MjFDMTkuMDQ0NSAxMy4yMDk0IDE5LjUyMDQgMTIuMTM1MyAxOS43NzcgMTEuMDAwMUMxOS41MDUyIDkuODA5NzkgMTguOTk0MyA4LjY4NzIxIDE4LjI3NTEgNy43MDA1NkMxNy41NTYgNi43MTM5MSAxNi42NDM4IDUuODgzNzkgMTUuNTkzOSA1LjI2MDY3QzE0LjU0NCA0LjYzNzU1IDEzLjM3ODMgNC4yMzQ0MyAxMi4xNjc3IDQuMDc1ODNDMTAuOTU3MiAzLjkxNzIzIDkuNzI3MDEgNC4wMDY0NSA4LjU1MiA0LjMzODA3TDYuOTc0IDIuNzYwMDdDOC4yMjEgMi4yNzAwNyA5LjU4IDIuMDAwMDcgMTEgMi4wMDAwN0MxNi4zOTIgMi4wMDAwNyAyMC44NzggNS44ODAwNyAyMS44MTkgMTEuMDAwMUMyMS41MTI2IDEyLjY2NTggMjAuODIzOSAxNC4yMzc2IDE5LjgwNyAxNS41OTIxWk0xMC43MjMgNi41MDgwN0MxMS4zNTk1IDYuNDY4NzMgMTEuOTk3MSA2LjU2NTEzIDEyLjU5MzUgNi43OTA4OEMxMy4xOSA3LjAxNjYzIDEzLjczMTYgNy4zNjY1OCAxNC4xODI1IDcuODE3NTJDMTQuNjMzNSA4LjI2ODQ2IDE0Ljk4MzQgOC44MTAwOSAxNS4yMDkyIDkuNDA2NTJDMTUuNDM0OSAxMC4wMDMgMTUuNTMxMyAxMC42NDA2IDE1LjQ5MiAxMS4yNzcxTDEwLjcyMiA2LjUwODA3SDEwLjcyM1oiIGZpbGw9IiMzNTM5NDUiLz48L3N2Zz4=) center center no-repeat;
				
			}
		}
		
		&__checkbox {
			margin: 0;
			width: 0;
			height: 0;
			top: 0;
			left: 0;
			opacity: 0;
			
			& + label:before {
				width: 20px;
				height: 20px;
				content: "";
				position: relative;
				display: inline-block;
				background-repeat: no-repeat;
				background-position: center center;
				border: 1px solid ${ theme.colors.colorNavyDark };
				border-radius: 2px;
				margin-right: 12px;
				top: 5px;
			}
			
			&:checked + label:before {
				background-color: ${ theme.colors.colorNavyDark };
				background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNSAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuOTIwMyAwLjk2MjU0QzEzLjAwNTYgMC44NzU0OTcgMTMuMTA3NSAwLjgwNjM0OSAxMy4yMTk4IDAuNzU5MTQzQzEzLjMzMjIgMC43MTE5MzcgMTMuNDUyOCAwLjY4NzYyMiAxMy41NzQ3IDAuNjg3NjIyQzEzLjY5NjYgMC42ODc2MjIgMTMuODE3MiAwLjcxMTkzNyAxMy45Mjk2IDAuNzU5MTQzQzE0LjA0MiAwLjgwNjM0OSAxNC4xNDM4IDAuODc1NDk3IDE0LjIyOTEgMC45NjI1NEMxNC41ODY2IDEuMzIzNzkgMTQuNTkxNiAxLjkwNzU0IDE0LjI0MTYgMi4yNzUwNEw2Ljg1MDM0IDExLjAxMjVDNi43NjY0MiAxMS4xMDQ3IDYuNjY0NTkgMTEuMTc4OCA2LjU1MTA2IDExLjIzMDJDNi40Mzc1NCAxMS4yODE2IDYuMzE0NzEgMTEuMzA5NCA2LjE5MDEgMTEuMzExN0M2LjA2NTQ5IDExLjMxNDEgNS45NDE3MSAxMS4yOTA5IDUuODI2MzMgMTEuMjQzOEM1LjcxMDk1IDExLjE5NjcgNS42MDY0MSAxMS4xMjY1IDUuNTE5MDkgMTEuMDM3NUwxLjAyMTU5IDYuNDgwMDRDMC44NDgxMzggNi4zMDMxNSAwLjc1MDk3NyA2LjA2NTI4IDAuNzUwOTc3IDUuODE3NTRDMC43NTA5NzcgNS41Njk4IDAuODQ4MTM4IDUuMzMxOTMgMS4wMjE1OSA1LjE1NTA0QzEuMTA2OSA1LjA2OCAxLjIwODcxIDQuOTk4ODUgMS4zMjEwOCA0Ljk1MTY0QzEuNDMzNDQgNC45MDQ0NCAxLjU1NDA5IDQuODgwMTIgMS42NzU5NyA0Ljg4MDEyQzEuNzk3ODQgNC44ODAxMiAxLjkxODQ5IDQuOTA0NDQgMi4wMzA4NiA0Ljk1MTY0QzIuMTQzMjIgNC45OTg4NSAyLjI0NTAzIDUuMDY4IDIuMzMwMzQgNS4xNTUwNEw2LjE0NTM0IDkuMDIxMjlMMTIuODk1MyAwLjk5MDA0QzEyLjkwMzEgMC45ODAzNzkgMTIuOTExNSAwLjk3MTE5NiAxMi45MjAzIDAuOTYyNTRaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==);
				border: 1px solid transparent;
				z-index: 100;
			}
		}
		
		&__select-wrapper {
			
		}
		
		&__error-icon {
			position: absolute;
			pointer-events: none;
			right: 13px;
			top: 13px;
		}
		
	}
	
	textarea.form-input__field {
		${ theme.text_input };
		${ theme.textarea };
	}
	
	&.error {
		.form-input__field {
			color: ${ theme.colors.colorRed };
		}
		
		.form-input__error {
			${ theme.optional_text };
		}
	}
	
	&.w100 {
		width: calc(100% - ${ theme.spaces.small });
		text-align: center;
		
		@media screen and (max-width: 767px) {
			width: 100%;
		}
	}
	
	&.w50 {
		width: calc(50% - ${ theme.spaces.small });
		
		@media screen and (max-width: 767px) {
			width: 100%;
		}
	}
	
	&.w33 {
		width: calc(33.3% - ${ theme.spaces.small });
		
		@media screen and (max-width: 767px) {
			width: 100%;
		}
	}
	
	&.w2_3 {
		width: 66%;
		
		@media screen and (max-width: 767px) {
			width: 100%;
		}
	}
	
	&.w25 {
		width: calc(25% - ${ theme.spaces.small });
		
		@media screen and (max-width: 767px) {
			width: 100%;
		}
	}

`;


// Custom styles for Styled Select
// Documentation can be found here - https://react-select.com/styles
const customStyles = {
	control            : ( provided: any ) => ({
		...provided,
		minHeight    : '47px',
		background   : '#fff',
		border       : '1px solid #8C96FF',
		borderRadius : '12px',
	}),
	indicatorSeparator : ( provided: any ) => ({
		...provided,
		display : 'none',
	}),
	menuList           : ( provided: any ) => ({
		...provided,
		padding : 8,
	}),
	option             : ( provided: any, state: any ) => ({
		...provided,
		fontStyle  : 'normal',
		fontWeight : 400,
		fontSize   : '18px',
		lineHeight : 1.4,
		color      : (state.isSelected || state.isFocused) ? '#221551' : '#colorNavyLight',
		background : (state.isSelected || state.isFocused) ? '#E8EAFF' : '#fff',
		padding    : '16px',
	}),
};


const InputForm: React.FC<InputFormProps> = ( {
	data,
	error = {}
} ) => {
	
	/**
	 * Define what type of input should be rendered
	 * @param param
	 * @return {*}
	 */
	const renderSwitch = ( param: FormField ) => {
		
		const isRequiredField = (param?.isRequired) ? { required : true } : {};
		
		switch ( param?.type ) {
			case "submit":
				return <Button className={ `${ param?.className } parent__${ param?.classParent } ` }
				               name={ param?.name }
				               type={ param?.type }
				               title={ param?.title }
				               defaultValue={ param?.defaultValue }
				               btnSize={ param?.btnSize }
				               disabled={ param?.disabled }
				/>;
			case "select":
				return <Select options={ param?.options }
				               styles={ customStyles }
				               className={ 'form-input__select-wrapper' }
				               name={ 'selected-tours' }
				               isMulti={ true }
				               isSearchable={ true }
				
				/>;
			
			
			case "text":
				return <input className={ `form-input__field ${ param?.className }` }
				              name={ param?.name }
				              type={ param?.type }
				              ref={ param?.ref as LegacyRef<HTMLInputElement> }
				              { ...isRequiredField }
				              defaultValue={ param?.defaultValue }
				              placeholder={ param?.placeholder }
				              onChange={ (param?.onChange) ? param?.onChange : () => {
				              } }
				              onBlur={ (param?.onBlur) ? param?.onBlur : () => {
				              } }
				/>;
			case "tel":
			case "number":
			case "email":
				return <input className={ `form-input__field ${ param?.className }` }
				              name={ param?.name }
				              type={ param?.type }
				              ref={ param?.ref as LegacyRef<HTMLInputElement> }
				              { ...isRequiredField }
				              defaultValue={ param?.defaultValue }
				              onChange={ (param?.onChange) ? param?.onChange : () => {
				              } }
				              placeholder={ param?.placeholder }
				              onBlur={ (param?.onBlur) ? param?.onBlur : () => {
				              } }
				/>;
			
			case "textarea":
				return <textarea className={ `form-input__field ${ param?.className }` }
				                 name={ param?.name }
				                 ref={ param?.ref as LegacyRef<HTMLTextAreaElement> }
				                 { ...isRequiredField }
				                 defaultValue={ param?.defaultValue }
					// @ts-ignore
					               onChange={ param.onChange }
					               placeholder={ param?.placeholder }
					// @ts-ignore
					               onBlur={ (param?.onBlur) ? param?.onBlur : () => {
					               } }
				/>;
			
			case "checkbox":
				return (
					<>
						<input id={ param?.id }
						       className={ `${ param?.className }` }
						       name={ param?.name }
						       ref={ param?.ref as LegacyRef<HTMLInputElement> }
						       type={ param?.type }
						       { ...isRequiredField }
						       value={ param?.value }
						       defaultChecked={ param?.checked }
							// @ts-ignore
							     onClick={ param?.change }
						/>
						<label htmlFor={ param?.id }
						       className={ `${ param?.checkboxLabelClass }__field-label` }
						       dangerouslySetInnerHTML={ { __html : param?.checkboxLabel || '' } }/>
					</>
				);
			
			case "radio":
				
				return (
					<>
						<input id={ param?.id }
						       className={ `${ param?.className }` }
						       name={ param?.name }
						       ref={ param?.ref as LegacyRef<HTMLInputElement> }
						       type={ param?.type }
						       value={ param?.value }
						       { ...isRequiredField }
						       defaultChecked={ param?.checked }
							// @ts-ignore
							     onClick={ param?.change }
						/>
						<label htmlFor={ param?.id }
						       className={ `${ param?.checkboxLabelClass }__field-label` }
						       dangerouslySetInnerHTML={ { __html : param?.checkboxLabel || '' } }/>
					</>
				);
			
			case "reset":
				return (
					<input id={ param?.id }
					       className={ `form-input__field ${ param?.className }` }
					       type={ param?.type }
					       ref={ param?.ref as LegacyRef<HTMLInputElement> }
					       value={ param?.title }
					       onClick={ param?.onClick }
					/>
				);
			
			case "file":
				return (
					<>
						<input id={ param?.id }
						       className={ `form-input__field ${ param?.className }` }
						       name={ param?.name }
						       ref={ param?.ref as LegacyRef<HTMLInputElement> }
						       type={ param?.type }
						       onChange={ param?.onChange }
						/>
						<label htmlFor={ param?.id }
						       className={ `${ param?.fileLabelClass }` }>
							{ param?.fileLabel }
						</label>
					
					</>
				);
			
			case "hidden":
				return (
					<input id={ param?.id }
					       type={ param?.type }
					       name={ param?.name }
					       value={ param?.value }
					       onChange={ param?.onChange }
					/>
				);
			
			default:
				return null;
		}
	};
	
	return (
		<InputWrapper className={ `${ data?.classParent } ${ data?.type } form-input ${ (error?.error) ? 'error' : '' }` }>
			{
				renderSwitch( data )
			}
			
			{
				error?.error &&
        <svg className={ 'form-input__error-icon' } width="16"
             height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M4.75244 0.49939H11.2549C13.7974 0.49939 15.4999 2.28439 15.4999 4.93939V11.0676C15.4999 13.7151 13.7974 15.4994 11.2549 15.4994H4.75244C2.20994 15.4994 0.499939 13.7151 0.499939 11.0676V4.93939C0.499939 2.28439 2.20994 0.49939 4.75244 0.49939ZM7.99244 5.79514C7.63994 5.79514 7.34744 5.50189 7.34744 5.14264C7.34744 4.77514 7.63994 4.48264 8.00744 4.48264C8.36744 4.48264 8.65994 4.77514 8.65994 5.14264C8.65994 5.50189 8.36744 5.79514 7.99244 5.79514ZM8.65244 10.8351C8.65244 11.1951 8.35994 11.4876 7.99244 11.4876C7.63244 11.4876 7.33994 11.1951 7.33994 10.8351V7.52014C7.33994 7.15939 7.63244 6.86014 7.99244 6.86014C8.35994 6.86014 8.65244 7.15939 8.65244 7.52014V10.8351Z"
                fill="#E4196E"/>
        </svg>
			}
			
			{
				error?.error && <p className="form-input__error">{ error?.errorText }</p>
			}
		</InputWrapper>
	);
};

export default InputForm;
