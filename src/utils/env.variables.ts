interface CognitoConfig {
  poolId: string;
  clientId: string;
  storage: Storage;
}

interface EnvironmentConfig {
  REACT_APP_API_URL: string;
  REACT_APP_COGNITO: CognitoConfig;
}

// Default is development
const environmentVars: EnvironmentConfig = {
  REACT_APP_API_URL: window.location.href.includes('solicitor.helpmycase.co.uk')
    ? 'https://dashboard-api.helpmycase.co.uk' : 'http://localhost:8080',
  REACT_APP_COGNITO: {
    poolId: 'eu-west-1_FFqUpWtAO',
    clientId: 'fj2304n3i3ndvc2o6otcrebvo',
    storage: localStorage,
  },
};

export default environmentVars;
