import * as React from 'react';

type BreadcrumbProps = React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode;
};
declare const Breadcrumb: {
    ({ ...props }: BreadcrumbProps): React.JSX.Element;
    displayName: string;
};
type BreadcrumbListProps = React.ComponentPropsWithoutRef<'ol'>;
declare const BreadcrumbList: {
    ({ className, ...props }: BreadcrumbListProps): React.JSX.Element;
    displayName: string;
};
type BreadcrumbItemProps = React.ComponentPropsWithoutRef<'li'>;
declare const BreadcrumbItem: {
    ({ className, ...props }: BreadcrumbItemProps): React.JSX.Element;
    displayName: string;
};
type BreadcrumbLinkProps = React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
};
declare const BreadcrumbLink: {
    ({ asChild, className, ...props }: BreadcrumbLinkProps): React.JSX.Element;
    displayName: string;
};
type BreadcrumbPageProps = React.ComponentPropsWithoutRef<'a'>;
declare const BreadcrumbPage: {
    ({ className, ...props }: BreadcrumbPageProps): React.JSX.Element;
    displayName: string;
};
declare const BreadcrumbSeparator: {
    ({ children, className, ...props }: React.ComponentProps<"li">): React.JSX.Element;
    displayName: string;
};
declare const BreadcrumbEllipsis: {
    ({ className, ...props }: React.ComponentProps<"span">): React.JSX.Element;
    displayName: string;
};

export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };
