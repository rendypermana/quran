<template>
<div class="random-ayat">
    <div class="cover-image" :style="`background: url(${randomBg});`">
        <div class="overlay">
            <div class="ayatForYou">
                <div class="arab">
                    {{ randomToday.textArab }}
                </div>
                <div class="latin">
                    {{ randomToday.textIndo }}
                    <div class="surah-name">
                        QS {{randomToday.surah}}: {{randomToday.ayat}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import image_1 from '@/assets/image/random1.jpg';
import image_2 from '@/assets/image/random2.jpg';
import image_3 from '@/assets/image/random3.jpg';
import image_4 from '@/assets/image/random4.jpg';
import image_5 from '@/assets/image/random5.jpg';
import { RepositoryAPI } from '@/api/api_repository'
const quran = RepositoryAPI.get('quran')

export default {
    name: 'RandomAyat',
    data() {
        return {
            imageOne: image_1,
            bgArray: [
                image_1,
                image_2,
                image_3,
                image_4,
                image_5
            ],
            randomToday: {}
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
       async fetchData() {
           let randAyah = Math.floor(Math.random() * 6236);
           try {
               const res = await quran.suratByAyat(randAyah);
               const response = res.data.data;
               const newObj = {
                   number: response[0].number,
                   textArab: response[1].text,
                   textIndo: response[0].text,
                   ayat: response[1].numberInSurah,
                   surah: response[1].surah.englishName
               };
               this.randomToday = newObj;
           } catch(e) {
               console.log(e)
           }
       },
    },
    computed: {
        randomBg() {
            const imgRand = Math.floor(Math.random() * this.bgArray.length);
            return this.bgArray[imgRand];
        }
    }
}
</script>
<style scoped>
.random-ayat {
    margin-top: 0px!important;
    position: relative;
}
.overlay {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
    transform: matrix(1, 0, 0, 1, 0, 0);
    background: rgb(0,0,0, 0.5);
}
.cover-image {
    background-position: center center!important;
    background-repeat: no-repeat!important;
    background-attachment: fixed!important;
    background-size: cover!important;
    background-color: #464646!important;
    height: 100vh;
}
.ayatForYou {
    position: absolute;
    left: 0; 
    right: 0;
    margin:auto;
    max-width: 600px;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}
.ayatForYou .arab {
    color: #fff;
    font-size: 30px;
    padding: 20px;
}
.ayatForYou .latin {
    color: #fff;
    font-size: 18px;
    padding: 20px;
}
.latin .surah-name {
    text-align: right;
    font-size: 18px;
}
</style>