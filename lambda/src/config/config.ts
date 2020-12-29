import cors from 'cors';

const clientAppUrl = 'https://www.stations.ie';
const clientAppNetlifyUrl = 'https://stations.netlify.app';
const localhostUrls = /https?:\/\/localhost:\d{4}/;
const netlifyDeployPreviewUrls = /\-\-stations\.netlify\.app$/;
// https://regexr.com/5jblc
const corsWhiteList = [
  clientAppUrl,
  clientAppNetlifyUrl,
  localhostUrls,
  netlifyDeployPreviewUrls
];

const corsOptions: cors.CorsOptions = {
  origin: corsWhiteList
}

const functionsPath = '.netlify/functions';
const functionName = 'stations';

export const config = {
  corsOptions,
  functionsPath,
  functionName
}
