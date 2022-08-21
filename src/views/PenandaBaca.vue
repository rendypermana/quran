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
                    <center style="margin-top: 40px" v-if="Object.keys(tandaAyat).length === 0">
                        Belum ada ayat yang ditandai
                    </center>
                    <mu-card 
                        v-else
                        style="margin: 10px; 0px; text-align: right; cursor:pointer;" 
                        @click="openSimpleDialog(penanda.number)"
                    >
                        <mu-card-title :title="penanda.arabtext" :sub-title="`${penanda.indoText}`" ></mu-card-title>
                        <mu-card-text>
                            QS {{penanda.surah}}:{{penanda.ayah}}
                        </mu-card-text>
                    </mu-card>
                </mu-col>
            </mu-row>
            <mu-dialog title="Hapus" width="360" :open.sync="openSimple">
                Buka surat?
                <mu-button slot="actions" flat color="default" @click="closeSimpleDialog">Tidak</mu-button>
                <mu-button slot="actions" flat color="primary" @click="goToSurat">Ya</mu-button>
            </mu-dialog>
        </mu-container>
    </div>
</template>
<script>
import { getTandaAyat } from '@/lib'
import { RepositoryAPI } from '@/api/api_repository'
const quran = RepositoryAPI.get('quran')

export default {
    name: 'PenandaBaca',
    data() {
        return {
            tandaAyat: {},
            loading: false,
            penanda: {},
            openSimple: false,
        }
    },
    created() {
        this.tandaAyat = getTandaAyat();
        if(Object.keys(this.tandaAyat).length !== 0) {
            this.fetchData(this.tandaAyat.no);
        }
    },
    methods: {
        async fetchData(ayat) {
            this.loading = true;
            try {
                const data = await quran.suratByAyat(ayat);
                const dataAyah = {
                    number: data.data.data[0].number,
                    ayah: data.data.data[0].numberInSurah,
                    surah: data.data.data[0].surah.englishName,
                    indoText: data.data.data[0].text,
                    arabtext: data.data.data[1].text,
                    surahNumber: data.data.data[0].surah.number
                }
                this.penanda = dataAyah
                this.loading = false;
            } catch (e) {
                console.log(e)
            }
        },
        openSimpleDialog (value) {
            this.singleAyat = value;
            this.openSimple = true;
        },
        closeSimpleDialog () {
            this.openSimple = false;
        },
        goToSurat() {
            this.$router.push({
                name: 'SuratSingle', 
                params:{
                    number: this.penanda.surahNumber
                }
            })
        },
    }
}
</script>