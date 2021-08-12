import { GraphQLClient } from "graphql-request";

import { getSdk } from "./generated";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string, {
  fetch,
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}`,
  },
});

export default getSdk(client);
