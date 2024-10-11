import { useSearchStore } from '@/shared/stores';
import { useMemo } from 'react';
import { MedicalTab, WardTab } from '../enums';

const useSearchTab = () => {
  const tab = useSearchStore((state) => state.tab);
  const isPending = useSearchStore((state) => state.isPending);
  const searchString = useSearchStore((state) => state.searchString);
  const setSearchString = useSearchStore((state) => state.setSearchString);
  const setTab = useSearchStore((state) => state.setTab);
  const setDateRange = useSearchStore((state) => state.setDateRange);
  const dateRange = useSearchStore((state) => state.dateRange);
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

