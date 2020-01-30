## Login
Log a user out of their current session

Using SSO Context
```javascript
import { Login, useSSOValue } from '@dragonchain-dev/single-sign-on-component';

const sso = useSSOValue();
Login(sso)
```

Without SSO context usage
```javascript
import { Login } from '@dragonchain-dev/single-sign-on-component';

Login({
  login: 'https://localhost:3000/login/', 
  source: 'console',
  redirect: encodeURIComponent(window.location.href)
})
```

## Properties

**sso** `object`

Object of configuration strings to determine action to be taken for login.


Properties

- login: Path to single-sign-on login screen
- source: Source application name: 'console', 'den', 'academy', 'scale'
- redirect: Path to redirect window after login
