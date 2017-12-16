<template>
	<div :is="tagName" class="pagination" ref="main">
		<div class="container">
			<slot name="head-loading" v-if="loading<0">Loading...</slot>
			<slot name="1" :start="start1" :count="count" class="page" v-if="start0>start1"></slot>
			<slot name="0" :start="start0" :count="count" class="page"></slot>
			<slot name="1" :start="start1" :count="count" class="page" v-if="start1>start0"></slot>
			<slot name="tail-loading" v-if="loading>0">Loading...</slot>
			<slot name="ending" v-if="end">--- The End ---</slot>
		</div>
	</div>
</template>

<script>
	import List from './list';

	const lists= {};

	const component= {

		name: 'pagenation',

		props:
		{
			tagName:
			{
				type: String,
				default: 'div',
			},

			listId:
			{
				type: String,
				required: true,
			},

		},

		mounted()
		{
			this.list= lists[this.listId] || (lists[this.listId]= new List( this.listId, ));

			this.list.link( this, );

			this.loading= 0;
		},

		updated()
		{
			this.loading= 0;
		},

		beforeDestroy()
		{
			this.list.unlink();
		},

		data()
		{
			return {
				list: undefined,
				start0: 0,
				start1: 2,
				count: 2,
				loading: 1,
				end: false,
			};
		},

		methods:
		{
			changeSize( rate )
			{
				this.count= Math.ceil( this.count*rate, );

				if( this.start0 > this.start1 )
				{
					this.start0= this.start1+this.count;
				}
				else
				if( this.start1 > this.start0 )
				{
					this.start1= this.start0+this.count;
				}
			},

			loadNext()
			{
				if( this.loading ) return;

				this.loading= 1;

				if( this.start0 > this.start1 )
				{
					this.start1-=- 2*this.count;
				}
				else
				if( this.start1 > this.start0 )
				{
					this.start0-=- 2*this.count;
				}
			},

			loadPrev()
			{
				if( this.loading ) return;

				this.loading= -1;

				if( this.start0 > this.start1 )
				{
					this.start0-= 2*this.count;
				}
				else
				if( this.start1 > this.start0 )
				{
					this.start1-= 2*this.count;
				}
			},
		},

	};

	export default component;
</script>

<!-- layout -->
	<style>

	.pagination
	{ position:relative; overflow:hidden; }

	.container
	{ position:absolute; width:100%; }

	</style>
<!-- /layout -->

<!-- theme -->
	<style>

	</style>
<!-- /theme -->
