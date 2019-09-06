# Changelog

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

## Version 4.0.3

- **Packaging**
  - Update buildspec to execute build command  

## Version 4.0.4

- **Packaging**
  - Update buildspec to publish

## Version 4.0.4

- **BugFix**
  - Move babel-polyfill to peer-dependency

## Version 4.0.7

- **Development**
  - Remove mix-panel 
  - Move react to peer-dependency 
  - Move prop-types to peer-dependency 
