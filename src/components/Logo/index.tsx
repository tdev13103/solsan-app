import Link from "next/link";
import React from 'react';
import Image from 'next/image'

interface LogoProps {
	logo: string;
	hrefLink?: string;
	className?: string;
	width: number | `${ number }`; // Can be number or string to allow both pixel and relative units
	height: number | `${ number }`; // Same as width
}

const Logo: React.FC<LogoProps> = ( {
	logo,
	hrefLink = '',
	className = '',
	width,
	height
} ) => {
	return (
		<Link href={ hrefLink } className={ className } style={ { display : "inline-flex" } }>
			{ logo && width && height &&
        <Image
          src={ logo }
          alt="site logo"
          width={ width }
          height={ height }
          blurDataURL="URL"
          placeholder="blur"
        />
			}
		</Link>
	);
}

export default Logo;
