
interface Props {
  errorMessage: string | undefined;
}
export const ErrorBox = ({ errorMessage }: Props) => {
  if (!errorMessage) return <></>;
  
  return (
    <div className="flex items-center justify-center rounded border border-red-200 bg-red-50 p-2 text-red-500 whitespace-pre-wrap">
      {errorMessage}
    </div>
  );
};
