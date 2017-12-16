export default class Movement
{
	constructor( e, )
	{
		this.target= e.target;
		this.moved= false;
		this.initTouches( e.touches, );
	}

	initTouches( touches, )
	{
		this.touches= {};

		Array.from( touches, ).forEach( touch=>{
			this.touches[touch.identifier]= {
				x: touch.screenX,
				y: touch.screenY,
				a: touch.rotationAngle,
			};
		}, );
	}

	end( e, )
	{
		if( !this.moved && this.target === e.target )
		{
			this.target.dispatchEvent( new Event( 'click', ), );
		}
	}

	move( e, callback, )
	{
		this.moved= true;

		let dx= 0;
		let dy= 0;
		let da= 0;

		Array.from( e.touches, ).forEach( touch=>{
			const origin= this.touches[touch.identifier];

			dx-= origin.x - touch.screenX;
			dy-= origin.y - touch.screenY;
			da-= origin.a - touch.rotationAngle;
			origin.x= touch.screenX;
			origin.y= touch.screenY;
			origin.a= touch.rotationAngle;
		}, );

		callback( dx, dy, da, );
	}
}
