export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Agent {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description: string | null;
  tags: string[] | null;
  compatibility: string[] | null;
  overview_md: string | null;
  payload_md: string | null;
  version: string;
  created_at: string;
}

export type AgentWithProfile = Agent & {
  profiles: Profile;
};
