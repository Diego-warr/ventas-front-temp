// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// WORKSPACE:
// - NODEJS: 16.10.0
// - ANGULAR: @angular/cli@12.2.7

//public HOS = ;

export const environment = {
  production: false,
  //HOST: 'http://192.168.2.30:8002/aviventas-api/api',
  HOST: 'http://LOCALHOST:8686/aviventas-api/api',
  REINTENTOS: 3,
  OAUTH_RESPONSE: 'access_token',
  ZONA: 'Local',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
