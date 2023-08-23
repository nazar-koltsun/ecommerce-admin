'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const MainNav = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const params = useParams();

  console.log(pathName, params);

  const routes = [
    {
      href: `/${params.storeid}`,
      label: 'Overview',
      active: pathName === `/${params.storeid}`,
    },
    {
      href: `/${params.storeid}/settings`,
      label: 'Settings',
      active: pathName === `/${params.storeid}/settings`,
    },
  ];

  return (
    <nav className={cn('flex items-center space-x-4 ld:space-x-6', className)}>
      {routes.map((route) => (
        <Link 
          key={route.href} 
          href={route.href}
          className={cn('text-sm font-medium transition-color hover:text-yellow-700', route.active ? 'text-black dark:text-white' : 'text-muted-foreground')}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
