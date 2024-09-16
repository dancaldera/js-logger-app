import type { MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "JS-Logger" },
    { name: "description", content: "A simple logger app" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>JS-Logger</h1>
      <p>A simple logger app for js</p>
      <a href="/users">View Users</a>
    </div>
  );
}
