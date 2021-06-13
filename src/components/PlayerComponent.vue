<template>
    <div class="player">
        <mu-container>
            <div class="player-area">
                <div class="controller-nav">
                    <div class="prevous">
                        <mu-icon value="skip_previous" class="tunjuk-play"></mu-icon>
                    </div>
                    <div class="play" @click="playAudio()">
                        <mu-icon value="play_arrow" class="mainkan"></mu-icon>
                    </div>
                    <div class="next">
                        <mu-icon value="skip_next" class="tunjuk-play"></mu-icon>
                    </div>
                </div>
            </div>
        </mu-container>
    </div>
</template>
<script>
export default {
    props:["playlist"],
    data(){
        return{
            musicPlaylist: [],
            currentSong: "",
            currentlyPlaying: false,
		    currentlyStopped: false,
        }
    },
    mounted(){
    },
    filters: {
		fancyTimeFormat: function(s) {
			return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
		}
	},
    methods:{
        playAudio(){
            this.currentSong.play()

            // if (
			// 	this.currentlyStopped == true &&
			// 	this.currentSong + 1 == this.musicPlaylist.length
			// ) {
			// 	this.currentSong = 0;
			// 	this.changeSong();
			// }
			// if (!this.currentlyPlaying) {
			// 	this.getCurrentTimeEverySecond(true);
			// 	this.currentlyPlaying = true;
			// 	this.audio.play();
			// } else {
			// 	this.stopAudio();
			// }
			this.currentlyStopped = false;
        }
    },
    watch: {
        playlist: function(val){
            this.currentSong = new Audio(val[0].urlSound)
            this.musicPlaylist = val
            console.log(this.currentSong)
        }
    }
}
</script>