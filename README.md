# apollo-server-patch-playground-example
An example to patch GraphQL Playground with Apollo Server

## Background

Apollo server provides Playground without any configuration.
Playground accepts some options to congfigure its theme or something.

Now, I want to run a script automatically in the browser.
Specifically, I need an authorization token to put in headers.

This example shows how to inject a client script with apollo-server-express.

Please note that this is a workaround and any better solution 
would be desired. Use this workaround at your own risk.

## How to run

```bash
git clone https://github.com/dai-shi/apollo-server-patch-playground-example.git
cd apollo-server-patch-playground-example
npm install
npm start
```

Then, open http://localhost:3000/graphql
