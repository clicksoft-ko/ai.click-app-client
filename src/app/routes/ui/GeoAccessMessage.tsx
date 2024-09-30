import { Button } from "@/widgets/ui";

interface GeoAccessMessageProps {
  message: string;
  description?: string;
  showReloadButton?: boolean;
}

export const GeoAccessMessage = ({
  message,
  description,
  showReloadButton = true,
}: GeoAccessMessageProps) => (
  <div className="flex h-screen items-center justify-center">
    <div className="space-y-2 text-center">
      <h1 className="text-2xl font-bold whitespace-pre-line">{message}</h1>
      {description && <p className="text-sm text-gray-500">{description}</p>}
      {showReloadButton && (
        <Button
          variant="destructive"
          onClick={() => {
            window.location.reload();
          }}
        >
          다시 시도
        </Button>
      )}
    </div>
  </div>
);
