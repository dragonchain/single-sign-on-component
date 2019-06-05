import mixpanel from 'mixpanel-browser';
import { GlobalConfig } from '../globals';

mixpanel.init(GlobalConfig.MIXPANEL_TOKEN, { cross_subdomain_cookie:false });
const envCheck = true;

const AnalyticAction = {
  identify: (id) => {
    if (envCheck) {
      mixpanel.identify(id);
    }
  },
  alias: (id) => {
    if (envCheck) {
      mixpanel.alias(id);
    }
  },
  track: (name, props) => {
    if (envCheck) {
      mixpanel.track(name, props);
    }
  },
  people: {
    set: (props) => {
      if (envCheck) {
        mixpanel.people.set(props);
      }
    },
    increment: (props) => {
      if (envCheck) {
        mixpanel.people.increment(props);
      }
    },
  },
};

export default AnalyticAction;
