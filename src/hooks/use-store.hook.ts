/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
type State = {
  organization: string;
  loadMembers: boolean;
  members: any;
};

type Actions = {
  onChangeOrganization: (organization: string) => void;
  onLoadMembers: () => void;
  onChangeMembers: (members: any) => void;
};

export const useStore = create<State & Actions>((set) => ({
  organization: "",
  onChangeOrganization: (organization) => set(() => ({ organization })),
  loadMembers: false,
  members: {},
  onLoadMembers: () => set(() => ({ loadMembers: true })),
  onChangeMembers: (members: any) =>
    set(() => ({
      members,
    })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useStore);
}
