## Private Route
Wrapper to protect routes with authentication. If a session is not established, 
  the user is redirected to single-sign-on login. Expired sessions cause a
  redirection to SSO login.

```jsx
import { PrivateRoute } from '@dragonchain-dev/single-sign-on-component';

<PrivateRoute callback={{ token, user, orgs } => action(token, user, orgs)}>
  <Route exact path="/account" />
  <Route exact path="/settings" />
</PrivateRoute>
```

## Properties

**callback** `function`

Optional: Callback function to be executed after a user session is established

returns
```
object
```

Properties
- token: A cognito id token
- user: A object containing user attributes
- orgs: An array of organizations to which the user belongs

**fallback** `node`

Optional: A single node to show if a user is not authenticated.
