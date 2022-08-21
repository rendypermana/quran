<template>
    <mu-appbar style="width: 100%;"  class="navbar" :class="{navbarOnRandom : pathUntukKamu === '/ayat-untuk-kamu'}">
        <mu-button icon slot="left" @click="openMenu">
            <font-awesome-icon icon="fa-solid fa-bars"/>
        </mu-button>
        <div class="logo-app" @click="home">
            Quran
        </div>
        <mu-menu slot="right">
            <mu-button flat>
                <font-awesome-icon icon="fa-solid fa-ellipsis-v"/>
            </mu-button>
            <mu-list slot="content">
                <mu-list-item button @click="myAyat">
                    <mu-list-item-content>
                        <mu-list-item-title >Daftar Ayat Saya</mu-list-item-title>
                    </mu-list-item-content>
                </mu-list-item>
                <mu-list-item button @click="myBaca">
                    <mu-list-item-content>
                        <mu-list-item-title>Penanda Saya</mu-list-item-title>
                    </mu-list-item-content>
                </mu-list-item>
            </mu-list>
        </mu-menu>
    </mu-appbar>
</template>
<script>
export default {
    name: 'Header',
    watch: {
        '$route.path': {
            handler: function(val) {
                this.pathUntukKamu = val;
            }
        }
    },
    data() {
        return {
            open: false,
            pathUntukKamu: '',
        }
    },
    mounted(){
        const path = this.$route.path;
        this.pathUntukKamu = path;
    },
    methods: {
        home() {
            this.$router.push({path: "/"});
        },
        openMenu() {
            this.$emit("openMenu");
        },
        myAyat() {
            this.$router.push({name: "AyatLists"}).catch(()=>{});
        },
        myBaca() {
            this.$router.push({name: "PenandaBaca"}).catch(()=>{});
        }
    }
}
</script>
<style scoped>

</style>