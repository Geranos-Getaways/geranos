import { create } from 'zustand';

/* ──────────────────────────────────────────────────────────
 *  Typings
 * ────────────────────────────────────────────────────────── */
interface ItineraryState {
  /** The itinerary object returned from WP-REST */
  itineraryInfo: any | null;

  /** UX flag for async operations */
  isLoading: boolean;

  /* ---------------- Mutators --------------- */
  setItineraryInfo: (data: any) => void;
  setIsLoading: (flag: boolean) => void;
}

/* ──────────────────────────────────────────────────────────
 *  Store
 * ────────────────────────────────────────────────────────── */
const useItineraryStore = create<ItineraryState>((set) => ({
  itineraryInfo: null,
  isLoading: false,

  setItineraryInfo: (data) => set({ itineraryInfo: data }),
  setIsLoading: (flag) => set({ isLoading: flag }),
}));

export default useItineraryStore;
