import type { MetaFunction } from "@remix-run/cloudflare";
import type { LoaderFunction, ActionFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "JS-Logger" },
    { name: "description", content: "A simple logger app" },
  ];
};

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export const loader: LoaderFunction = async ({ context, params }) => {
  let env = context.cloudflare.env as Env;

  let { results } = await env.DB.prepare("SELECT * FROM users LIMIT 5").all();

  return json(results);
};

export const action: ActionFunction = async ({ request, context }) => {
  let env = context.cloudflare.env as Env;
  let formData = await request.formData();
  let username = formData.get("username") as string;
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;

  // Insert data into the database
  try {
    await env.DB.prepare(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
    )
      .bind(username, email, password)
      .run();
  } catch (error) {
    console.log("Error inserting data into the database", error);
  }

  // Redirect to the users page
  return redirect("/users");
};

export default function Index() {
  const results = useLoaderData<typeof loader>();
  return (
    <div>
      {/* Display the data fetched from the database */}
      <div>
        <h2>Existing Users</h2>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
      {/* Form to collect user data */}
      <form method="post">
        <label>
          Username:{" "}
          <input
            className="border border-gray-300 rounded-md"
            type="text"
            name="username"
          />
        </label>
        <label>
          Email:{" "}
          <input
            className="border border-gray-300 rounded-md"
            type="email"
            name="email"
          />
        </label>
        <label>
          Password:{" "}
          <input
            className="border border-gray-300 rounded-md"
            type="password"
            name="password"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
