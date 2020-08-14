<template>
    <div>
        
        <h1 class="green--text">Manage Users</h1>

        <usersList />

    </div>
</template>

<script>
import usersList from "./User/usersList"

export default {

    name: "manageUsers",

    components: {
        usersList
    }

}
</script>

<style>

</style>