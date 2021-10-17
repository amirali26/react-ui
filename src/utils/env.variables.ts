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
  REACT_APP_API_URL: window.location.href.includes('dashboard.helpmycase.co.uk') ? 'https://dashboard-api.helpmycase.co.uk' : 'http://localhost:8080',
  REACT_APP_COGNITO: {
    poolId: 'eu-west-1_8xuHVtmN3',
    clientId: '5oucm4sj9u1jdhbd5i6sl0lmof',
    storage: localStorage,
  },
};

export default environmentVars;
