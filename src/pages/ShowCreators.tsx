import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { Creator } from "../types";
import CreatorCard from "../components/CreatorCard";

export default function ShowCreators() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("name");

      if (error) {
        console.error(error);
      } else {
        setCreators(data || []);
      }

      setLoading(false);
    }

    fetchCreators();
  }, []);

  if (loading) return <p>Loading creators…</p>;
  if (creators.length === 0) return <p>No creators found.</p>;

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16,
      }}
    >
      {creators.map((creator) => (
        <CreatorCard key={creator.id} creator={creator} />
      ))}
    </section>
  );
}
