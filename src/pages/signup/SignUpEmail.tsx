
interface SignUpEmailProps {
  email: string | undefined;
}
export const SignUpEmail = ({ email }: SignUpEmailProps) => {
  return <p>{`${email} 로 인증 메일을 보냈습니다.`}</p>;
};
