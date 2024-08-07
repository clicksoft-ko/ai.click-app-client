import { useMedicalStore } from '@/shared/stores';

export const useSearchString = () => {
  const tab = useMedicalStore((state) => state.tab);
  const searchString = useMedicalStore((state) => state.searchString);

  return { searchString: searchString?.[tab ?? ""] }
}
