<template>
    
    <div>

        <h1 class="green--text">Unapproved Reviews</h1>
		<v-divider class="my-3"></v-divider>
        <reviewsList />

    </div>

</template>

<script>
import reviewsList from "./Review/reviewsList"

export default {

    name: "ManageUnapprovedReviews",

    components: {
        reviewsList
    }

}
</script>

<style>

</style>