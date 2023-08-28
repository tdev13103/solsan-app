import React, { FC, ReactNode } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import Typography from "@/components/UI/Typography";

interface IMenuItemProps {
	url: string;
	title: string;
	className?: string;
	children?: ReactNode;
	external_reference?: boolean;
	eventClickMenu?: () => void;
	closeWholeMenuHandler?: () => void;
}

const MenuItem: FC<IMenuItemProps> = ( {
	url,
	title,
	className = '',
	children,
	external_reference = false,
	eventClickMenu,
	closeWholeMenuHandler = () => {}
} ) => {
	const pathname = usePathname();
	let checkClass = className.includes( 'dummy-link' );
	
	const activeLink = (pathname === url || pathname + '/' === url) ? "active" : "";
	
	const closeMenuHandler = () => {
		closeWholeMenuHandler && closeWholeMenuHandler();
	}
	
	return (
		<>
			{
				!checkClass && external_reference &&
        <li className={ className }>
					{
						children &&
            <span className={ `menu-parent__btn-switcher` }
                  onClick={ () => {
							      eventClickMenu && eventClickMenu();
						      } }></span>
					}
          
          <Link href={ url }
                className={ `external-link ${ activeLink }` }
                onClick={ closeMenuHandler }>
            <Typography className={ '' } variant={ 'body_1_large' } type={ 'span' }>
							{ title }
            </Typography>
          </Link>
					{ children }
        </li>
			}
			
			{
				!checkClass && !external_reference &&
        <li className={ className } onClick={ () => {
					eventClickMenu && eventClickMenu();
				} }>
          <Link href={ url }
                onClick={ closeMenuHandler }
                className={ `${ pathname === url ? "active" : "" }` }>
            <Typography className={ '' } variant={ 'body_1_large' } type={ 'span' }>
							{ title }
            </Typography>
          </Link>
					{ children }
        </li>
			}
		</>
	)
}

export default MenuItem;
