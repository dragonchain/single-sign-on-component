## Private Element
Wrapper for React elements to return different components based on authentication status

```jsx
import { PrivateElement } from '@dragonchain-dev/single-sign-on-component';

<PrivateElement fallback={<div>Login to view Account</div>}>
  <button type="button" onClick={() => viewAccount()}>Account</button>
</PrivateElement>
```

## Properties

**fallback** `node`

Optional: A single node to show if a user is not authenticated.
