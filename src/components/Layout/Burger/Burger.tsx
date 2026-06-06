import React from 'react';

export interface BurgerProps {
    hasSidebars: boolean | undefined;
    showSidebarMobile?: boolean;
    setShowSidebarMobile?: (shown: boolean) => void;
}

const Burger: React.FC<BurgerProps> = ({ hasSidebars, showSidebarMobile, setShowSidebarMobile }) => {
    let toggleMobileSidebars = () => {
        setShowSidebarMobile?.(!showSidebarMobile);
    };

    return hasSidebars ? (
        <button className="burger" onClick={toggleMobileSidebars}>
            <div className="burger__line"></div>
            <div className="burger__line"></div>
            <div className="burger__title">Menu</div>
        </button>
    ) : null;
};

export default Burger;
