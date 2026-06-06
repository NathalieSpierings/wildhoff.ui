import { useEffect } from 'react';
import { useLayoutContext } from '../../components/Providers/LayoutContext/LayoutContext';


const usePageTitle = (title: string, deps: any[] = []) => {
    const { setPageTitle } = useLayoutContext();

    useEffect(() => {
        setPageTitle(title);
    }, deps);
};

export default usePageTitle;
