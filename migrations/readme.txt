For further information, please refer to the documentation:
https://developers.cloudflare.com/workers/wrangler/commands#migrations-create

To Check the connection to d1, you can use the following command:

wrangler d1 execute js-logger --remote --command "SELECT * FROM users LIMIT 100;"

note: use preview flag for development db

For migrations use accordingly these commands:

wrangler d1 migrations create js-logger <migration-name>

wrangler d1 migrations list js-logger

wrangler d1 migrations apply js-logger

for production db use the following command:
wrangler d1 migrations apply js-logger --remote

for development db use the following command:
wrangler d1 migrations apply js-logger --remote --preview
