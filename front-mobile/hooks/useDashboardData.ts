import { useState, useEffect } from 'react';
import { RoleType } from '../navigation/types';
import { DashboardData, fetchDashboardData } from '../services/dashboard';

interface DashboardDataState {
  data: DashboardData | null;
  isLoading: boolean;
  error: Error | null;
}

export const useDashboardData = (role: RoleType) => {
  const [state, setState] = useState<DashboardDataState>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        const data = await fetchDashboardData(role);
        setState({ data, isLoading: false, error: null });
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error : new Error('Failed to fetch dashboard data'),
        }));
      }
    };

    loadData();
  }, [role]);

  const refreshData = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const data = await fetchDashboardData(role);
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Failed to fetch dashboard data'),
      }));
    }
  };

  return {
    ...state,
    refreshData,
  };
}; 