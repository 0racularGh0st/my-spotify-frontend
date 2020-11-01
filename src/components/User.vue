<template>
    <div>
        <div v-if="dataReady">Spotify User: {{user.display_name}}</div>
    </div>
</template>
<script>
import { getUserInfo} from '../spotify';
import { catchErrors } from '../utils';
export default {
    data(){
        return{
            user: null,
            followedArtists: null, 
            playlists: null, 
            topArtists: null, 
            topTracks: null,
            dataReady: false
        }
    },
    created(){
        catchErrors(this.getData());
    },
    methods:{
        getData: async function() {
    const { user, followedArtists, playlists, topArtists, topTracks } = await getUserInfo();
    await this.assignData(user, followedArtists, playlists, topArtists, topTracks);
    console.log(user, followedArtists, playlists, topArtists, topTracks);
    console.log("The User is:", this.user);
  },
  assignData: async function(user, followedArtists, playlists, topArtists, topTracks){
            this.user = user;
            this.followedArtists = followedArtists;
            this.playlists = playlists;
            this.topArtists = topArtists;
            this.topTracks = topTracks;
            this.dataReady = true;
            return;
  }
    }
}
</script>