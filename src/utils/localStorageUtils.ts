export const getFromLocalStorage = <T>( key: string ): T | null => {
	const item = localStorage.getItem( key );
	return item ? JSON.parse( item ) : null;
};

export const saveToLocalStorage = <T>( key: string, data: T ): void => {
	localStorage.setItem( key, JSON.stringify( data ) );
};

export const removeFromLocalStorage = ( key: string ): void => {
	localStorage.removeItem( key );
};
