# My Spotify Profile
This app provides a personalised view of your Spotify Account. 
View your Top Tracks / Artists, recently played tracks, your playlists. 
You can also generate recommendations based on a specific playlist and create a new playlist from recommended tracks.

# The Server Repo 

https://github.com/0racularGh0st/my-spotify-backend 

# Pre-Requisites

1. Register your App at https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app  to use Spotify's Web API 
2. Follow the instructions on how to Create your personal Client Id and Client Secret.
3. Be Sure to replace the `backend_uri` in spotify/index.js with your backend URI . (http://localhost:8888 if running locally) 
4. Change the Login Url in src/components/Login.vue to point to your {backend_uri}/login
```
<a href="{backend_uri}/login" rel="noopener noreferrer" class="login-button"
        ><div class="login">Login with Spotify</div></a
      >
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
