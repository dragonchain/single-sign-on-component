## Logout
Log a user out of their current session

Using SSO Context
```javascript
import { Logout, useSSOValue } from '@dragonchain-dev/single-sign-on-component';

const sso = useSSOValue();
Logout(sso)
```

Without SSO context usage
```javascript
import { Logout } from '@dragonchain-dev/single-sign-on-component';

Logout({
  login: 'https://localhost:3000/login/', 
  source: 'console',
  redirect: encodeURIComponent(window.location.href)
})
```

## Properties

**sso** `object`

Object of configuration strings to determine action to be taken upon logout.


Properties

- login: Path to single-sign-on login screen
- source: Source application name: 'console', 'den', 'academy', 'scale'
- redirect: Path to redirect window after logout


**redirectToAccounts** `boolean`

Prevent window redirection to single-sign-on login path

Defaults to

```
true
```
