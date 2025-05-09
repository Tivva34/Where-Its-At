import { useState, useEffect } from "react";

export function useLocalStorage() {
  const [savedEvents, setSavedEvents] = useState(() => {
    const stored = localStorage.getItem("saved-events");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("saved-events", JSON.stringify(savedEvents));
  }, [savedEvents]);

  const addToSaved = (event) => {
    if (!savedEvents.some((e) => e.id === event.id)) {
      setSavedEvents([...savedEvents, event]);
    }
  };

  const removeFromSaved = (id) => {
    setSavedEvents(savedEvents.filter((e) => e.id !== id));
  };

  const clearSaved = () => {
    setSavedEvents([]);
    localStorage.removeItem("saved-events");
  };

  return { savedEvents, addToSaved, removeFromSaved, clearSaved };
}
