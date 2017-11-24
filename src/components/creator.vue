<template>
	<masked-layer>
		<key-button key-group="p_0" @press="create( 'Path' )">Path</key-button>
		<key-button key-group="l_0" @press="create( 'Line' )">Line</key-button>
		<key-button key-group="r_0" @press="create( 'Rect' )">Rect</key-button>
		<key-button key-group="c_0" @press="create( 'Circle' )">Circle</key-button>
		<key-button key-group="e_0" @press="create( 'Ellipse' )">Ellipse</key-button>
		<key-button key-group="Escape_0" @press="cancel">cancel</key-button>
	</masked-layer>
</template>

<script>
	import keyButton from './key-button';
	import maskedLayer from './tools/masked-layer';

	export default {

		name: 'creator',

		components:
		{
			keyButton,
			maskedLayer,
		},

		methods:
		{
			create( element )
			{
				this.$emit( 'create', element, );
			},

			cancel()
			{
				this.$emit( 'cancel', );
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

	</style>
<!-- /layout -->

<!-- theme -->
	<style>

	</style>
<!-- /theme -->
