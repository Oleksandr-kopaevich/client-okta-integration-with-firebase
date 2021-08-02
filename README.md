# What for?

This is frontend part of integration with [Okta](https://developer.okta.com) and [Firebase](https://firebase.google.com).

## Live demo

https://explore-firebase-37b42.web.app/ - Uses Firebase hosting for frontend part (React application) and Firebase functions for [backend part (Nestjs application)](https://github.com/Oleksandr-kopaevich/nest-server-for-okta-integration-with-firebase)

## How to start 

1. Create `.env` file and fill next variables:  

<b>REACT_APP_OKTA_ORG_URL</b> - You can copy your domain from the Okta Admin Console. (without 'https://')   
<b>REACT_APP_OKTA_CLIENT_ID</b> - Find it in "Applications" section   

Take these values from firebase project setting  
<b>REACT_APP_FIREBASE_apiKey</b>  
<b>REACT_APP_FIREBASE_authDomain</b>  
<b>REACT_APP_FIREBASE_projectId</b>  
<b>REACT_APP_FIREBASE_storageBucket</b>  
<b>REACT_APP_FIREBASE_messagingSenderId</b>  
<b>REACT_APP_FIREBASE_appId</b>  
<b>REACT_APP_FIREBASE_measurementId</b>  

<b>REACT_APP_CUSTOM_TOKEN_ENDPOINT</b> - Full URL to send JWT token to  
<b>REACT_APP_CUSTOM_TOKEN_ENDPOINT_LOCALHOST</b> - Same usage as CUSTOM_TOKEN_ENDPOINT but for local development we may need another URL  

2. Run to install node modules
```bash 
npm i
```
and make sure thay your Firebase CLI is up to date
```bash 
npm install -g firebase-tools
```

3. To run locally type 
 ```bash 
npm run start
```

4. Or deploy app to firebase hosting
 ```bash 
npm run deploy
```

