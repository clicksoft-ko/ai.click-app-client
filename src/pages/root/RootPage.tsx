import { useAuth } from "@/shared/hooks/auth";
import { useEmitWithAck } from "@/shared/hooks/socket-io/use-emit-with-ack";
import { paths } from "@/shared/paths";
import { Button } from "@/widgets/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const RootPage = () => {
  const { emit } = useEmitWithAck("winAccountVerification", {
    clearKey: !open,
  });
  const [location, setLocation] = useState<GeolocationPosition>();
  const navigate = useNavigate();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
        },
        (err) => {},
      );
    } else {
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  
  const { user } = useAuth();
  return (
    <div className="text-red-500">
      {JSON.stringify(user)}
      <div className="text-blue-500 p-10 border border-blue-500 rounded-lg" >
        {JSON.stringify(location)}
      </div>
      <Button
        onClick={async () => {
          emit({
            userId: "z",
            password: "2z",
          });
        }}
      >
        api 호출
      </Button>
      <Button
        onClick={() => {
          navigate(paths.test);
        }}
      >
        sdsad
      </Button>
    </div>
  );
};
