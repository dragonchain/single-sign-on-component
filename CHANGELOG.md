# Changelog

## Version 6.2.1

- **Development**
  - Replace gulp with webpack

## Version 6.2.0

- **Feature**:
  - Add ability to restrict access by group

## Version 6.1.0

- **Feature**:
  - Add Login component

- **Documentation**:
  - Correct Logout documentation

## Version 6.0.0

- **Backwards Compatibility**
  - Version 6.0.0 is a breaking change. Use version 5.0.3 if you do not plan to update and continue using legacy code.

- **Feature**:
  - Add authentication context
  - Add Private Element to allow for auth at a component level
  - Add Single-Sign-On as a top-level container
  - Update Private Route to use hooks and context
  - Update Logout to accept auth context from parent app

- **Development**
  - Upgrade React to 6.12.0 and move to hooks


## Version 5.0.0

- **Feature**:
  - Add login with user refresh token for scale & academy
  - Add option to override account ui path
  - Add option to override app domain

- **Development**
  - Bump @dragonchain-dev/cognito-wrapper version to 4.2.4 fom 5.0.2


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
- **Documentation**:
  - Added changelog
- **Development**:
  - Added codeowners @deanshelton913 @emtesenair and @noahgribbin
