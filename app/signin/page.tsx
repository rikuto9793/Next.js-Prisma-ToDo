// app/signin/page.tsx
"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
return (
<main className="min-h-dvh grid place-items-center p-6">
<div className="max-w-sm w-full p-6 rounded-2xl shadow">
<h1 className="text-2xl font-bold mb-4">Welcome</h1>
<p className="mb-6 text-sm text-gray-600">GitHubでサインインしてください。</p>
<button className="w-full rounded-xl p-3 shadow" onClick={() => signIn("github")}>Sign in with GitHub</button>
</div>
</main>
);
}