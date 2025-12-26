
import { 
  MOCK_RECORDS, 
  MOCK_FILES, 
  MOCK_LOGS, 
  ANALYSIS_STATS, 
  ANALYSIS_RESULTS, 
  ENGINE_METRICS 
} from '../constants';

export const dataService = {
  getDashboardRecords: async () => {
    // Simula latência de rede
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_RECORDS;
  },
  
  getImportFiles: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_FILES;
  },
  
  getEngineLogs: async () => {
    return MOCK_LOGS;
  },
  
  getAnalysisStats: async () => {
    return ANALYSIS_STATS;
  },
  
  getAnalysisResults: async () => {
    return ANALYSIS_RESULTS;
  },
  
  getEngineMetrics: async () => {
    return ENGINE_METRICS;
  }
};
