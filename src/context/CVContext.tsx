import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CVData, ContactMessage } from '../types';
import { fetchCVData, setSimulatedError, isSimulatedError } from '../services/api';
import { storage } from '../services/storage';

interface CVContextType {
  cvData: CVData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  isErrorSimulationActive: boolean;
  toggleErrorSimulation: () => void;
  messages: ContactMessage[];
  addContactMessage: (msg: ContactMessage) => void;
  favoriteProjects: string[];
  toggleFavoriteProject: (id: string) => void;
}

const CVContext = createContext<CVContextType | null>(null);

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isErrorSimulationActive, setIsErrorSimulationActive] = useState<boolean>(false);
  const [messages, setMessages] = useState<ContactMessage[]>(() => storage.getContactMessages());
  const [favoriteProjects, setFavoriteProjects] = useState<string[]>(() =>
    storage.getFavoriteProjects()
  );

  // Manual refresh callback
  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCVData();
      setCvData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load with cleanup flag to avoid cascading renders
  useEffect(() => {
    let isMounted = true;

    fetchCVData()
      .then((data) => {
        if (isMounted) {
          setCvData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Terjadi kesalahan sistem.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleErrorSimulation = () => {
    const nextState = !isSimulatedError();
    setSimulatedError(nextState);
    setIsErrorSimulationActive(nextState);
  };

  const addContactMessage = (msg: ContactMessage) => {
    storage.saveContactMessage(msg);
    setMessages((prev) => [msg, ...prev]);
  };

  const toggleFavoriteProject = (id: string) => {
    const updated = storage.toggleFavoriteProject(id);
    setFavoriteProjects(updated);
  };

  return (
    <CVContext.Provider
      value={{
        cvData,
        loading,
        error,
        refresh,
        isErrorSimulationActive,
        toggleErrorSimulation,
        messages,
        addContactMessage,
        favoriteProjects,
        toggleFavoriteProject,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCVData() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCVData must be used within a CVProvider');
  }
  return context;
}
