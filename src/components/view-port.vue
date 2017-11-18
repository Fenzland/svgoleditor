<template>
	<main ref="main">
		<svg class="canvas" :viewBox="viewBox" :style="canvasPosition"></svg>
	</main>
</template>

<script>
	import graph from '@/graph';
	import { mousedown, mousemove, mouseup, } from '@/mouse-or-touch';

	export default {

		name: 'view-port',

		computed:
		{
			viewBox()
			{
				return `0 0 ${this.graph.canvas.width} ${this.graph.canvas.height}`;
			},

			canvasPosition()
			{
				return {
					left:`${this.viewPort.x}px`,
					top:`${this.viewPort.y}px`,
					width:`${100*this.viewPort.s}%`,
				};
			},
		},

		data()
		{
			return {

				graph,

				viewPort:
				{
					x: 0,
					y: 0,
					s: 1,
				},

				viewHandle:
				{
					origin:
					{
						x:0,
						y:0,
					},

					start: e=>{
						if( 4!==e.buttons ) return;

						[ this.viewHandle.origin.x, this.viewHandle.origin.y, ]= [ e.clientX, e.clientY, ];

						document.addEventListener( mousemove, this.viewHandle.mouseMove, );
					},

					mouseMove: e=>{
						this.viewHandle.move( e.clientX - this.viewHandle.origin.x, e.clientY - this.viewHandle.origin.y, );

						[ this.viewHandle.origin.x, this.viewHandle.origin.y, ]= [ e.clientX, e.clientY, ];
					},

					move: ( dx, dy, )=>{
						this.viewPort.x+= dx;
						this.viewPort.y+= dy;
					},

					end: ()=>{
						document.removeEventListener( mousemove, this.viewHandle.mouseMove, );
					},

					wheelScale: e=>{
						this.viewHandle.scale( e.deltaY<0, e.offsetX, e.offsetY, )
					},

					scale: ( scaleUp, ox, oy, )=>{

						const r= 1.02;

						if( scaleUp )
						{
							this.viewPort.s*= r;
							this.viewPort.x= (this.viewPort.x - ox)*r + ox;
							this.viewPort.y= (this.viewPort.y - oy)*r + oy;
						}
						else
						{
							this.viewPort.s/= r;
							this.viewPort.x= (this.viewPort.x - ox)/r + ox;
							this.viewPort.y= (this.viewPort.y - oy)/r + oy;
						}
					},

					reset: ()=>{
						this.viewPort.x= 0;
						this.viewPort.y= 0;
						this.viewPort.s= 1;
					},
				},
			};
		},

		mounted()
		{
			this.$refs.main.addEventListener( 'wheel', this.viewHandle.wheelScale, );
			this.$refs.main.addEventListener( 'dblclick', this.viewHandle.reset, );
			this.$refs.main.addEventListener( mousedown, this.viewHandle.start, );
			document.addEventListener( mouseup, this.viewHandle.end, );
		},

		beforeDestroy()
		{
			this.$refs.main.removeEventListener( 'wheel', this.viewHandle.wheelScale, );
			this.$refs.main.removeEventListener( 'dblclick', this.viewHandle.reset, );
			this.$refs.main.removeEventListener( mousedown, this.viewHandle.start, );
			document.removeEventListener( mousemove, this.viewHandle.mouseMove, );
			document.removeEventListener( mouseup, this.viewHandle.end, );
		},

	};
</script>

<!-- layout -->
	<style>

		#main>main
		{
			overflow:visible;
			border-style: solid;
			border-width:
				calc((100vh - var(--header-height) - var(--footer-height))*0.03)
				calc((100vw - var(--aside-width))*0.03)
			;
			border-color: transparent;
		}

		#main>main>.canvas
		{ position:absolute; }

	</style>
<!-- /layout -->

<!-- theme -->
	<style>

		#main>main>.canvas
		{ background-color:hsl(0,0%,100%); box-shadow:0 0 .5vw 0 hsla(0,0%,0%,.25); }

	</style>
<!-- /theme -->
