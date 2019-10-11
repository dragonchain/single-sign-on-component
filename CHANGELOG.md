# Changelog

## Version 4.1.3

- **Feature**:
  - Add groups
  

## Version 4.1.1

- **Feature**:
  - Allow override of REACT_APP_VERSION with USER_POOL

- **Development**
  - Bump @dragonchain-dev/cognito-wrapper version to 4.2.3 fom 4.2.3


## Version 4.1.0

- **Feature**:
  - Add fallback render
  - Add conditional check for callback method

- **Development**
  - Bump @dragonchain-dev/cognito-wrapper version to 4.2.2 fom 4.2.1
  - Add error handling for account-service calls


## Version 4.0.7

- **Development**
  - Remove mix-panel 
  - Move react to peer-dependency 
  - Move prop-types to peer-dependency 


## Version 4.0.4

- **BugFix**
  - Move babel-polyfill to peer-dependency


## Version 4.0.4

- **Packaging**
  - Update buildspec to publish


## Version 4.0.3

- **Packaging**
  - Update buildspec to execute build command


## Version 4.0.2

- **Feature**:
  - Removes `__org__` from **User** object
  - Changes **User** export to **Account**
  - Changes **data** function to **user** in Account
  - Changes userSessionCallback arguments to object containing
      - token
      - user
      - orgs
  - Adds orgs to userSessionCallback arguments
  - Adds **orgs** function to **Account**
- **BugFix**
  - None
- **Documentation**:
  - Added changelog
- **Development**:
  - Added codeowners @deanshelton913 @emtesenair and @noahgribbin
- **Testing**
  - none
- **Packaging**
  - none
