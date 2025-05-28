// app/recipe-generator/layout.jsx
'use client';

import Container from '@/components/shared/containers/Container';
import { Props } from 'next/script';

export default function GeneratorRootLayout({ children }: Props) {
  return (
    <Container>
      {children}
    </Container>
  );
}
