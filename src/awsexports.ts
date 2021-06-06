import Amplify from 'aws-amplify';

const amplifyConfiguration = Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'eu-west-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'eu-west-1_vBPoYDFe5',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '2hr0sceqsguvu8rql6gpvij35m',

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_PASSWORD_AUTH',

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    clientMetadata: { myCustomKey: 'myCustomValue' },

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: 'helpmycase.auth.eu-west-1.amazoncognito.com',
      redirectSignIn: 'http://localhost:3000',
      redirectSignOut: 'http://localhost:3000',
      responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
});

export default amplifyConfiguration;
