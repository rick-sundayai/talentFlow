import ResetPasswordForm from '../../../components/auth/ResetPasswordForm';

export const metadata = {
  title: 'Reset Password - TalentFlow',
  description: 'Reset your TalentFlow password',
};

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  return <ResetPasswordForm token={params.token} />;
}