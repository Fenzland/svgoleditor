<template>
	<div class="resizable">
		<slot class="main"></slot>
		<div class="resize-handle left-top"></div>
		<div class="resize-handle right-bottom"></div>
	</div>
</template>

<script>
	export default {

		name: '',

		data()
		{
			return {
			};
		},

	};
</script>

<!-- layout -->
	<style>

		.resizable
		{}

		.resizable>:not(.resize-handle)
		{ position:relative; z-index:1; }

		.resizable>.resize-handle
		{ --size:1em; }

		.resizable>.resize-handle
		{ position:absolute; width:calc(var(--size)*8); height:calc(var(--size)*8);z-index:0; }

		.resizable>.resize-handle.left-top
		{
			border-radius:
				calc(var(--size)/4) calc(var(--size)*7) 0 calc(var(--size)*1)/calc(var(--size)/4) calc(var(--size)*1) 0 calc(var(--size)*7)
			;
			left:calc(var(--size)*-1);
			top:calc(var(--size)*-1);
			clip-path: polygon(-20% -20%, 100% 0, 100% 12.5%, 12.5% 12.5%, 12.5% 100%, 0% 100% );
		}

		.resizable>.resize-handle.right-bottom
		{
			border-radius:
				0 calc(var(--size)*1) calc(var(--size)/4) calc(var(--size)*7)/0 calc(var(--size)*7) calc(var(--size)/4) calc(var(--size)*1)
			;
			right:calc(var(--size)*-1);
			bottom:calc(var(--size)*-1);
			clip-path: polygon(120% 120%, 0 100%, 0 87.5%, 87.5% 87.5%, 87.5% 0, 100% 0 );
		}

	</style>
<!-- /layout -->

<!-- theme -->
	<style>

		.resize-handle
		{ background-color:hsl(160,60%,75%); box-shadow:0 .1vh .25vw 0 hsla(0,0%,0%,.5); }

		.resize-handle
		{ transition: box-shadow 200ms; }

		.resize-handle:hover
		,
		.resize-handle:active
		,
		.resize-handle.active
		{ box-shadow:0 .3vh .75vw 0 hsla(0,0%,0%,.5); }

	</style>
<!-- /theme -->
