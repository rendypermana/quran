<template>
    <div class="surah">
        <mu-container>
            <div class="pencarian">
                <label class="label">Pencarian</label>
                <v-select 
                    :options="option" 
                    :reduce="option => option.number" 
                    label="surah" 
                    v-model="pilih" 
                    class="form-cari" 
                    placeholder="Cari Surah">
                </v-select>
                <div class="text-besar">
                    Al Quran Lengkap <router-link :to="{name:'SemuaSurat'}">[Klik Disini]</router-link>
                </div>
            </div>
            <mu-row>
                <mu-col span="12" v-if="loading">
                    <div class="loading">
                        <mu-circular-progress class="demo-circular-progress" :size="36"></mu-circular-progress>
                    </div>
                </mu-col>
                <mu-col span="12" v-for="(item, index) in surah" :key="index" v-else>
                    <router-link :to="{name: 'SuratSingle', params:{number: item.number}}">
                        <mu-card style="margin: 10px; 0px;">
                            <mu-card-title :title="item.name" :sub-title="item.englishName" ></mu-card-title>
                        </mu-card>
                    </router-link>
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
        return{
            surah:[],
            option:[],
            pilih:"",
            loading: false
        }
    },
    mounted(){
        this.getSurat();
    },
    methods:{
        async getSurat(){
            try{
                this.loading = true
                const data = await quran.suratAll();
                this.surah = data.data.data
                this.loading = false
                const list = data.data.data
                list.forEach(dtx => {
                    let p ={
                        surah: dtx.englishName,
                        number: dtx.number
                    }
                    this.option.push(p)
                });
            }catch(e){
                console.log(e)
            }
        }
    },
    watch:{
        pilih: function(val){
            if(val !==null){
                this.$router.push({name: 'SuratSingle', params:{number: val}})
            }
        }
    }
}
</script>
