'use client'

import React, { useState } from "react";
import MenuItem from "@/components/MenuItem";
import { modifyLinks } from "@/helpers/index";

interface HelperComponentsProps {
	menu?: MenuLink[];
	customClass?: string;
	closeMenu?: () => void;
}

interface MenuLink {
	link: string;
	label: string;
	links?: MenuLink[];
}

interface MenuOpenedState {
	[key: string]: boolean;
}

const HelperComponents: React.FC<HelperComponentsProps> = ( {
	menu,
	customClass = '',
	closeMenu
} ) => {
	if ( menu === undefined || !Object.keys( menu ).length ) return '';
	
	
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [menuOpenedState, setMenuOpenedState] = useState<MenuOpenedState>( {} );
	
	
	const eventClickMenu = ( key: string ) => {
		setMenuOpenedState( prevState => ({
			...prevState,
			[key] : !prevState[key]
		}) );
	};
	
	return menu?.map( ( item, index ) => {
		
		let children = item?.links;
		const modifyLink = modifyLinks( item?.link );
		let checkUrl = item?.link?.includes( process.env.NEXT_PUBLIC_SITE_URL ?? '' );
		
		if ( typeof children === 'object' && Object.keys( children ).length ) {
			
			return (
				<MenuItem url={ modifyLink }
				          external_reference={ checkUrl }
				          title={ item?.label }
				          key={ `el-${ index }-${ item?.label }` }
				          eventClickMenu={ () => eventClickMenu( item?.label ) }
				          className={ `${customClass}__item-have-children ${ menuOpenedState[item?.label]
				                                                          ? 'opened' : '' }` }
				>
					<div className={ `${customClass}__sub-menu-wrap` }>
						{
							item?.links?.length &&
              <ul className={ `${customClass}__sub-menu-list` }>
								{
									item?.links?.map( ( link, key: number ) => {
										const modifySubLink = modifyLinks( link?.link );
										let checkSubUrl = link?.link?.includes( process.env.NEXT_PUBLIC_SITE_URL ?? '' );
										return <MenuItem className={ `${customClass}__sub-menu-list-item` }
										                 external_reference={ checkSubUrl }
										                 url={ modifySubLink }
										                 title={ link?.label }
										                 key={ key }/>;
									} )
								}
              </ul>
						}
					
					</div>
				</MenuItem>
			);
		}
		
		return <MenuItem className={ `${ customClass }__item` }
		                 url={ item?.link }
		                 title={ item?.label }
		                 key={ `el-${ item?.label }` }
		                 closeWholeMenuHandler={ closeMenu }
		                 external_reference={ checkUrl }
		/>;
		
	} );
};

export default HelperComponents