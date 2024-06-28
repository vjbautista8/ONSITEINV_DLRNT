// routes
import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.REACT_APP_HOST_API;
export const ASSETS_API = process.env.REACT_APP_ASSETS_API;

export const FIREBASE_API = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const AMPLIFY_API = {
  userPoolId: process.env.REACT_APP_AWS_AMPLIFY_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID,
  region: process.env.REACT_APP_AWS_AMPLIFY_REGION,
};

export const AUTH0_API = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  callbackUrl: process.env.REACT_APP_AUTH0_CALLBACK_URL,
};

export const MAPBOX_API = process.env.REACT_APP_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN =
  '/appfiles/v2/f58640bc-3647-46f9-a09f-fc986c678109/1.0/4dd9cde3b7df9cec88970e5ffd21ff718a197d35d360ae0d1001d0fb08f01cbc/r14/app/index.html'; // as '/app/index.html' ///appfiles/v2/f58640bc-3647-46f9-a09f-fc986c678109/1.0/4dd9cde3b7df9cec88970e5ffd21ff718a197d35d360ae0d1001d0fb08f01cbc/r3/app/index.html
export const BASE_URL = window.location.pathname;
export const APP_URL = window.location.pathname.replace('/index.html', '');
