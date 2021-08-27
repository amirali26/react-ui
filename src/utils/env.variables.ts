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
    poolId: 'eu-west-1_Bo5l53wSG',
    clientId: 'jfqsq1211sofcl9nv9aalrlq8',
    storage: localStorage,
  },
};

export default environmentVars;
