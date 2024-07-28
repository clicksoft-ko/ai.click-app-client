import { useEffect, useState } from 'react';
import { useFetchRoomKey } from './use-fetch-room-key';
import { useVerify } from './use-verify';

export const useSignUpVerify = () => {
  const [hsUserId, setHsUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { state, setVerify } = useVerify();

  const {
    mutateAsync,
    data,
    error: fetchError,
    isPending,
  } = useFetchRoomKey({ hsUserId });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!hsUserId.trim()) {
      return setError("병원 계정을 입력하세요.");
    }

    const { roomKey } = await mutateAsync();
    if (!roomKey) {
      return setError("병원 계정정보를 찾을 수 없습니다.");
    }

    setError("");
    setVerify({ hsUserId })
    setOpen(true);
  }

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message);
    }
  }, [fetchError])

  return { data, hsUserId, setHsUserId, open, setOpen, error, handleSubmit, isPending }
}
