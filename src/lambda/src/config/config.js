const clientAppUrl = 'https://www.stations.ie';
const localhostRegEx = 'http://localhost:2000';
const netlifyDeployPreviewRegEx = /https:\/\/deploy-preview-\d{1,3}--stations.netlify.com/;
const netlifyDeployPreviewShaRegEx = /https:\/\/[a-z0-9]{24}--stations.netlify.com/;

const corsWhiteList = [
  clientAppUrl,
  localhostRegEx,
  netlifyDeployPreviewRegEx,
  netlifyDeployPreviewShaRegEx
];

module.exports = {
  functionsPath: '.netlify/functions',
  functionName: 'stations-express',
  localDevPort: 9000,
  corsOptions: {
    origin: corsWhiteList
  }
};
