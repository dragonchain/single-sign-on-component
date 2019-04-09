import hopperConfig from './hopperConfig.js';
import * as Errors from './errors';

const env = process.env.REACT_APP_STAGE === 'production' ? 'production' : 'development';
const HopperConfig = hopperConfig[env];

export { HopperConfig, Errors };
