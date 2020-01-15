import globalConfig from './globalConfig.json';

const stage = process.env.REACT_APP_USER_POOL || process.env.REACT_APP_STAGE;
const domain = process.env.REACT_APP_DOMAIN || '.dragonchain.com';
const env =
  stage === 'production' || stage === 'local' || stage === 'development' ? stage : 'local';

const GlobalConfig = globalConfig[env];

export { GlobalConfig, domain, env };
