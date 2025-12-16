import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import AddCreator from "./pages/AddCreator";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";

export default function App() {
  return (
    <main className="container">
      <nav>
        <ul>
          <li><strong>Creatorverse 🌍</strong></li>
        </ul>
        <ul>
          <li><Link to="/">All Creators</Link></li>
          <li><Link to="/add">Add Creator</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/creator/:id" element={<ViewCreator />} />
        <Route path="/edit/:id" element={<EditCreator />} />
        <Route path="/add" element={<AddCreator />} />
      </Routes>
    </main>
  );
}



/* export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Creatorverse 🌍</h1>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">All Creators</Link> | <Link to="/add">Add Creator</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/creator/:id" element={<ViewCreator />} />
        <Route path="/edit/:id" element={<EditCreator />} />
        <Route path="/add" element={<AddCreator />} />
      </Routes>
    </div>
  );
}
  */
