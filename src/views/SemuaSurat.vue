<template>
    <div class="surah single-surah">
        <mu-container>
            <mu-row>
                <mu-col span="12" v-if="loading">
                    <div class="loading">
                        <mu-circular-progress class="demo-circular-progress" :size="36"></mu-circular-progress>
                    </div>
                </mu-col>
                <mu-col span="12" v-else>
                    <div class="content-surat">
                        <div v-for="(surat, index) in surahs" :key="index">
                            <div class="per-surat">
                                <div class="title-surat">
                                    <h1>{{surat.name}}</h1>
                                </div>
                                <div class="surah-content">
                                    <div class="ayah-all">
                                        <span class="ayah" v-for="(ayat, idx) in surat.ayahs" :key="idx">
                                            {{ayat.text}}
                                            <span class="nomornya">{{ayat.numberInSurah}}</span
                                        ></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </mu-col>
            </mu-row>
        </mu-container>
    </div>
</template>
<script>
import { RepositoryAPI } from '@/api/api_repository'
const quran = RepositoryAPI.get('quran')
export default {
    data(){
        return{
            loading: false,
            surahs: []
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        async getData(){
            try{
                this.loading = true
                const data = await quran.allQuran();
                this.surahs = data.data.data.surahs
                this.loading = false
            }catch(e){
                console.log(e)
            }
        }


    }
}
</script>