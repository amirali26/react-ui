/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const env = require(`../config.${process.env.REACT_APP_ENV}.json`);
interface CognitoConfig {
  poolId: string;
  clientId: string;
  storage: Storage;
}

interface EnvironmentConfig {
  REACT_APP_API_URL: string;
  REACT_APP_COGNITO: CognitoConfig;
  lambdaUrl: string;
  s3BucketUrl: string;
}
// Default is development
const environmentVars: EnvironmentConfig = {
  REACT_APP_API_URL: env.url,
  REACT_APP_COGNITO: {
    poolId: env.REACT_APP_COGNITO.poolId,
    clientId: env.REACT_APP_COGNITO.clientId,
    storage: localStorage,
  },
  lambdaUrl: env.lambdaUrl,
  s3BucketUrl: env.s3BucketUrl,
};

export default environmentVars;
