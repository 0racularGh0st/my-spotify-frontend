<template>
    <div class="top-tracks">
        <div v-if="!dataReady">
            <Loader/>
        </div>
        <div class="content-container" v-if="dataReady">

        </div>
    </div>
</template>
<script>
import Loader from './Loader';
import { getTopTracksLong, getTopTracksMedium, getTopTracksShort} from "../spotify";
import { catchErrors} from "../utils";
export default {
    created(){
        catchErrors(this.getTopTracks());
    },
    mounted(){

    },
    methods: {
       getTopTracks: async function(){
           let resLong = await getTopTracksLong();
           let resMedium = await getTopTracksMedium();
           let resShort = await getTopTracksShort();
           this.topTracksLong= resLong.data;
           this.topTracksMedium = resMedium.data;
           this.topTracksShort = resShort.data;
            console.log("Res->",this.topTracksLong,this.topTracksMedium,this.topTracksShort);

           this.dataReady = true;
       }
    },
    data(){
        return{
            topTracksLong: null,
            topTracksMedium: null,
            topTracksShort: null,
            dataReady: false
        }
    },
    components: {
        Loader
    }
}
</script>
<style lang="scss" scoped>
.top-tracks {
  position: relative;
  height: 100%;
  width: 100%;
  background: var(--bg-color);
}
</style>