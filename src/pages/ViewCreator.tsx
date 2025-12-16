import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import { Creator } from "../types";

export default function ViewCreator() {
  const { id } = useParams<{ id: string }>();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;
    loadCreator(id);
  }, [id]);

  async function loadCreator(cid: string) {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("creators").select("*").eq("id", cid).single();
      if (error) throw error;
      setCreator(data);
    } catch (err) {
      console.error("Load creator", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!id || !confirm("Delete this creator?")) return;
    const { error } = await supabase.from("creators").delete().eq("id", id);
    if (error) {
      console.error(error);
      alert("Failed to delete");
      return;
    }
    nav("/");
  }

  if (loading) return <p>Loading...</p>;
  if (!creator) return <div>Creator not found. <Link to="/">Back</Link></div>;

  return (
    <div>
      <Link to="/">← Back</Link>
      <h2>{creator.name}</h2>
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} style={{ maxWidth: 320, borderRadius: 8 }} />}
      <p>{creator.description}</p>
      <p><a href={creator.url} target="_blank" rel="noreferrer">Visit Channel</a></p>

      <div style={{ marginTop: 12 }}>
        <Link to={`/edit/${creator.id}`}>Edit</Link>{" "}
        <button onClick={handleDelete} style={{ marginLeft: 8 }}>Delete</button>
      </div>
    </div>
  );
}
