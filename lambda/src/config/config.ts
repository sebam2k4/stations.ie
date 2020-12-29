const clientAppUrl = 'https://www.stations.ie';
const clientAppNetlifyUrl = 'https://stations.netlify.app/';
const localhostUrls = /https?:\/\/localhost:\d{4}/;
const netlifyDeployPreviewUrls = /^https:\/\/[a-zA-Z0-9-]*--stations\.netlify\.app\/$/;

const corsWhiteList = [
  clientAppUrl,
  clientAppNetlifyUrl,
  localhostUrls,
  netlifyDeployPreviewUrls
];

const corsOptions = {
  origin: corsWhiteList
}
const functionsPath = '.netlify/functions';
const functionName = 'stations';

export const config = {
  corsOptions,
  functionsPath,
  functionName
}
