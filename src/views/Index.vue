<template>
    <div class="index-page">
        <Header @openMenu="menuIsOpen"/>

        <div class="content-body">
            <router-view></router-view>
        </div>

        <mu-drawer :open.sync="openFullscreen" :docked="docked" :right="position === 'right'">
            <mu-appbar color="#FFF" style="width: 100%;">
                <mu-button slot="right" flat  @click="closeFullscreenDialog">
                    <font-awesome-icon icon="fa-solid fa-xmark" color="#222"/>
                </mu-button>
            </mu-appbar>
            <mu-list>
                <mu-list-item button @click="home">
                    <mu-list-item-title>Beranda</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button @click="pencarian">
                    <mu-list-item-title>Pencarian</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button @click="random">
                    <mu-list-item-title>Ayat Untuk Kamu</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-drawer>
    </div>
</template>
<script>
import Header from "@/components/Header";
export default {
    data(){
        return{
            openFullscreen: false,
            docked: false,
            position: 'left'
        }
    },
    components: {
       Header,
    },
    methods:{
        home(){
            this.$router.push({path: '/'})
        },
        getRoute(){
            this.routeName = this.$route.name;
        },
        menuIsOpen() {
            this.openFullscreen = !this.openFullscreen;
        },
        closeFullscreenDialog () {
            this.openFullscreen = false;
        },
        home() {
            const path = this.$route.path;
            if (path !== '/') {
                this.$router.push({path: "/"});
                this.openFullscreen = false;
            } else {
                this.openFullscreen = false;
            }
        },
        pencarian() {
            this.$router.push({name: "Pencarian"}).catch(()=>{});
            this.openFullscreen = false;
        },
        random() {
            this.$router.push({name: "RandomAyat"}).catch(()=>{});
            this.openFullscreen = false;
        }
    }
}
</script>
<style scoped>
.tunjuk{
    cursor: pointer;
}
</style>