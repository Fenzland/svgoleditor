<template>
	<aside class="work-pad">
		<key-button key-group="c_0" @press="creating= true">Create</key-button>
		<footer>
			<creator v-if="creating" @create="create" @cancel="creating= false"></creator>
		</footer>
	</aside>
</template>

<script>
	import keyButton from './key-button';
	import creator from './creator';

	export default {

		name: 'work-pad',

		components:
		{
			keyButton,
			creator,
		},

		methods:
		{
			create( element )
			{
				this.creating= false;
				z( 'creating a '+element )
			}
		},

		data()
		{
			return {
				creating: false,
			};
		},

	};
</script>

<!-- layout -->
	<style>
		.work-pad
		{ padding:1em; }
	</style>
<!-- /layout -->

<!-- theme -->
	<style>

	</style>
<!-- /theme -->
