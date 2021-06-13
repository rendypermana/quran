<template>
    <div class="index-page">
        <mu-appbar style="width: 100%;"  class="navbar">
            <div class="title tunjuk" @click="home">Quran</div>
        </mu-appbar>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        home(){
            this.$router.push({path: '/'})
        },
        getRoute(){
            this.routeName = this.$route.name;
        }
    }
}
</script>
<style scoped>
.tunjuk{
    cursor: pointer;
}
</style>