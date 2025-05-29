// app/recipe-generator/layout.jsx
'use client';

import Container from '@/components/shared/containers/Container';

export default function GeneratorRootLayout({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}
