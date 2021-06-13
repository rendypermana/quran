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
                                <div :id="'ayat_'+item.no" class="ayat" :class="ayatAktif == item.numberInSurah? 'ayat-active' : ''" v-for="(item,index) in ayat" :key="index">
                                    <div class="arab tunjuk-play"  @click="playSound(index, item.numberInSurah)">{{item.arab}} <span class="no">{{item.numberInSurah}}</span></div>
                                    <div class="latin">{{item.latin}}</div>
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
                            <mu-icon value="skip_previous" class="tunjuk-play" @click="prevSong()"></mu-icon>
                        </div>
                        <div class="play" @click="pauseAudio()" v-if="isPlaying">
                            <mu-icon value="pause" class="mainkan"></mu-icon>
                        </div>
                        <div class="play" @click="playAudio()" v-else>
                            <mu-icon value="play_arrow" class="mainkan"></mu-icon>
                        </div>
                        <div class="next">
                            <mu-icon value="skip_next" class="tunjuk-play" @click="nextSong()"></mu-icon>
                        </div>
                    </div>
                </div>
            </mu-container>
        </div>
        <mu-dialog :open.sync="popUp">
            <div class="pop-ayat">
                <div class="arab">
                    {{perAyat.arab}} <span class="no">{{perAyat.numberInSurah}}</span>
                </div>
                <div class="latin">
                    {{perAyat.latin}}
                </div>
            </div>
            <mu-button slot="actions" flat color="primary" @click="closePopUp">Tutup</mu-button>
        </mu-dialog>
    </div>
</template>
<script>
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
            perAyat: []
        }
    },
    mounted(){
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
                this.loading = false
                this.getCurrentSong()
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


        //    playlist
        closePopUp(){
            this.popUp = false
        },
        scrollAyat(value){
            let elmnt = document.getElementById(value);
            // elmnt.scrollIntoView({behavior: "smooth"});
            // console.log(elmnt)

            var bounding = elmnt.getBoundingClientRect();

            if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= window.innerWidth && bounding.bottom <= window.innerHeight) {
                this.popUp = false
            } else {
                this.popUp = true
            }
            
        },
        getCurrentSong(){
            this.audioFile = new Audio(this.musicPlaylist[this.currentSong].urlSound)
            this.scrollAyat('ayat_'+this.musicPlaylist[this.currentSong].no)
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
        
    },
    beforeDestroy: function() {
		this.audioFile.removeEventListener("ended", this.handleEnded);
		this.audioFile.removeEventListener("loadedmetadata", this.handleEnded);
		clearTimeout(this.checkingCurrentPositionInTrack);
	}
}
</script>