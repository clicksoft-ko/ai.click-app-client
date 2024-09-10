import { useMedicalStore } from '@/shared/stores';
import { useMemo } from 'react';
import { MedicalTab, WardTab } from '../enums';

const useSearchTab = () => {
  const tab = useMedicalStore((state) => state.tab);
  const isPending = useMedicalStore((state) => state.isPending);
  const searchString = useMedicalStore((state) => state.searchString);
  const setSearchString = useMedicalStore((state) => state.setSearchString);
  const setTab = useMedicalStore((state) => state.setTab);
  const setDateRange = useMedicalStore((state) => state.setDateRange);
  const dateRange = useMedicalStore((state) => state.dateRange);
  const showKeywords = useMemo(() => {
    return tab === MedicalTab.경과 || tab === WardTab.간호;
  }, [tab]);
  
  return {
    tab,
    isPending,
    searchString,
    setSearchString,
    setTab,
    setDateRange,
    dateRange,
    showKeywords,
  }
}

export { useSearchTab };

