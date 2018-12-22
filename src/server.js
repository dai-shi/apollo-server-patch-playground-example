const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const interceptor = require('express-interceptor');

const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
const port = process.env.PORT || 3000;

const SCRIPT_TO_INJECT = `
  <script>
    window.addEventListener('load', () => {
      console.log('script injected');
      const store = window.s;
      setTimeout(() => {
        const headers = '{"Authorization": "Bearer token"}';
        store.dispatch({ type: 'EDIT_HEADERS', payload: { headers } });
      }, 2000);
    });
  </script>
`;
const END_BODY = '\n  </body>\n  </html>';
app.use(interceptor((req, res) => ({
  isInterceptable: () => /text\/html/.test(res.get('content-type')),
  intercept: (body, send) => {
    send(body.replace(END_BODY, SCRIPT_TO_INJECT + END_BODY));
  },
})));

server.applyMiddleware({ app });

app.get('/', (req, res) => {
  res.redirect(server.graphqlPath);
});

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});
