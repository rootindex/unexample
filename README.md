# Unexample - the lazy tool for devops
Convert .env.example to .env whilst using any exported variables to fill in any missing data. 

This package was created to provide a cli tool for CI/CD automations.

## Installation and usage examples

```
# install globally 
npm install unexample -g

# and use it
unexample --input ./project/.env.example --output ./project/.env --force
``` 

```
# run without global installation
npx unexample -i .env.example -o .env.production
```
