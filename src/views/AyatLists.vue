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
                <center style="margin-top: 40px" v-if="listAyat.length == 0">
                    Belum ada ayat yang ditambahkan
                </center>
                <mu-card 
                    v-else
                    style="margin: 10px; 0px; text-align: right; cursor:pointer;" 
                    v-for="(item, idx) in listAyat" :key="idx" 
                    @click="openSimpleDialog(item.number)"
                >
                    <mu-card-title :title="item.arabtext" :sub-title="`${item.indoText}`" ></mu-card-title>
                    <mu-card-text>
                        QS {{item.surah}}:{{item.ayah}}
                    </mu-card-text>
                </mu-card>
            </mu-col>
        </mu-row>
        <mu-dialog title="Hapus" width="360" :open.sync="openSimple">
            Hapus ayat dari daftar?
            <mu-button slot="actions" flat color="default" @click="closeSimpleDialog">Tidak</mu-button>
            <mu-button slot="actions" flat color="primary" @click="deleteData">Ya</mu-button>
        </mu-dialog>
    </mu-container>
</div>
</template>
<script>
import { getSaveAyat, deleteAyat } from '@/lib'
import { RepositoryAPI } from '@/api/api_repository'
const quran = RepositoryAPI.get('quran')

export default {
    name: 'AyatList',
    data() {
        return {
            listAyat: [],
            openSimple: false,
            loading: false,
            singleAyat: null,
        }
    },
    created() {
        const list = getSaveAyat();
        const duplicateIds = list.map(v => v.no).filter((v, i, vIds) => vIds.indexOf(v) == i);
        duplicateIds.forEach(ayat => {
            this.fetchData(ayat);
        });
 
    },
    methods: {
        openSimpleDialog (value) {
            this.singleAyat = value;
            this.openSimple = true;
        },
        closeSimpleDialog () {
            this.openSimple = false;
        },
        deleteData() {
            deleteAyat(this.singleAyat)
        },
        async fetchData(ayat) {
            this.loading = true;
            try {
                const data = await quran.suratByAyat(ayat);
                const dataAyah = {
                    number: data.data.data[0].number,
                    ayah: data.data.data[0].numberInSurah,
                    surah: data.data.data[0].surah.englishName,
                    indoText: data.data.data[0].text,
                    arabtext: data.data.data[1].text
                }
                this.listAyat.push(dataAyah)
                this.loading = false;
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>