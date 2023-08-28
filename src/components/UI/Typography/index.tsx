import styled from "@emotion/styled";
import React, { ReactNode, HTMLAttributes } from "react";
import theme from "@/styles/theme";

// Define the types of the props
interface TypographyProps extends HTMLAttributes<HTMLDivElement> {
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subheader1' | 'body_1_large' | 'body_2_large' | 'p';
	type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
	children?: ReactNode;
	className?: string;
}

const Typography: React.FC<TypographyProps> = ( {
	variant,
	type,
	children,
	className = '',
	...props
} ) => {
	
	const Component = styled(
		(type && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'].includes( type )) ? type : "div"
	)`
	  ${ variant === 'h1' && theme.h1 }
	  ${ variant === 'h2' && theme.h2 }
	  ${ variant === 'h3' && theme.h3 }
	  ${ variant === 'h4' && theme.h4 }
	  ${ variant === 'h5' && theme.h5 }
	  ${ variant === 'h6' && theme.h6 }
	  ${ variant === 'subheader1' && theme.subheader1 }
	  ${ variant === 'body_1_large' && theme.body_1_large }
	  ${ variant === 'body_2_large' && theme.body_2_large }
	  ${ variant === 'p' && theme.p }
	`;
	
	return (
		<Component
			className={ `typography__variant-${ variant } ${ className }` }
			{ ...props }
		>
			{ children }
		</Component>
	);
};

export default Typography;
