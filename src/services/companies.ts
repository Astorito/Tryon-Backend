import axios from 'axios';

type Company = {
  id: string;
  name: string;
  apiKey: string;
  model?: string;
  dailyLimit?: number;
  totalLimit?: number;
  status?: string;
};

const COMPANIES_URL = process.env.COMPANIES_URL || 'https://tryon-kappa.vercel.app/api/companies';

// Simple in-memory cache
let _companiesCache: { data: Company[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

async function fetchCompaniesFromRemote(): Promise<Company[]> {
  const res = await axios.get(COMPANIES_URL);
  return res.data as Company[];
}

export async function getCompanies(force = false): Promise<Company[]> {
  const now = Date.now();
  if (!force && _companiesCache && now - _companiesCache.fetchedAt < CACHE_TTL_MS) {
    return _companiesCache.data;
  }

  const data = await fetchCompaniesFromRemote();
  _companiesCache = { data, fetchedAt: now };
  return data;
}

export function clearCompaniesCache() {
  _companiesCache = null;
}

export async function getCompanyByApiKey(apiKey: string): Promise<Company | null> {
  if (!apiKey) return null;
  const list = await getCompanies();
  const found = list.find((c) => c.apiKey === apiKey);
  return found ?? null;
}

export async function getCompanyById(id: string): Promise<Company | null> {
  if (!id) return null;
  const list = await getCompanies();
  const found = list.find((c) => c.id === id);
  return found ?? null;
}

export type { Company };
