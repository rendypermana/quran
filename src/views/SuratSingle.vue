<template>
    <div class="surah single-surah">
        <mu-container>
            <div class="judul-surat">
                <div class="title">
                    {{judulSurat}}
                </div>
                <div class="subtitle">
                    {{subtitleSurat}}
                </div>
            </div>
        </mu-container>
        <mu-container>
            <mu-row>
                <mu-col span="12" v-if="loading">
                    <div class="loading">
                        <mu-circular-progress class="demo-circular-progress" :size="36"></mu-circular-progress>
                    </div>
                </mu-col>
                <mu-col span="12" v-else>
                    <mu-card>
                        <mu-card-text>
                            <div class="area-ayat">
                                <center 
                                    style="font-size: 27px; padding-bottom: 20px;"
                                    v-if="this.$route.params.number != 1 && this.$route.params.number != 9"
                                >
                                   سْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                                </center>
                                <div :id="'ayat_'+item.no" class="ayat" :class="ayatAktif == item.numberInSurah? 'ayat-active' : `sini-${item.no}`" v-for="(item,index) in ayat" :key="index">
                                    <div class="arab tunjuk-play"  @click="playSound(index, item.numberInSurah)">{{item.arab}} <span class="no">{{arabicNumbering(item.numberInSurah)}}</span></div>
                                    <div class="latin">
                                        {{item.latin}} 
                                        <span>({{item.numberInSurah}})</span>
                                    </div>
                                    <div class="menu-poper" :id="'poper_'+item.no">
                                        <MenuPoper 
                                            v-if="ayatAktif == item.numberInSurah"
                                            :dataAyat="item"
                                        />
                                    </div>
                                </div>
                            </div>
                        </mu-card-text>
                    </mu-card>
                </mu-col>
            </mu-row>
        </mu-container>
        <div class="player">
            <mu-container>
                <div class="player-area">
                    <div class="controller-nav">
                        <div class="prevous">
                            <font-awesome-icon icon="fa-solid fa-backward-step" class="tunjuk-play" @click="prevSong()" />
                        </div>
                        <div class="play" @click="pauseAudio()" v-if="isPlaying">
                            <font-awesome-icon icon="fa-solid fa-pause" class="pause" />
                        </div>
                        <div class="play" @click="playAudio()" v-else>
                            <font-awesome-icon icon="fa-solid fa-play" class="mainkan" />
                        </div>
                        <div class="next">
                            <font-awesome-icon icon="fa-solid fa-forward-step" class="tunjuk-play" @click="nextSong()" />
                        </div>
                    </div>
                </div>
            </mu-container>
        </div>
        <mu-dialog :open.sync="popUp">
            <div class="pop-ayat">
                <div class="arab">
                    {{perAyat.arab}} <span class="no">{{arabicNumbering(perAyat.numberInSurah)}}</span>
                </div>
                <div class="latin">
                    {{perAyat.latin}} <span>{{perAyat.numberInSurah}}</span>
                </div>
            </div>
            <mu-button slot="actions" flat color="primary" @click="closePopUp">Tutup</mu-button>
        </mu-dialog>
    </div>
</template>
<script>
import MenuPoper from "@/components/MenuPoper"
import { RepositoryAPI } from '@/api/api_repository'
const quran = RepositoryAPI.get('quran')

export default {
    data(){
        return{
            ayat:[],
            judulSurat: "",
            subtitleSurat: "",
            loading: false,
            // playlist
            musicPlaylist: [],
            currentSong: 0,
            audioFile: null,
            isPlaying: false,
            isStoped: false,
            checkingCurrentPositionInTrack:"",
            ayatAktif: 1,
            popUp: false,
            perAyat: [],
        }
    },
    components: {
        MenuPoper
    },
    created(){
        let number = this.$route.params.number
        this.getData(number)
    },
    methods:{
        async getData(id){
            try{
                this.loading = true
                const data = await quran.suratSingle(id);
                const latin = data.data.data[0].ayahs
                const arab = data.data.data[1].ayahs
                this.judulSurat = data.data.data[0].name
                this.subtitleSurat = data.data.data[0].englishName
                let i;
                for(i = 0; i < latin.length; i++){
                    let p ={
                        latin: latin[i].text,
                        arab: arab[i].text,
                        no: latin[i].number,
                        numberInSurah: latin[i].numberInSurah,
                        urlSound: this.getSound(latin[i].number)
                    }
                    let m ={
                        url : this.getSound(latin[i].number)
                    }
                    this.ayat.push(p);
                    this.musicPlaylist.push(p);
                }
                this.splitBismillah()
                this.loading = false
                this.getCurrentSong();
            }catch(e){
                console.log(e)
            }
        },
        getSound(value){
            return "https://cdn.islamic.network/quran/audio/128/ar.alafasy/"+ value +".mp3"
        },
        playSound(value, aktif){
            this.currentSong = value - 1
            this.ayatAktif = aktif -1
            this.audioFile.pause()
            this.changeSong()
        },

        closePopUp(){
            this.popUp = false
        },
        scrollAyat(value){
            let elmnt = document.getElementById(value);
            var bounding = elmnt.getBoundingClientRect();
            if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= window.innerWidth && bounding.bottom <= window.innerHeight) {
                this.popUp = false
            } else {
                this.popUp = true
            }
        },
        poperPosition(value) {
            const highEl = document.getElementById('ayat_'+value);
            const highArea = highEl.getBoundingClientRect();
            const heightElm = Math.floor(highArea.height)
            document.getElementById('poper_'+value).style.bottom = `${(heightElm / 2) - 15}px`;
            document.getElementById('poper_'+value).style.zIndex = `1`;
        },
        getCurrentSong(){
            this.audioFile = new Audio(this.musicPlaylist[this.currentSong].urlSound)
            this.scrollAyat('ayat_'+this.musicPlaylist[this.currentSong].no)
            this.poperPosition(this.musicPlaylist[this.currentSong].no)
            this.perAyat = this.musicPlaylist[this.currentSong]
        },
        changeSong(){
            if(this.currentSong+1 < this.musicPlaylist.length){
                this.currentSong += 1;
                this.ayatAktif +=1;
                this.getCurrentSong()
                this.playAudio()
            }else{
                this.isPlaying = false
                this.currentSong = 0;
                this.ayatAktif = 0;
                this.audioFile = new Audio(this.musicPlaylist[this.currentSong].urlSound)
                this.pauseAudio()
                if(this.popUp = true){
                    this.popUp = false
                }
            }
            
        },
        prevSong(){
            if(this.isPlaying == true && this.currentSong !== 0){
                this.audioFile.pause()
                this.currentSong -= 2;
                this.ayatAktif -= 2;
                this.changeSong()
            }
        },
        nextSong(){
            if(this.isPlaying == true){
                this.audioFile.pause()
                this.changeSong()
            }	
        },
        handleEnded() {
            this.changeSong()
		},
        playAudio(){
            if(this.isPlaying == false){
                this.isPlaying = true
            }
            if(this.isPlaying == true){
                this.audioFile.play()
                this.audioFile.addEventListener("ended", this.handleEnded);
            }else {
				this.stopAudio();
			}
        },
        pauseAudio(){
            this.isPlaying = false
            this.audioFile.pause()
        },
        stopAudio() {
			this.audio.pause();
			this.isPlaying = false;
		},
        arabicNumbering(value) {
            const ayat_ = String(value)
            let id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
            return ayat_.replace(/[0-9]/g, function(w){
                return id[+w]
            });
        },
        splitBismillah(){
            if (this.$route.params.number != 1 && this.$route.params.number != 9 ) {
                const firstAyat = this.ayat[0];
                const replaceAyat = String(firstAyat.arab).slice(39);
                this.ayat[0].arab = replaceAyat;
            }
        }
    },
    beforeDestroy: function() {
		this.audioFile.removeEventListener("ended", this.handleEnded);
		this.audioFile.removeEventListener("loadedmetadata", this.handleEnded);
		clearTimeout(this.checkingCurrentPositionInTrack);
	},
}
</script>