import { Header } from './Header';
import type { ReactNode } from 'react';

type TProps = {
  children: ReactNode;
};

export const Layout = ({ children }: TProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-1 p-4">{children}</main>
    </div>
  );
};
