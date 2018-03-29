<style lang="scss">
	.product-list{
		width: 100%;
	}
</style>
<template>
	<div class="product-list">
		<template v-for="p in product">
			<product-item :product="p"></product-item>
		</template>
	</div>
</template>
<script>
import ProductItem from './product-item.vue';
	export default{
		name:"ProductList",
		props:['product'],
		components: {
			'product-item': ProductItem
		}
	}
</script>