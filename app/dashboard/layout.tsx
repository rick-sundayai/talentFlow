import { DarkModeProvider } from '../contexts/DarkModeContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DarkModeProvider>
      {children}
    </DarkModeProvider>
  );
}