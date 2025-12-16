import React from "react";
import { Creator } from "../types";
import { Link } from "react-router-dom";

type Props = {
  creator: Creator;
};

export default function CreatorCard({ creator }: Props) {
  return (
    <article>
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 6,
            marginBottom: 12,
          }}
        />
      )}

      <h3>{creator.name}</h3>

      <p>{creator.description}</p>

      <footer style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {creator.url && (
          <a href={creator.url} target="_blank" rel="noreferrer">
            Visit
          </a>
        )}

        <Link to={`/creator/${creator.id}`}>View</Link>

        {/* ✅ FIXED EDIT LINK */}
        <Link to={`/edit/${creator.id}`}>Edit</Link>
      </footer>
    </article>
  );
}




/*
import React from "react";
import { Creator } from "../types";
import { Link } from "react-router-dom";

type Props = {
  creator: Creator;
  onDelete?: (id: string) => Promise<void> | void;
};

export default function CreatorCard({ creator, onDelete }: Props) {
  return (
    <article
      style={{
        border: "1px solid #e5e7eb",
        padding: 12,
        borderRadius: 8,
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        marginBottom: 12,
      }}
    >
      <div style={{ width: 96, height: 96, flexShrink: 0 }}>
        {creator.imageURL ? (
          <img
            src={creator.imageURL}
            alt={creator.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              fontSize: 24,
            }}
          >
            📷
          </div>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0 }}>{creator.name}</h3>
        <p style={{ margin: "6px 0" }}>{creator.description}</p>

        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <a
            href={creator.url || "#"}
            target="_blank"
            rel="noreferrer"
            style={{ pointerEvents: creator.url ? "auto" : "none", opacity: creator.url ? 1 : 0.5 }}
          >
            Visit
          </a>
          <Link to={`/creator/${creator.id}`}>View</Link>
          <Link to={`/edit/${creator.id}`}>Edit</Link>
          {onDelete && creator.id && (
            <button
              onClick={() => onDelete(creator.id!)}
              style={{
                color: "#ef4444",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
/* <Link to={`/creator/${creator.id}/edit`}>Edit</Link> */