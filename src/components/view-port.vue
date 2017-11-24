<template>
	<main ref="main">
		<resizable class="canvas" :style="canvasPosition">
			<svg :viewBox="viewBox"></svg>
		</resizable>
	</main>
</template>

<script>
	import graph from '@/graph';
	import Matrix from '@/matrix';
	import { cos, sin, PI, } from '@/math';
	import { mousedown, mousemove, mouseup, } from '@/mouse-or-touch';
	import { listen, unlisten, } from '@/key-map';
	import resizable from './tools/resizable';

	export default {

		name: 'view-port',

		components:
		{
			resizable,
		},

		computed:
		{
			viewBox()
			{
				return `0 0 ${this.graph.canvas.width} ${this.graph.canvas.height}`;
			},

			canvasPosition()
			{
				return {
					transform: `matrix(${this.matrix.data[0][0]},${this.matrix.data[1][0]},${this.matrix.data[0][1]},${this.matrix.data[1][1]},${this.matrix.data[0][2]},${this.matrix.data[1][2]})`,
				};
			},
		},

		data()
		{
			return {

				graph,

				width:0,
				height:0,

				matrix: new Matrix( 3, ),

				viewHandle:
				{
					origin:
					{
						x:0,
						y:0,
					},

					transform: ( matrix, before=true, )=>{
						this.matrix= (
							before
							? Matrix.multiply( new Matrix( 3, matrix, ), this.matrix, )
							: Matrix.multiply( this.matrix, new Matrix( 3, matrix, ), )
						);

						return true;
					},


					move: ( dx, dy, )=>{
						return this.viewHandle.transform(
							[
								[  1,  0, dx, ],
								[  0,  1, dy, ],
								[  0,  0,  1, ],
							],
						);
					},

					scale: ( times, ox=0, oy=0, )=>{

						return this.viewHandle.transform(
							[
								[ times,     0, ox-ox*times, ],
								[     0, times, oy-oy*times, ],
								[     0,     0,           1, ],
							],
						);

						return true;
					},

					rotate: ( angle )=>{

						return this.viewHandle.transform(
							[
								[ +cos( angle, ), +sin( angle, ), 0, ],
								[ -sin( angle, ), +cos( angle, ), 0, ],
								[              0,              0, 1, ],
							],
						);

						return true;

						return true;
					},

					reset: ()=>{
						this.matrix= new Matrix( 3, );
					},

					keyMoveLeft:  e=> this.viewHandle.move( +10,   0, ),
					keyMoveRight: e=> this.viewHandle.move( -10,   0, ),
					keyMoveUp:    e=> this.viewHandle.move(   0, +10, ),
					keyMoveDown:  e=> this.viewHandle.move(   0, -10, ),

					keyRotateLeft:  e=> this.viewHandle.rotate( +PI/72, ),
					keyRotateRight: e=> this.viewHandle.rotate( -PI/72, ),

					keyScaleUp:     e=> this.viewHandle.scale( 1.02,   ),
					keyScaleDown:   e=> this.viewHandle.scale( 1/1.02, ),

					startMouseMoving: e=>{
						if( 4!==e.buttons ) return;

						[ this.viewHandle.origin.x, this.viewHandle.origin.y, ]= [ e.clientX, e.clientY, ];

						document.addEventListener( mousemove, this.viewHandle.mouseMove, );
					},

					mouseMove: e=>{
						this.viewHandle.move( e.clientX - this.viewHandle.origin.x, e.clientY - this.viewHandle.origin.y, );

						[ this.viewHandle.origin.x, this.viewHandle.origin.y, ]= [ e.clientX, e.clientY, ];
					},

					stopMouseMoving: ()=>{
						document.removeEventListener( mousemove, this.viewHandle.mouseMove, );
					},

					wheelScale: e=>{
						this.viewHandle.scale(
							(
								e.deltaY<0
								? 1/1.02
								: 1.02
							),
							e.offsetX - this.width/2,
							e.offsetY - this.height/2,
						)
					},

					windowResize: e=>{
						this.width= this.$refs.main.firstElementChild.clientWidth;
						this.height= this.$refs.main.firstElementChild.clientHeight;
					},
				},
			};
		},

		mounted()
		{
			listen( 'ArrowLeft_4',  this.viewHandle.keyMoveLeft,  );
			listen( 'ArrowRight_4', this.viewHandle.keyMoveRight, );
			listen( 'ArrowUp_4',    this.viewHandle.keyMoveUp,    );
			listen( 'ArrowDown_4',  this.viewHandle.keyMoveDown,  );

			listen( 'ArrowLeft_5',  this.viewHandle.keyRotateLeft,  );
			listen( 'ArrowRight_5', this.viewHandle.keyRotateRight, );
			listen( 'ArrowUp_5',    this.viewHandle.keyScaleUp,     );
			listen( 'ArrowDown_5',  this.viewHandle.keyScaleDown,   );

			listen( 'Escape_4',     this.viewHandle.reset, );

			this.$refs.main.addEventListener( 'wheel', this.viewHandle.wheelScale, );
			this.$refs.main.addEventListener( 'dblclick', this.viewHandle.reset, );
			this.$refs.main.addEventListener( mousedown, this.viewHandle.startMouseMoving, );
			document.addEventListener( mouseup, this.viewHandle.stopMouseMoving, );
			window.addEventListener( 'resize', this.viewHandle.windowResize, );
			this.viewHandle.windowResize();
		},

		beforeDestroy()
		{
			unlisten( 'ArrowLeft_4',  this.viewHandle.keyMoveLeft,  );
			unlisten( 'ArrowRight_4', this.viewHandle.keyMoveRight, );
			unlisten( 'ArrowUp_4',    this.viewHandle.keyMoveUp,    );
			unlisten( 'ArrowDown_4',  this.viewHandle.keyMoveDown,  );

			unlisten( 'ArrowLeft_5',  this.viewHandle.keyRotateLeft,  );
			unlisten( 'ArrowRight_5', this.viewHandle.keyRotateRight, );
			unlisten( 'ArrowUp_5',    this.viewHandle.keyScaleUp,     );
			unlisten( 'ArrowDown_5',  this.viewHandle.keyScaleDown,   );

			unlisten( 'Escape_4',     this.viewHandle.reset, );

			this.$refs.main.removeEventListener( 'wheel', this.viewHandle.wheelScale, );
			this.$refs.main.removeEventListener( 'dblclick', this.viewHandle.reset, );
			this.$refs.main.removeEventListener( mousedown, this.viewHandle.startMouseMoving, );
			document.removeEventListener( mousemove, this.viewHandle.mouseMove, );
			document.removeEventListener( mouseup, this.viewHandle.stopMouseMoving, );
			window.removeEventListener( 'resize', this.viewHandle.windowResize, );
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
		{ position:absolute; width:100%; }

		#main>main>.canvas>svg
		{ display:block; }

	</style>
<!-- /layout -->

<!-- theme -->
	<style>

		#main>main>.canvas
		{ --grid-color:hsl(180,20%,94%); }

		#main>main>.canvas
		{
			box-shadow:0 .2vh .5vw 0 hsla(0,0%,0%,.25);
			background-image: linear-gradient(45deg,var(--grid-color) 25%,transparent 25%,transparent 75%,var(--grid-color) 75%),linear-gradient(45deg,var(--grid-color) 25%,transparent 25%,transparent 75%,var(--grid-color) 75%);
			background-size: 2em 2em;
			background-position: 0 0, 1em 1em;
		}

		#main>main>.canvas>svg
		{ background-color:hsl(0,0%,100%); }

	</style>
<!-- /theme -->
