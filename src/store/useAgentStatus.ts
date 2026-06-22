import { create } from 'zustand';

type AgentStatus = 'pending' | 'active' | 'inactive';

type AgentStatusStore = {
  status: AgentStatus | null;
  setStatus: (status: AgentStatus) => void;
};

export const useAgentStatus = create<AgentStatusStore>((set) => ({
    status: 'pending',
    setStatus: (status) => set({ status }),
}));

