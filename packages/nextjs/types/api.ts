export interface Protocol {
  id: string;
  name: string;
  symbol: string;
  url: string;
  description: string;
  chain: string;
  logo: string;
  audits: string;
  category: string;
  chains: string[];
  tvl: number;
  change_1h: number;
  change_1d: number;
  change_7d: number;
  address: string | null;
  referralUrl: string | null;
  audit_note: string | null;
  gecko_id: string | null;
  cmcId: string | null;
  module: string;
  treasury: string | null;
  twitter: string;
  audit_links: string[];
  openSource: boolean | null;
  governanceID: string[];
  github: string[];
  chainTvls: { [key: string]: number };
}

export interface ApiResponse {
  [key: string]: Protocol;
}
