const keyMap= {};
const chanConnection= new WeakMap();

function keyPress( key, modifier )
{
	let action= keyMap[z(`${key}_${modifier}`)];

	if(!( action )) return;

	let result;

	do{
		result= action();

		if( result ) return result;
	}
	while( chanConnection.has( action ) && (action= chanConnection.get( action )) );

	return result;
}

export function boot()
{
	document.addEventListener( 'keydown', e=>{

		const modifier= (e.shiftKey&&1)|(e.ctrlKey&&2)|(e.altKey&&4)|(e.metaKey&&8);

		keyPress( e.key, modifier ) && e.preventDefault();
	} );
};

export function listen( keyGroup, callback )
{
	const original= keyMap[keyGroup];

	if( original )
	{
		chanConnection.set( callback, original );
	}

	keyMap[keyGroup]= callback;
};

export function unlisten( keyGroup, callback )
{
	let listener= keyMap[keyGroup]

	if( callback===listener )
	{
		if( chanConnection.has( callback ) )
		{
			keyMap[keyGroup]= chanConnection.get( callback );

			chanConnection.delete( callback );
		}
		else
		{
			delete keyMap[keyGroup];
		}

		return;
	}

	while( listener!==callback && chanConnection.has( listener ) )
	{
		listener= listener.kChainNext;
	}

	if( chanConnection.has( callback ) )
	{
		chanConnection.set( listener, chanConnection.get( callback ) );

		chanConnection.delete( callback );
	}
	else
	{
		chanConnection.delete(  )
	}
};

export function comment( keyGroup )
{
	const [ key, modifierCode ]= keyGroup.split( '_' );

	return [
		(+modifierCode)&&8? 'Meta + '  :'',
		(+modifierCode)&&4? 'Alt  + '  :'',
		(+modifierCode)&&2? 'Ctrl + '  :'',
		(+modifierCode)&&1? 'Shift + ' :'',
		key
	].join( '' );
};
