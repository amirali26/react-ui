import Amplify from 'aws-amplify';

const amplifyConfiguration = Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_9kq0cNnpi',
    userPoolWebClientId: '4g0krklgt4d7vfjspcr72sb9qr',
    storage: localStorage,
  },
});

export default amplifyConfiguration;
