<template>
	<div :is="tag" class="masked-layer">
		<slot></slot>
	</div>
</template>

<script>
	export default {

		name: '',

		props:
		{
			tag:
			{
				type: String,
				default: 'div',
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

		.masked-layer
		{ position:fixed; z-index:8; top:0; left:0; right:0; bottom:0; margin:auto; width:fit-content; height:fit-content; padding:2em; }

		.masked-layer::before
		{ content:''; display:block; position:fixed; z-index:-1; top:0; left:0; right:0; bottom:0; }

		.masked-layer::after
		{ content:''; display:block; position:absolute; z-index:-1; top:0; left:0; right:0; bottom:0; }

	</style>
<!-- /layout -->

<!-- theme -->
	<style>

		.masked-layer
		{
			--masked-bg-alpha: 1.0;
			--mask-bg-alpha:   0.5;
			--masked-bg-hue: 0;
			--mask-bg-hue:   0;
			--masked-bg-saturation: 000%;
			--mask-bg-saturation:   000%;
			--masked-bg-luminosity: 100%;
			--mask-bg-luminosity:   000%;
			--masked-bg-color: hsla(var(--masked-bg-hue),var(--masked-bg-saturation),var(--masked-bg-luminosity),var(--masked-bg-alpha));
			--mask-bg-color:   hsla(var(--mask-bg-hue),var(--mask-bg-saturation),var(--mask-bg-luminosity),var(--mask-bg-alpha));

			--fillet: 1em;

			--float-z: 1;
		}

		.masked-layer
		{ border-radius:var(--fillet); box-shadow:0 calc(var(--float-z)*var(--float-z)*0.2vh) calc(var(--float-z)*0.5vw) hsla(0,0%,0%,.25); }

		.masked-layer::before
		{ background-color:var(--mask-bg-color); }

		.masked-layer::after
		{ border-radius:var(--fillet); background-color:var(--masked-bg-color); }

	</style>
<!-- /theme -->
