import { useGeoLocation } from "@/shared/hooks";
import { useAuth } from "@/shared/hooks/auth";
import { useEmitWithAck } from "@/shared/hooks/socket-io/use-emit-with-ack";
import { paths } from "@/shared/paths";
import { Button } from "@/widgets/ui/button";
import { useNavigate } from "react-router-dom";

export const RootPage = () => {
  const { emit } = useEmitWithAck("winAccountVerification", {
    clearKey: !open,
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  const { location } = useGeoLocation();

  return (
    <div className="text-red-500">
      <div className="flex flex-col gap-2">
        <div>
          lat: {location?.lat}
          <br />
          lng: {location?.lng}
        </div>
      </div>
      {JSON.stringify(user)}
      <div className="rounded-lg border border-blue-500 p-10 text-blue-500">
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
