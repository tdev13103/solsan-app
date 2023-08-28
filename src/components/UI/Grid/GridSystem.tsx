import styled from "@emotion/styled";
import React from 'react';
import theme from "@/styles/theme";

interface GridSystemProps {
	variant?: 'grid-fullwidth' | 'grid-4' | 'grid-3' | 'grid-2' | 'grid-2-1' | 'grid-1-2';
	children?: React.ReactNode;
	className?: string;
	
	[key: string]: any;  // for any additional props
}

const GridSystem: React.FC<GridSystemProps> = ( {
	variant = 'grid-fullwidth',
	children,
	className = '',
	...props
} ) => {
	
	const Component = styled.div`
	  ${ variant === 'grid-fullwidth' && theme.grid['grid-fullwidth'] }
	  ${ variant === 'grid-4' && theme.grid['grid-4'] }
	  ${ variant === 'grid-3' && theme.grid['grid-3'] }
	  ${ variant === 'grid-2' && theme.grid['grid-2'] }
	  ${ variant === 'grid-2-1' && theme.grid['grid-2-1'] }
	  ${ variant === 'grid-1-2' && theme.grid['grid-1-2'] }
	`;
	
	return (
		<Component
			className={ `grid-system__variant ${ variant } ${ className }` }
			{ ...props }
		>
			{ children }
		</Component>
	);
};

export default GridSystem;
