import EmailVerificationForm from '../../../components/auth/EmailVerificationForm';

export const metadata = {
  title: 'Verify Email - TalentFlow',
  description: 'Verify your TalentFlow email address',
};

interface VerifyEmailPageProps {
  params: {
    token: string;
  };
}

export default function VerifyEmailPage({ params }: VerifyEmailPageProps) {
  return <EmailVerificationForm token={params.token} />;
}