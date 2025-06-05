// app/recipe-generator/layout.jsx
'use client';

import Container from '@/components/shared/containers/Container';

interface LayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: LayoutProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}
