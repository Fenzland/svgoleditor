<template>
	<div :class="{'key-button':true,'pressing':pressing}" @click="press">
		<slot></slot>
		<div class="key-comment">{{comment}}</div>
	</div>
</template>

<script>
	import { comment as keyComment, listen, unlisten, } from '@/key-map';

	export default {

		name: 'key-button',

		props:
		{
			keyGroup:
			{
				type: String,
				required: true,
			},
		},

		computed:
		{
			comment()
			{
				return keyComment( this.keyGroup );
			},
		},

		data()
		{
			return {
				press:()=> {
					this.pressing= true;
					this.$emit( 'press' );
					wait( 200 ).then( ()=> this.pressing= false );
				},
				pressing: false,
			};
		},

		mounted()
		{
			listen( this.keyGroup, this.press );
		},

		beforeDestroy()
		{
			unlisten( this.keyGroup, this.press );
		},

	};
</script>

<!-- layout -->
	<style>

		.key-button
		{ display:inline-block; padding:0.5em 1em; border:1px solid; line-height:1.6; text-align:center; }

		.key-button>.key-comment
		{ font-size:0.8em; width:fit-content; margin:auto; padding:0 0.5em; }

	</style>
<!-- /layout -->

<!-- theme -->
	<style>

		.key-button
		{ border-radius:0.25em; border-color:hsl(0,0%,60%); }

		.key-button>.key-comment
		{ border-radius:0.25em; background-color:hsl(200,80%,80%); }

	</style>
<!-- /theme -->

<!-- animation -->
	<style>
		.key-button
		,
		.key-button>.key-comment
		{ transition:color 200ms, background-color 200ms; }

		.key-button.pressing
		,
		.key-button.pressing>.key-comment
		{ background-color:hsl(0,0%,0%); color:hsl(0,0%,100%); }

	</style>
<!-- /animation -->
