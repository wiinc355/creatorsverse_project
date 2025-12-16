import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import { Creator } from "../types";

export default function EditCreator() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [form, setForm] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    load();
  }, [id]);

  async function load() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();
      if (error) throw error;
      setForm(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function change<K extends keyof Creator>(key: K, value: Creator[K]) {
    setForm(prev => prev ? { ...prev, [key]: value } : prev);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form || !id) return;
    try {
      setSaving(true);
      const { error } = await supabase.from("creators").update(form).eq("id", id);
      if (error) throw error;
      nav(`/creator/${id}`);
    } catch (err) {
      console.error("Update error", err);
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!form) return <p>Creator not found.</p>;

  return (
    <div>
      <h2>Edit Creator</h2>

      <form onSubmit={handleSave} style={{ display: "grid", gap: 8, maxWidth: 640 }}>
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
          <input value={form.imageURL || ""} onChange={e => change("imageURL", e.target.value || undefined)} />
        </label>

        <label>
          Description
          <textarea value={form.description || ""} onChange={e => change("description", e.target.value || undefined)} />
        </label>

        <div>
          <button type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button>
        </div>
      </form>
    </div>
  );
}
