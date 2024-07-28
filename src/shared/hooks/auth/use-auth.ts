import { fetchUser } from '@/shared/api/user';
import { getToken } from '@/shared/utils/cookies/token';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const token = getToken();
  const { data, isLoading } = useQuery({
    queryFn: fetchUser,
    queryKey: [token],
    staleTime: 1000 * 60, // 캐시 1분
    gcTime: 1000 * 60 * 2, // 메모리 유지 2분
    enabled: !!token,
  });

  return { user: data, isAuthenticated: !!data, isLoading };
}
