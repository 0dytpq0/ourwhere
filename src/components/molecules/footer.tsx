'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { usePathname } from 'next/navigation';
import { ComponentProps, PropsWithChildren } from 'react';

const footerVariants = cva(' bg-header-color text-white text-center py-4 bottom-0 left-0 w-full z-10', {
  variants: {
    position: {
      fixed: 'fixed',
      sticky: 'sticky'
    }
  }
});

type FooterVariant = VariantProps<typeof footerVariants>;
type FooterProps = FooterVariant & ComponentProps<'footer'>;

export default function Footer({ position, ...props }: PropsWithChildren<FooterProps>) {
  const pathname = usePathname();
  const isMeetingPath = pathname.startsWith('/meeting');
  const Position = isMeetingPath && position === undefined ? null : 'fixed';
  return (
    <footer className={footerVariants({ position: Position })} {...props}>
      {' '}
      &copy; 2024 독수리오남매. All rights reserved.
    </footer>
  );
}
