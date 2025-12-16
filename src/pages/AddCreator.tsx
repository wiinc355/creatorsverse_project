import React, { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import { Creator } from "../types";

export default function AddCreator() {
  const nav = useNavigate();
  const [form, setForm] = useState<Creator>({ name: "", url: "", description: "", imageURL: "" });
  const [saving, setSaving] = useState(false);

  function change<K extends keyof Creator>(key: K, value: Creator[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSaving(true);
      const { data, error } = await supabase.from("creators").insert([form]).select().single();
      if (error) throw error;
      // if supabase returned the inserted row, navigate to it
      if (data?.id) nav(`/creator/${data.id}`);
      else nav("/");
    } catch (err) {
      console.error("Insert error", err);
      alert("Failed to add creator");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h2>Add Creator</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 640 }}>
        <label>
          Name
          <input value={form.name} onChange={e => change("name", e.target.value)} required />
        </label>

        <label>
          URL
          <input value={form.url} onChange={e => change("url", e.target.value)} required />
        </label>

        <label>
          Image URL
          <input value={form.imageURL} onChange={e => change("imageURL", e.target.value)} />
        </label>

        <label>
          Description
          <textarea value={form.description} onChange={e => change("description", e.target.value)} />
        </label>

        <div>
          <button type="submit" disabled={saving}>{saving ? "Saving…" : "Add Creator"}</button>
        </div>
      </form>
    </div>
  );
}
