import React from 'react';
import { navigateApp } from './appRoutes';

type AppLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
  onNavigate?: () => void;
};

export const AppLink: React.FC<AppLinkProps> = ({ to, onNavigate, onClick, target, download, ...props }) => (
  <a
    {...props}
    href={to}
    target={target}
    download={download}
    onClick={(event) => {
      onClick?.(event);
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || target || download) return;
      if (!to.startsWith('/') || to.startsWith('//')) return;
      event.preventDefault();
      navigateApp(to);
      onNavigate?.();
    }}
  />
);
