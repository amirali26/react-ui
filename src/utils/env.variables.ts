interface CognitoConfig {
  poolId: string;
  clientId: string;
  storage: Storage;
}

interface EnvironmentConfig {
  REACT_APP_API_URL: string;
  REACT_APP_COGNITO: CognitoConfig;
  REACT_APP_COGNITO_CLIENT: CognitoConfig;
}

// Default is development
const environmentVars: EnvironmentConfig = {
  REACT_APP_API_URL: window.location.href.includes('solicitor.helpmycase.co.uk') ? 'https://dashboard-api.helpmycase.co.uk' : 'http://localhost:8080',
  REACT_APP_COGNITO: {
    poolId: 'eu-west-1_UKEN4PjSR',
    clientId: '74oeib76gt4308aiuo2hh9qpq1',
    storage: localStorage,
  },
  REACT_APP_COGNITO_CLIENT: {
    poolId: 'eu-west-1_mYIGCWPvH',
    clientId: '5a5sfrkr47tad84pkt3feucrd2',
    storage: localStorage,
  },
};

export default environmentVars;
