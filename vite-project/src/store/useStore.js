import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      tickets: [],
      addTicket: (ticket) =>
        set((state) => ({ tickets: [...state.tickets, ticket] })),
      addMultipleTickets: (tickets) =>
        set((state) => ({ tickets: [...state.tickets, ...tickets] })),
      clearTickets: () => set({ tickets: [] }),
    }),
    {
      name: "ordered-tickets",
    }
  )
);

export default useStore;
