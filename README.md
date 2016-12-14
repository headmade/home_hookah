Dev mode:

1. `yarn install`
2. `gulp clean && gulp`

Deploy:

0. Add `env.json` with **production** keys
1. `yarn install`
2. `gulp clean && gulp deploy --env prod`