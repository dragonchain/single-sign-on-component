import APIs from './ApiSingletons';

export default class HopperApiWrapper {
  constructor() {}

  useTotpRecoveryCode = async (username, recoveryCode) => {
    try {
      const recoveryState = await APIs.hopperApi.post('/totp-recovery', {
        username,
        recoveryCode,
      }, null)
      if (recoveryState.status === 'disabled') {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
