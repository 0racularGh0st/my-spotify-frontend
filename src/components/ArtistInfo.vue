<template>
  <div class="artist-info">
    <div v-if="!dataReady">
      <Loader />
    </div>
    <div class="content-container" v-if="dataReady">
      </div>
  </div>
</template>
<script>
import Loader from "./Loader";
import { getArtist} from "../spotify";
import { catchErrors} from "../utils";
export default {
  created() {
    catchErrors(this.getArtistData());
  },
  data() {
    return {
      artistId: this.$route.params.artistId,
      dataReady: false,
      artistInfo: null,
    };
  },
  methods: {
    getArtistData: async function () {
      let artistInfoRes = await getArtist(this.artistId);
      this.artistInfo = artistInfoRes.data;
      //this.dataReady = true;
      console.log("Res->", this.artistInfo);
    }
  },
  components: {
    Loader
  },
};
</script>
<style lang="scss" scoped>
h2,
h3,
p {
  margin: 0.2rem 0;
  color: white;
}
.theme-button-filled{
    margin-top: 1rem;
}
.artist-info {
  position: relative;
  height: 100%;
  width: 100%;
  background: var(--bg-color);
}



</style>