// src/hooks/useRealtimeStream.js
import { useEffect } from "react";

const API_URL = "http://localhost:3000";

export default function useRealtimeStream({
  onRelationshipLinked,
  onRelationshipUnlinked,
} = {}) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const url = `${API_URL}/realtime/stream?token=${encodeURIComponent(token)}`;
    const es = new EventSource(url);

    es.addEventListener("relationship_linked", (evt) => {
      try {
        const data = JSON.parse(evt.data);
        onRelationshipLinked?.(data);
      } catch {}
    });

    es.addEventListener("relationship_unlinked", (evt) => {
      try {
        const data = JSON.parse(evt.data);
        onRelationshipUnlinked?.(data);
      } catch {}
    });

    return () => {
      es.close();
    };
  }, [onRelationshipLinked, onRelationshipUnlinked]);
}
