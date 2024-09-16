import type { MetaFunction } from "@remix-run/cloudflare";
import type { LoaderFunction, ActionFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "JS-Logger" },
    { name: "description", content: "A simple logger app" },
  ];
};

export const loader: LoaderFunction = async ({ context, params }) => {
  let env = context.cloudflare.env as Env;

  let { results } = await env.DB.prepare("SELECT * FROM users LIMIT 5").all();

  return json(results);
};

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export const action: ActionFunction = async ({ request, context }) => {
  console.log("Action function called");
  // Return a response
  return null;
};

export default function Index() {
  const results = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to JS-Logger</h1>

      {/* Form to collect user data */}
      <form method="post">
        <label>
          Username: <input type="text" name="username" />
        </label>
        <label>
          Email: <input type="email" name="email" />
        </label>
        <label>
          Password: <input type="password" name="password" />
        </label>
        <button type="submit">Submit</button>
      </form>

      {/* Display the data fetched from the database */}
      <div>
        <h2>Existing Users</h2>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
    </div>
  );
}
