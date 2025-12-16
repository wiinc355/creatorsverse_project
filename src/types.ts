export type Creator = {
  id?: string;           // optional for newly-created rows until db returns id
  name: string;
  url: string;
  description?: string;
  imageURL?: string;
  inserted_at?: string;  // optional metadata returned by supabase
};
