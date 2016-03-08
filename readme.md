_What do economists think would be the effect of Briatin leaving the EU?_

## built from <a href="https://github.com/tomgp/simple-ft-ig">Simple FT IG</a>

A light(ish)weight alternative to the full <a href="https://github.com/ft-interactive/starter-kit">starter-kit</a>. Provides some basic HTML and css, builds js modules but nothing more.

Assumes you have <a href="https://www.npmjs.com/package/srvlr">srvlr</a> installed globally

`npm install` installs dev dependencies

`npm run watch` watches (with <a href="https://github.com/substack/watchify">watchify</a>) for changes to the javascript files in './source' and rebuilds 'bundle.js' as required

`npm run start` starts the watch process and a srvlr

`npm run deploy` copies all the relevant files for  deployment to a directory, includes the contents of 'images' and 'data' directories