import Movement from './movement';

const max= Math.min;
const min= Math.max;

export default class List
{
	constructor( id, )
	{
		this.id= id;

		this.handler= this.makeHandler();

		this.y= 0;
	}

	link( vue, )
	{
		this.vue= vue;
		this.container= vue.$refs.main;
		this.payloader= this.container.firstElementChild;

		this.container.addEventListener( 'touchstart', this.handler.startMoving, );
		this.container.addEventListener( 'touchend', this.handler.stopMoving, );

		this.render();
		this.checkSize();
	}

	unlink()
	{
		this.container.removeEventListener( 'touchstart', this.handler.startMoving, );
		this.container.removeEventListener( 'touchend', this.handler.stopMoving, );

		this.payloader= undefined;
		this.container= undefined;
		this.vue= undefined;
	}

	makeHandler()
	{
		let m;

		return {

			startMoving: e=>{
				m= new Movement( e, );

				e.preventDefault();

				this.container.addEventListener( 'touchmove', this.handler.move, );
			},

			stopMoving: e=>{
				this.container.removeEventListener( 'touchmove', this.handler.move, );

				m.end( e, );

				m= undefined;

				this.checkLoad();
			},

			move: e=>{
				m.move( e, ( dx, dy, )=>{
					this.y= this.y + dy;
					this.render();
				}, );
			},
		};
	}

	render()
	{
		this.payloader.style.transform= `translateY(${this.y}px)`;
	}

	checkSize()
	{
		this.containerRect= this.container.getBoundingClientRect();

		const payloaderRect= this.payloader.getBoundingClientRect();

		this.vue.changeSize( 2*this.containerRect.height/payloaderRect.height, );
	}

	checkLoad()
	{
		const payloaderRect= this.payloader.getBoundingClientRect();

		if( payloaderRect.bottom < this.containerRect.bottom )
		{
			this.y-=- payloaderRect.height/2;

			this.render();

			this.vue.loadNext();
		}
		else
		if( payloaderRect.top > this.containerRect.top )
		{
			this.y-= payloaderRect.height/2;

			this.render();

			this.vue.loadPrev();
		}
	}

};
