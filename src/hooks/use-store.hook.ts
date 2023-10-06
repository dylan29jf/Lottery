/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type State = {
  organization: string;
  logoOrganization: string;
  loadMembers: boolean;
  members: any;
  show: boolean;
  winners: any;
  settings: Settings;
  showWinner: boolean;
};

interface Settings {
  winPerPlayer: number;
  rounds: number;
  delay: number;
}

type Actions = {
  onChangeOrganization: (organization: string) => void;
  onChangeLogo: (logo: string) => void;
  onLoadMembers: () => void;
  onChangeMembers: (members: any) => void;
  onChangeShow: (value: boolean) => void;
  onChangeSettings: (settings: Settings) => void;
  onChangeWinners: (winners: any) => void;
  onChangeShowWinner: (value: boolean) => void;
};

export const useStore = create<State & Actions>((set) => ({
  organization: "",
  logoOrganization: "",
  loadMembers: false,
  members: [],
  show: false,
  winners: [],
  settings: {
    delay: 3,
    rounds: 3,
    winPerPlayer: 1,
  },
  showWinner: false,
  onChangeOrganization: (organization) => set(() => ({ organization })),
  onChangeLogo: (logo) => set(() => ({ logoOrganization: logo })),
  onLoadMembers: () => set(() => ({ loadMembers: true })),
  onChangeShow: (value: boolean) => set(() => ({ show: value })),
  onChangeMembers: (members: any) =>
    set(() => ({
      members,
    })),
  onChangeSettings: (settings: Settings) => set(() => ({ settings })),
  onChangeShowWinner: (value: boolean) => set(() => ({ showWinner: value })),
  onChangeWinners: (winners: any) => set(() => ({ winners })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useStore);
}
