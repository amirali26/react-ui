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
  REACT_APP_API_URL: 'localhost:3000/',
  REACT_APP_COGNITO: {
    poolId: 'us-east-1_FSlSDC20z',
    clientId: '6ljl08iv2211t0sf5nsc1h9r95',
    storage: localStorage,
  },
};

export default environmentVars;
