const clientAppUrl = 'https://www.stations.ie';
const localhostUrls = /https?:\/\/localhost:\d{4}/;
const netlifyDeployPreviewUrls = /https:\/\/deploy-preview-\d{1,3}--stations.netlify.com/;
const netlifyDeployPreviewShaUrls = /https:\/\/[a-z0-9]{24}--stations.netlify.com/;

const corsWhiteList = [
  clientAppUrl,
  localhostUrls,
  netlifyDeployPreviewUrls,
  netlifyDeployPreviewShaUrls
];

module.exports = {
  functionsPath: '.netlify/functions',
  functionName: 'stations-express',
  localDevPort: 9000,
  corsOptions: {
    origin: corsWhiteList
  }
};
