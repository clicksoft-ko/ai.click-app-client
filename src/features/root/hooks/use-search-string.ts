import { useSearchStore } from '@/shared/stores';

export const useSearchString = () => {
  const tab = useSearchStore((state) => state.tab);
  const searchString = useSearchStore((state) => state.searchString);

  return { searchString: searchString?.[tab ?? ""] }
}
