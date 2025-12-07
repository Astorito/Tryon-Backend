import * as fs from 'fs';
import * as path from 'path';

export type UsageRecord = {
  empresaId: string;
  byDay: Record<string, number>;
};

type UsageStats = {
  [empresaId: string]: UsageRecord;
};

const USAGE_FILE = path.join(process.cwd(), 'data', 'usage.json');

// Cache en memoria
let _usageCache: UsageStats = {};

// Asegurar que el directorio existe
function ensureDataDir() {
  const dataDir = path.dirname(USAGE_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Cargar datos de archivo
function loadUsageData(): UsageStats {
  ensureDataDir();
  if (fs.existsSync(USAGE_FILE)) {
    try {
      const data = fs.readFileSync(USAGE_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.error('Error loading usage data:', e);
      return {};
    }
  }
  return {};
}

// Guardar datos a archivo
function saveUsageData() {
  ensureDataDir();
  fs.writeFileSync(USAGE_FILE, JSON.stringify(_usageCache, null, 2), 'utf-8');
}

// Obtener la fecha en formato YYYY-MM-DD
function getTodayKey(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// Inicializar cache al importar
_usageCache = loadUsageData();

/**
 * Registrar un uso de generación de imagen para una empresa
 */
export function logUse(empresaId: string): void {
  if (!empresaId) return;

  const today = getTodayKey();

  if (!_usageCache[empresaId]) {
    _usageCache[empresaId] = {
      empresaId,
      byDay: {},
    };
  }

  if (!_usageCache[empresaId].byDay[today]) {
    _usageCache[empresaId].byDay[today] = 0;
  }

  _usageCache[empresaId].byDay[today]++;

  // Guardar a archivo
  saveUsageData();
}

/**
 * Obtener estadísticas de uso para una empresa específica
 */
export function getStats(empresaId: string): {
  totalToday: number;
  totalMonth: number;
  byDay: Record<string, number>;
  lastDay?: string;
  lastCount?: number;
} {
  if (!_usageCache[empresaId]) {
    return {
      totalToday: 0,
      totalMonth: 0,
      byDay: {},
    };
  }

  const record = _usageCache[empresaId];
  const today = getTodayKey();
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];

  const totalToday = record.byDay[today] || 0;

  // Calcular total del mes
  let totalMonth = 0;
  Object.keys(record.byDay).forEach((day) => {
    if (day >= startOfMonth && day <= today) {
      totalMonth += record.byDay[day];
    }
  });

  // Obtener último día con uso
  const sortedDays = Object.keys(record.byDay).sort().reverse();
  const lastDay = sortedDays[0];
  const lastCount = lastDay ? record.byDay[lastDay] : undefined;

  return {
    totalToday,
    totalMonth,
    byDay: record.byDay,
    lastDay,
    lastCount,
  };
}

/**
 * Obtener estadísticas globales de todas las empresas
 */
export function getAllStats(): {
  [empresaId: string]: ReturnType<typeof getStats>;
} {
  const result: { [key: string]: ReturnType<typeof getStats> } = {};

  Object.keys(_usageCache).forEach((empresaId) => {
    result[empresaId] = getStats(empresaId);
  });

  return result;
}

/**
 * Obtener total global de generaciones del día
 */
export function getTotalToday(): number {
  const today = getTodayKey();
  let total = 0;

  Object.keys(_usageCache).forEach((empresaId) => {
    const record = _usageCache[empresaId];
    total += record.byDay[today] || 0;
  });

  return total;
}

/**
 * Obtener total global de generaciones del mes
 */
export function getTotalMonth(): number {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const today = getTodayKey();

  let total = 0;

  Object.keys(_usageCache).forEach((empresaId) => {
    const record = _usageCache[empresaId];
    Object.keys(record.byDay).forEach((day) => {
      if (day >= startOfMonth && day <= today) {
        total += record.byDay[day];
      }
    });
  });

  return total;
}

/**
 * Obtener historial de generaciones por día (últimos 30 días)
 */
export function getDayHistory(days: number = 30): Array<{ fecha: string; cantidad: number }> {
  const now = new Date();
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const today = getTodayKey();

  const dailyTotals: Record<string, number> = {};

  Object.keys(_usageCache).forEach((empresaId) => {
    const record = _usageCache[empresaId];
    Object.keys(record.byDay).forEach((day) => {
      if (day >= startDate && day <= today) {
        dailyTotals[day] = (dailyTotals[day] || 0) + record.byDay[day];
      }
    });
  });

  return Object.keys(dailyTotals)
    .sort()
    .map((fecha) => ({
      fecha,
      cantidad: dailyTotals[fecha],
    }));
}

/**
 * Limpiar datos de uso (para testing)
 */
export function clearUsageData(): void {
  _usageCache = {};
  saveUsageData();
}
