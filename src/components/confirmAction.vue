<template>
	<div class="red grey py-4 px-4">
		<h1>Confirm Action</h1>
		<p>Enter the code for confirmation</p>
		<p v-if="nb">NB: {{nb}}</p>
		<h3>Code: {{ code }}</h3>
		<v-text-field
			label="Code"
			type="number"
			v-model="userInput"
			color="purple"
			solo
			@keyup="onChanged"
		></v-text-field>
		<v-btn :disabled="!button" class="" @click="process">Confirm</v-btn>
		<v-divider class="mx-2" vertical></v-divider>
	</div>
</template>

<script>
	import codeGen from "../util/codeGen"

	export default {
		name: "confirmAction",

		props: ["action", "nb"],

		data: () => ({
			code: null,
			userInput: null,
			button: false,
		}),

		methods: {
			process() {
				this.code = codeGen()
				this.userInput = null
				this.button = false
				this.action()
			},

			onChanged() {
				if (this.code == this.userInput) this.button = true
				else this.button = false
			},
		},

		created() {
			this.code = codeGen()
		},
	}
</script>

<style></style>
