<template>
	<div>
		<v-app id="app">

			<navigation />

			<v-container>
				<div class="py-8"></div>
				<router-view />
			</v-container>



		</v-app>
	</div>
</template>

<script>

	import navigation from "./components/navigation"
	import {mapActions} from "vuex"

	export default {
		
		name: "app",

		components: {
			navigation
		},

		methods: mapActions(["getCart", "checkAuth"]),

		created() {
			this.getCart()
			this.checkAuth()
		}
	}
</script>

<style>
	.cursor {
		cursor: pointer;
	}

	.d-inline {
		display: inline !important;
	}

	.btn {
		padding: 2px 6px;
		border-radius: 3px;
		background: #ccc;
		margin: 1px;
	}

	.btn-group {
		display: inline;
	}

</style>
