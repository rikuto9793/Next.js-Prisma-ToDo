// app/page.tsx
"use client";
import { useEffect, useState } from "react";

interface Todo { id: string; title: string; done: boolean; createdAt: string }

export default function Home() {
const [todos, setTodos] = useState<Todo[]>([]);
const [title, setTitle] = useState("");
const load = async () => {
const res = await fetch("/api/todos", { cache: "no-store" });
if (res.ok) setTodos(await res.json());
};
useEffect(() => { load(); }, []);

const addTodo = async (e: React.FormEvent) => {
e.preventDefault();
if (!title.trim()) return;
const res = await fetch("/api/todos", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ title }),
});
if (res.ok) { setTitle(""); load(); }
};

const done = async (id: string) => {
const res = await fetch(`/api/todos/${id}`, { method: "PATCH" });
if (res.ok) load();
};

const del = async (id: string) => {
const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
if (res.ok) load();
};

return (
<main className="max-w-xl mx-auto p-6">
<h1 className="text-3xl font-bold mb-6">My ToDo</h1>
<form onSubmit={addTodo} className="flex gap-2 mb-6">
<input className="flex-1 border rounded-xl p-3" placeholder="やること…" value={title} onChange={e=>setTitle(e.target.value)} />
<button className="rounded-xl px-4" type="submit">追加</button>
</form>
<ul className="space-y-2">
{todos.map(t => (
<li key={t.id} className="flex items-center gap-2 p-3 rounded-xl border">
<button onClick={() => done(t.id)} className="rounded-lg px-2 text-sm">
{t.done ? "✅" : "⬜"}
</button>
<span className={`flex-1 ${t.done ? "line-through text-gray-500" : ""}`}>{t.title}</span>
<button onClick={() => del(t.id)} className="text-sm">削除</button>
</li>
))}
</ul>
</main>
);
}