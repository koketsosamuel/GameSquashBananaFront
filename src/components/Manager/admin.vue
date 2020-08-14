<template>
    
    <div>

        <div class="row">
            <div class=" text-center col-6 col-md-4 col-lg-3" v-for="(item, i) in items" :key="i">
                
                <v-card height="100%" :to="item.to" class="pa-4">
                    <p class="">
                        <v-icon size="100" class="green--text text--lighten-2">mdi-{{item.icon}}</v-icon>
                    </p>
                    <h3 class="purple--text text--lighten-2">{{item.title}}</h3>
                    
                </v-card>


            </div>
        </div>
        
    </div>

</template>

<script>
export default {

    name: "adminManage",

    data: () => ({
        items: [
            {
                icon: "account",
                title: "Users",
                to: "/manageusers"
            },
            {
                icon: "archive",
                title: "Products",
                to: "/manageproducts"
            },
            {
                icon: "star",
                title: "Pending Reviews",
                to: "/manageunapprovedreviews"
            },
            {
                icon: "archive",
                title: "Categories",
                to: "/managecategories"
            },
            {
                icon: "money-box",
                title: "Coupons",
                to: "/manageunapprovedreviews"
            },
             {
                icon: "collection-text",
                title: "Orders",
                to: "/manageunapprovedreviews"
            },
            {
                icon: "truck",
                title: "Deliveries",
                to: "/manageunapprovedreviews"
            },
            {
                icon: "truck",
                title: "Specials",
                to: "/manageunapprovedreviews"
            },


        ]
    })

}
</script>

<style>

</style>