# My Spotify Profile
This app provides a personalised view of your Spotify Account. 
View your Top Tracks / Artists, recently played tracks, your playlists. 
You can also generate recommendations based on a specific playlist and create a new playlist from recommended tracks.

# The Server Repo 

https://github.com/0racularGh0st/my-spotify-backend 

# Pre-Requisites

1. Register your App at https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app  to use Spotify's Web API 
2. Follow the instructions on how to Create your personal Client Id and Client Secret.
3. Be sure to update src/config/index.js if you have deploiyed your backend service somewhere.
```
 BACKEND_URI: "http://localhost:8888",  
 LOGIN_URI: "http://localhost:8888/login"
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
# Credits
Thanks to Brittany Chiang for the design. Do check out her React Version at https://github.com/bchiang7/spotify-profile
