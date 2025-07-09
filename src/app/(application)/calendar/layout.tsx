// app/recipe-generator/layout.jsx
'use client';
import { LayoutProps } from '@/types/layout';
import Container from '@/components/shared/containers/Container'; 
export default function CalendarLayout({ children }: LayoutProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}
