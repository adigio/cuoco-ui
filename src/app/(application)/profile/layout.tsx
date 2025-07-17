// app/recipe-generator/layout.jsx
'use client';

import Container from '@/components/shared/containers/Container';
import { LayoutProps } from '@/types/layout';


export default function ProfileLayout({ children }: LayoutProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}
