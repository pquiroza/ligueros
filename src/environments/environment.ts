// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
production:false,
server: "http://192.168.0.29:5001/ligueros/api",
firebase:{
  apiKey: "AIzaSyAeE1UZ4_hxQpG9M85iT9HFQDuuJPnfFv4",
     authDomain: "ligueros-af5b3.firebaseapp.com",
     databaseURL: "https://ligueros-af5b3.firebaseio.com",
     projectId: "ligueros-af5b3",
     storageBucket: "ligueros-af5b3.appspot.com",
     messagingSenderId: "290557695821",
     appId: "1:290557695821:web:62d5f7e53cc626b0648904",
     measurementId: "G-VFK6CNBKME"
   }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
