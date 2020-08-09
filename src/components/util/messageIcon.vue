<template>
	<div class="pa-8 lighten-4 text-center grey--text">

		<h1><v-icon size="220px" color="grey">mdi-package-variant</v-icon></h1>
		<h1>{{message || "Empty"}}</h1>

	</div>
</template>

<script>
	export default {

		name: "messageIcon",

		props: ["message"]

	}
</script>

<style></style>
