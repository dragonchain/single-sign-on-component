## Single Sign On
The top level container for Single Sign On

```jsx
import { SingleSignOn } from '@dragonchain-dev/single-sign-on-component';

<SingleSignOn source="den" history={history} login="http://localhost:3000/login/">
  ...
</SingleSignOn>
```

## Properties

**source** `string`

Short name of Application using SSO

One of
```
console
den
academy
scale
```

**history** `object`

React browser history object

**login** `string`

Path to single-sign-on login screen

Example
```
https://account.dragonchain.com/login/
```

**callback** `function`

Optional: Callback function to be executed after a user session is established

Returns:

isAuthenticated `boolean`

**redirect** `string`

Optional: Application redirect path after successful login

Example
```
https://den.dragonchain.com/l/
```
