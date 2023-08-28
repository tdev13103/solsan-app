import React from 'react';

interface Svg {
	className?: string
	style?: {
		stroke?: string
		fill?: string
	}
	svg: string | { sourceUrl: string, title: string }
}

const Svg = ( {
	className,
	style,
	svg,
}: Svg ) => {
	return (<span className={ className } style={ style } dangerouslySetInnerHTML={ { __html : svg } }/>);
};

export default Svg;