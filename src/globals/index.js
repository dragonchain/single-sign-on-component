import globalConfig from './globalConfig.json';
import * as Errors from './errors';

const stage = process.env.REACT_APP_USER_POOL || process.env.REACT_APP_STAGE;
const env = (stage === 'production' || stage === 'local' || stage === 'development') ? stage : 'local';

const GlobalConfig = globalConfig[env];

export { GlobalConfig, Errors, env };
