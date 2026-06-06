import React from 'react';
import { FC } from 'react';
import { Link } from 'react-router';

export type BreadcrumbItem = {
    label: string | undefined;
    href: string;
};

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
                {items.map((x, idx) => {
                    const active = idx === items.length - 1;

                    if (active) {
                        return (
                            <li key={x.label || idx} aria-label={x.label} className="breadcrumb__item active">
                                {x.label}
                            </li>
                        );
                    }

                    return (
                        <li key={x.label || idx} className="breadcrumb__item">
                            <Link to={x.href} aria-label={x.label}>
                                {x.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
export default Breadcrumb;
