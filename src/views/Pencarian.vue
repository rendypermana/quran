<template>
<div class="surah single-surah">
    <mu-container>
        <mu-row>
            <mu-col span="12">
                <div class="pencarian">
                    <label class="label">Pencarian</label>
                    <mu-text-field v-model="keyword" full-width placeholder="contoh: shalat"></mu-text-field>
                    <mu-flex justify-content="center" align-items="center">
                        <mu-button full-width color="primary" @click="cari">Cari</mu-button>
                    </mu-flex>
                </div>
            </mu-col>
            <mu-col span="12" v-if="loading">
                <div class="loading">
                    <mu-circular-progress class="demo-circular-progress" :size="36"></mu-circular-progress>
                </div>
            </mu-col>
            <mu-col span="12" v-else>
                <center style="margin-top: 40px" v-if="hasil.length == 0">
                    Pencarian tidak ditemukan
                </center>
                <mu-card 
                    v-else
                    style="margin: 10px; 0px; text-align: right; cursor:pointer;"
                    v-for="(item, index) in hasil"
                    :key="index"
                >
                    <mu-card-title :sub-title="item.text" ></mu-card-title>
                    <mu-card-text>
                        QS {{item.surah.englishName}}:{{item.numberInSurah}}
                    </mu-card-text>
                </mu-card>
            </mu-col>
        </mu-row>
    </mu-container>
</div>
</template>
<script>
import { RepositoryAPI } from '@/api/api_repository'
const quran = RepositoryAPI.get('quran')
export default {
    data() {
        return {
            keyword: '',
            hasil: [],
            loading: false
        }
    },
    methods: {
        async cari() {
            try {
                this.loading = true;
                const res = await quran.searchKeyword(this.keyword);
                if (res.data.data){
                    this.hasil = res.data.data.matches
                } else {
                    this.hasil = []
                }
                this.loading = false;
            } catch(e) {
                console.log(e)
            }
        }
    }
}
</script>