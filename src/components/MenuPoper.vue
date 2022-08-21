<template>
   <div>
        <mu-button flat color="#FFF" ref="button" @click="open = !open">
            <font-awesome-icon icon="fa-solid fa-plus" color="#1e90ff"/>
        </mu-button>
        <mu-popover cover :open.sync="open" :trigger="trigger">
            <mu-list>
                <mu-list-item button @click="saveAyat">
                    <mu-list-item-title>Simpan Ayat</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button @click="tandaiAyat">
                    <mu-list-item-title>Tandai Membaca</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button @click="downloadImage">
                    <mu-list-item-title>Download gambar ayat</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-popover>
   </div> 
</template>

<script>
import { saveDataAyat, tandaiAyat } from '@/lib'

export default {
    props: {
        dataAyat: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            open: false,
            trigger: null
        }
    },
    mounted () {
        this.trigger = this.$refs.button.$el;
    },
    methods: {
        saveAyat() {
            saveDataAyat(this.dataAyat);
            this.open = false;
            this.$toast.success('Ayat berhasil tambahkan');
        },
        tandaiAyat() {
            tandaiAyat(this.dataAyat);
            this.open = false;
            this.$toast.success('Penanda berhasil tambahkan');
        },
        downloadImage() {
            const surah = this.$route.params.number;
            const ayat = this.dataAyat.numberInSurah;
            window.open(`http://cdn.islamic.network/quran/images/${surah}_${ayat}.png`, `_blank`);
        }
    }
}
</script>