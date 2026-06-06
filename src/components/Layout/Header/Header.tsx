import React, { FC, useEffect } from 'react';
import Burger from '../Burger/Burger';
import { Breadcrumb, BreadcrumbItem } from '../Navigation/Breadcrumb';

export interface HeaderProps {
    title?: string;
    breadcrumbItems?: BreadcrumbItem[];
    // Layout props
    hasSidebars: boolean | undefined;
    mobileSidebarsShown?: boolean;
    setSidebarsMobileShown?: (shown: boolean) => void;
}
const Header: FC<HeaderProps> = ({
    title,
    breadcrumbItems = [],
    hasSidebars,
    mobileSidebarsShown,
    setSidebarsMobileShown,
}) => {
    // Handle scroll for sticky header
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header') as HTMLElement;
            if (window.scrollY >= 20) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="header">
            {hasSidebars ? (
                <div className="content-item__prefix">
                    <Burger
                        hasSidebars={hasSidebars}
                        showSidebarMobile={mobileSidebarsShown}
                        setShowSidebarMobile={setSidebarsMobileShown}
                    />
                </div>
            ) : null}

            <div className="header__container">
                <div className="content-item">
                    <div className="content-item__meta">
                        <div className="content-item">
                            <div className="content-item__meta">
                                <div className="title-lg">{title}</div>
                                {breadcrumbItems.length > 0 ? <Breadcrumb items={breadcrumbItems} /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
