<template>
	<div class="creator">
		<key-button key-group="p_0" @press="create( 'Path' )">Path</key-button>
		<key-button key-group="l_0" @press="create( 'Line' )">Line</key-button>
		<key-button key-group="r_0" @press="create( 'Rect' )">Rect</key-button>
		<key-button key-group="c_0" @press="create( 'Circle' )">Circle</key-button>
		<key-button key-group="e_0" @press="create( 'Ellipse' )">Ellipse</key-button>
		<key-button key-group="Escape_0" @press="cancel">cancel</key-button>
	</div>
</template>

<script>
	import keyButton from './key-button';

	export default {

		name: 'creator',

		components:
		{
			keyButton,
		},

		methods:
		{
			create( element )
			{
				this.$emit( 'create', element );
			},

			cancel()
			{
				this.$emit( 'cancel' );
			},
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

		.creator
		{ position:fixed; z-index:8; top:0; left:0; right:0; bottom:0; margin:auto; width:fit-content; height:fit-content; padding:2em; }

		.creator::before
		{ content:''; display:block; position:fixed; z-index:-1; top:0; left:0; right:0; bottom:0; }

		.creator::after
		{ content:''; display:block; position:absolute; z-index:-1; top:0; left:0; right:0; bottom:0; }


	</style>
<!-- /layout -->

<!-- theme -->
	<style>

		.creator
		{ box-shadow:0 0.2vh 0.5vw hsla(0,0%,0%,.25) }

		.creator::before
		{ background-color:hsla(0,0%,0%,0.5); }

		.creator::after
		{ border-radius:1em; background-color:hsl(0,0%,100%); }

	</style>
<!-- /theme -->
