import { useAuth } from "@/shared/hooks/auth";
import { useEmitWithAck } from "@/shared/hooks/socket-io/use-emit-with-ack";
import { paths } from "@/shared/paths";
import { Button } from "@/widgets/ui/button";
import { useNavigate } from "react-router-dom";

export const RootPage = () => {
  const { data, isPending, error, emit } = useEmitWithAck(
    "winAccountVerification",
    {
      clearKey: !open,
    },
  );

  console.log("isPending", isPending);
  console.log("data", data);
  console.log("error", error);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div className="text-red-500">
      {JSON.stringify(user)}
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
