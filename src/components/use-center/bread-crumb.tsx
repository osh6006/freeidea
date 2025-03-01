'use client';

import * as React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { helpcenterBreadCrumb } from '@/constants/breadcrumb';
import { cn } from '@/lib/utils';
import { Home02 } from '@untitled-ui/icons-react';

interface IUseCenterBreadCrumbProps {
  className?: string;
  title?: string;
}

const UseCenterBreadCrumb: React.FunctionComponent<
  IUseCenterBreadCrumbProps
> = ({ className, title }) => {
  const pathArr = usePathname().split('/');

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Breadcrumb className={cn('', className)}>
      <BreadcrumbList>
        {pathArr.map((path, i) => {
          return (
            <BreadcrumbItem key={path + i}>
              {i === 0 ? (
                <>
                  <BreadcrumbLink>
                    <Link href={`/${path}`}>
                      <Home02 className="w-5 h-5 text-slate-300" />
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator className="text-slate-300" />
                </>
              ) : pathArr.length - 1 !== i ? (
                <>
                  <BreadcrumbLink>
                    <Link
                      href={`/${path}`}
                      className="text-slate-300"
                    >
                      {helpcenterBreadCrumb[path as 'notice']}
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator className="text-slate-300" />
                </>
              ) : (
                <>
                  <BreadcrumbPage className="text-slate-500 ">
                    {title ? title : helpcenterBreadCrumb[path as 'notice']}
                  </BreadcrumbPage>
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default UseCenterBreadCrumb;
