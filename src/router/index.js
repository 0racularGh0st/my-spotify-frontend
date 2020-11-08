import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user" */ '../components/User.vue')
  },
  {
    path: '/top_tracks',
    name: 'TopTracks',
    component: () => import(/* webpackChunkName: "toptracks" */ '../components/TopTracks.vue')
  },
  {
    path: '/top_artists',
    name: 'TopArtists',
    component: () => import(/* webpackChunkName: "topartists" */ '../components/TopArtists.vue')
  },
  {
    path: '/recently_played',
    name: 'RecentlyPlayed',
    component: () => import(/* webpackChunkName: "recentlyplayed" */ '../components/Recent.vue')
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: () => import(/* webpackChunkName: "playlists" */ '../components/Playlist.vue')
  },
  {
    path: '/track/:trackId',
    name: 'TrackInfo',
    component: () => import(/* webpackChunkName: "trackinfo" */ '../components/TrackInfo.vue')
  },
  {
    path: '/artist/:artistId',
    name: 'ArtistInfo',
    component: () => import(/* webpackChunkName: "artistinfo" */ '../components/ArtistInfo.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
