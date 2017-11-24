<template>
	<main id="main">
		<header></header>
		<work-pad></work-pad>
		<view-port></view-port>
		<help></help>
		<footer></footer>
	</main>
</template>

<script>
	import viewPort from './components/view-port';
	import workPad from './components/work-pad';
	import help from './components/help';

	export default {

		name: 'app',

		components:
		{
			viewPort,
			workPad,
			help,
		},
	};
</script>

<!-- layout -->
	<style>

		:root
		{ font-size:1vw; font-family:'Josefin Sans',sans-serif; font-weight:normal; }

		#main
		{ --header-height:5vh; --aside-width:30vw; --footer-height:3vw; }

		#main>header
		{ position:fixed; z-index:1; top:0; left:0; right:0; height:var(--header-height); }

		#main>aside
		{ position:fixed; z-index:2; top:var(--header-height); left:0; bottom:var(--footer-height); width:var(--aside-width); }

		#main>main
		{ position:fixed; z-index:0; top:var(--header-height); left:var(--aside-width); bottom:var(--footer-height); right:0; }

		#main>footer
		{ position:fixed; z-index:1; left:0; right:0; bottom:0; height:var(--footer-height); }

	</style>
<!-- /layout -->

<!-- theme -->
	<style>

		#main>header
		{ background-color:hsl(0,0%,100%); box-shadow:0 0 0.5vw 0 hsla(0,0%,0%,.125); }

		#main>aside
		{ background-color:hsl(0,0%,100%); box-shadow:0.5vw 0 0.5vw -0.5vw hsla(0,0%,0%,.125); }

		#main>footer
		{ background-color:hsl(0,0%,100%); box-shadow:0 0 0.5vw 0 hsla(0,0%,0%,.125); }

		#main>main
		{ background-color:hsl(0,0%,87.5%); }

	</style>
<!-- /theme -->
