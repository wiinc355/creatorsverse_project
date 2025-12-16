import React, { useEffect } from "react";
import { supabase } from "../client";

export default function TestClient() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase.from("creators").select("*");
      if (error) console.error("Supabase error:", error);
      else console.log("Supabase data:", data);
    }

    test();
  }, []);

  return <p>Check the console for Supabase test results</p>;
}
