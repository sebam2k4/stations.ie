const clientAppUrl = 'https://www.stations.ie';
const localhostUrls = /https?:\/\/localhost:\d{4}/;
const netlifyDeployPreviewUrls = /https:\/\/deploy-preview-\d{1,3}--stations.netlify.app/;
const netlifyDeployPreviewShaUrls = /https:\/\/[a-z0-9]{24}--stations.netlify.app/;

const corsWhiteList = [
  clientAppUrl,
  localhostUrls,
  netlifyDeployPreviewUrls,
  netlifyDeployPreviewShaUrls
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
