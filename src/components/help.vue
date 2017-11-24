<template>
	<masked-layer tag="article" class="helps">
		<h1>
			SVGOLEditor is a free svg editor
		</h1>
		<p>
			You can work with Keyboard only or Mouse only or both.
		</p>
		<h2>
			Keyboard only
			<small>
				(recommended)
			</small>
		</h2>
		<p>
			<kbd>
				F1
			</kbd>
			<span>
				Open this help.
			</span>
		</p>
		<p>
			<kbd>
				Alt+Arrows
			</kbd>
			<span>
				Move the viewport.
			</span>
		</p>
		<p>
			<kbd>
				Alt+Shift+(Up/Down)
			</kbd>
			<span>
				Zoom the viewport.
			</span>
		</p>
		<p>
			<kbd>
				Alt+Shift+(Right/Left)
			</kbd>
			<span>
				Rotate the viewport.
			</span>
		</p>
		<p>
			<kbd>
				Alt+Esc
			</kbd>
			<span>
				Reset the viewport.
			</span>
		</p>
		<p>
			<kbd>
				Ctrl+Arrows
			</kbd>
			<span>
				Resize the canvas on the right-bottom corner.
			</span>
		</p>
		<p>
			<kbd>
				Ctrl+Shift+Arrows
			</kbd>
			<span>
				Resize the canvas on the left-top corner.
			</span>
		</p>
		<h2>
			Mouse only
		</h2>
	</masked-layer>
</template>

<script>
	import maskedLayer from './tools/masked-layer';

	export default {

		name: 'help',

		components:
		{
			maskedLayer,
		},
		data()
		{
			return {
			};
		},

	};
</script>

<!-- layout -->
	<style>

		article.helps
		{ width:80vw; height:80vh; }

		article.helps:not(.show)
		{ visibility:hidden; }

	</style>
<!-- /layout -->

<!-- theme -->
	<style>

		article.helps
		{ --fillet:0.5em; --masked-bg-alpha:0.62; --float-z:1; }

	</style>
<!-- /theme -->
