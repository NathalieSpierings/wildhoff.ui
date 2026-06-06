import { useEffect } from 'react';
import { useLayoutContext } from '../../components/Providers/LayoutContext/LayoutContext';
import { BreadcrumbItem } from '../../components/Layout/Navigation/Breadcrumb';

const useBreadcrumb = (items: BreadcrumbItem[], deps: any[] = []) => {
    const { setBreadcrumbItems } = useLayoutContext();

    useEffect(() => {
        setBreadcrumbItems(items);
    }, deps);
};

export default useBreadcrumb;
