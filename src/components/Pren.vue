<template>
    <div class="chat ">


        <div class="pa-2 purple white--text shadow" v-show="chat"><v-icon color="white">mdi-robot</v-icon> Pren</div>        

        <ConversationalForm @submit="submit" v-if="chat" class="chat-canvas">
        <fieldset>
            <label for="category">Ollo, Am Pren. What is your favourite game category??</label>
            <select data-question="Ollo, Am Pren. What is your favourite game category?" name="category">
                <option></option>
                <option v-for="c in categories" :key="c._id">{{c.name}}</option>
            </select>
        </fieldset>
        <fieldset>
            <label for="instock">inStock</label>
            <input type="radio" name="inStock" value="null" data-text="All" data-question="😊 And do u wanna see everything or only the stuff that are in stock?"> 
            <input type="radio" name="inStock" value="inStock" data-text="in stock"> 
        </fieldset>
        <fieldset>
            <label for="rating">rating</label>
            <input type="radio" name="rating" value="null" data-text="Nope" data-question="😀 any specific minimum rating?"> 
            <input type="radio" name="rating" value="5" data-text="5"> 
            <input type="radio" name="rating" value="4" data-text="4+"> 
            <input type="radio" name="rating" value="3" data-text="3+"> 
            <input type="radio" name="rating" value="2" data-text="2+"> 
            <input type="radio" name="rating" value="1" data-text="1+">  
        </fieldset>
        
        <fieldset>
            <label for="category">Sort</label>
            <select data-question="😬 One last thing, how should I sort the games?" name="sort">
                <option></option>
                <option value="-createdAt">Latest</option>
                <option value="price">Cheapest</option>
                <option value="-price">Expensive</option>
                <option value="name">A - Z</option>
            </select>
        </fieldset>
        <fieldset>
            <label for="thats-all">Ready</label>
            <button data-question="Are you ready for the games?" data-success="Here they come!😄" name="submit" type="submit" data-cancel="Nah">Yup</button>
        </fieldset>
        </ConversationalForm>

        <div>
            <v-btn :color="color" large x-large fab right class="btn-chat mt-2 float-right white--text" @click="chat = !chat; color = color == 'green' ? 'purple' : 'green'">
                <v-icon v-if="!chat">mdi-message</v-icon>
                <v-icon v-else>mdi-close</v-icon>
            </v-btn>
        </div>
    </div>
</template>
<script>
import ConversationalForm from "vue-conversational-form"
import {mapActions, mapGetters} from "vuex"

export default {
    name: 'App',
    data: () => ({
        chat: false,
        color: "green"
    }),
    components: {
        ConversationalForm
    },
    methods: {
        ...mapActions(["getCategories"]),
        submit (o) {
            let cat = this.categories.find(c => c.name == o.category)._id || null
            let sort = o.sort
            let rating = o.rating == "null" ? null : o.rating
            let inStock = o.inStock == "null" ? null : true

            let query = {}
            if (cat) query.category = cat
            query.sort = sort
            if (rating)query.rating = rating
            if (inStock) query.inStock = true

            this.$router.push({path: "/products", query})
            setTimeout(() => this.chat = false, 3000)

        }
    },
    computed: mapGetters(["categories"]),
    async created() {
        await this.getCategories()
    }
}
</script>

<style>

    .chat {
        position: fixed;
        bottom: 40px;
        right: 40px;
        z-index: 50505050;
    }

    .vcf-container  {
        box-shadow: 0 0 5px rgb(225, 0, 255);
        height: 400px !important;
        width: 350px !important;
    }

    .shadow {
        box-shadow: 0 0 5px rgb(225, 0, 255);
    }

    .vcf-options {
        overflow-x: auto !important;
        background: rgb(0, 255, 136);
    }

</style>