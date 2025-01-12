// api.js

const API_CONFIG = {
    baseUrl: 'http://localhost:8000/dair',
    endpoints: {
      zones: '/get-zones',
      zoneTrains: '/get-zone-trains',
      trainData: '/fetch-train-data',
      modelStats: '/fetch-model-stats',
      filteredSchedule: '/get-filtered-schedule',
      trainArcs: '/process-train-arcs'
    }
  };
  
  const createApiRequest = async (endpoint, credentials, params = {}) => {
    const url = `${API_CONFIG.baseUrl}${endpoint}${params.path || ''}`;
    
    try {
      const response = await fetch(url, {
        headers: { 'Authorization': `Basic ${credentials}` }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  };


  export async function fetchZoneData(credentials) {
    try {
      return await createApiRequest(API_CONFIG.endpoints.zones, credentials);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch zone data');
    }
  }
    
  
  export async function fetchZoneTrains(selectedZone, credentials) {
    try {
      return await createApiRequest(
        API_CONFIG.endpoints.zoneTrains, 
        credentials, 
        { path: `/${selectedZone}` }
      );
    } catch (error) {
      alert('Error fetching train data. Please check console for details.');
    }
  }
  
  export async function fetchTrainData(selectedZone, credentials) {
    try {
      const data = await createApiRequest(
        API_CONFIG.endpoints.trainData,
        credentials,
        { path: `/${selectedZone}` }
      );
      
      return {
        trainMaster: data.trainMaster,
        trainSchedule: data.trainSchedule,
        rakeLink: data.rakeLink
      };
    } catch (error) {
      console.error('Error fetching train data:', error);
      throw error;
    }
  }
  
  export async function fetchModelStats(zone, credentials) {
    try {
      return await createApiRequest(
        API_CONFIG.endpoints.modelStats,
        credentials,
        { path: `/${zone}` }
      );
    } catch (error) {
      console.error('Error fetching statistics:', error);
      return null;
    }
  }


  export async function fetchFilteredSchedule(zone, trainId, credentials) {
    try {
      return await createApiRequest(
        API_CONFIG.endpoints.filteredSchedule,
        credentials,
        { path: `/${zone}/${trainId}` }
      );
    } catch (error) {
      console.error('Error fetching filtered schedule:', error);
      throw error;
    }
  }


  export async function processTrainArcs(zone, credentials) {
    try {
      return await createApiRequest(
        API_CONFIG.endpoints.trainArcs,
        credentials,
        { path: `/${zone}` }
      );
    } catch (error) {
      console.error('Error fetching filtered schedule:', error);
      throw error;
    }
  }