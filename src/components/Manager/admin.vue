<template>
    
    <div>

        <h1 class="green--text"><v-icon>mdi-accessibility</v-icon> Admin Panel</h1>

        <div class="row">
            <div class=" text-center col-6 col-md-4 col-lg-3" v-for="(item, i) in items" :key="i">
                
                <v-card height="100%" :to="item.to" :class="'pa-4 ' +  (i % 2 == 0  ? 'purple': 'green')">
                    <p class="">
                        <v-icon size="100" class="white--text">mdi-{{item.icon}}</v-icon>
                    </p>
                    <h3 class="white--text">{{item.title}}</h3>
                    
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
                icon: "minus-box",
                title: "Coupons",
                to: "/managecoupons"
            },
            {
                icon: "clipboard-text",
                title: "Orders",
                to: "/manageorders"
            },
            {
                icon: "camera-burst",
                title: "Banners",
                to: "/managebanners"
            },
            {
                icon: "chart-areaspline",
                title: "Report",
                to: "/reports"
            }


        ]
    })

}
</script>

<style>

</style>