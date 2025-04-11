import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const dashboardStatistique = async () => {
    try {
      const response = await api.get('v1/admin/dashboard');
    //   console.log(response.data);
      setData(response.data.data);
      return { success: true };
    } catch (error) {
      console.error('error dashboard', error);
      return {
        success: false,
        message: error.response?.data?.message || 'error dashboard'
      };
    }
  };

  useEffect(() => {
    dashboardStatistique().finally(() => setLoading(false));
  }, []);

  return (
    <DashboardContext.Provider value={{ data, loading }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
