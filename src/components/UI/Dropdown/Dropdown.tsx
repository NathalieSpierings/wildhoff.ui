import { ReactNode, useEffect, useRef, useState } from "react";
import Icon from "../Icons/Icon/Icon";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import React from "react";
import ContentItem from "../../Base/ContentItem/ContentItem";
import { DropdownItem } from "./DropdownItem";

function getScrollParents(el: HTMLElement | null): HTMLElement[] {
    const parents: HTMLElement[] = [];

    let current = el?.parentElement;

    while (current) {
        const style = globalThis.getComputedStyle(current);

        const isScrollable =
            /(auto|scroll|hidden)/.test(
                style.overflow +
                style.overflowY +
                style.overflowX
            );

        if (isScrollable) {
            parents.push(current);
        }

        current = current.parentElement;
    }

    return parents;
}

function getEffectiveBounds(element: HTMLElement) {
    const rects: DOMRect[] = [];

    rects.push({
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
        width: window.innerWidth,
        height: window.innerHeight,
        x: 0,
        y: 0,
        toJSON: () => { }
    } as DOMRect);

    const parents = getScrollParents(element);

    for (const p of parents) {
        rects.push(p.getBoundingClientRect());
    }

    return rects.reduce((acc, r) => {
        return {
            top: Math.max(acc.top, r.top),
            left: Math.max(acc.left, r.left),
            right: Math.min(acc.right, r.right),
            bottom: Math.min(acc.bottom, r.bottom),
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            toJSON: () => { }
        } as DOMRect;
    });
}

export type DropdownVerticalPlacement = "auto" | "down" | "up";
export type DropdownHorizontalPlacement = "auto" | "left" | "right";

// Trigger
export interface DropdownTrigger {
    prefix?: ReactNode;
    label?: ReactNode;
    variant?: 'default' | 'input';
    arrow?: boolean;
    dropdownTriggerCss?: string;
}

// Tabs
export interface DropdownTabItem {
    id: string;
    content: ReactNode;
    disabled?: boolean;
}

export interface DropdownTabPane {
    id: string;
    menuItems: DropdownMenuItem[];
}

export interface DropdownTab {
    tabId: string;
    tabPane: DropdownTabPane[];
}

// Search
export interface DropdownSearch {
    placeholder?: string;
    noResultsText?: string;
}

// Header
export interface DropdownHeader {
    content?: ReactNode;
    borderColor?: ColorDefinitions;
}

// Footer
export interface DropdownFooter {
    content?: ReactNode;
    borderColor?: ColorDefinitions;
}

// Item
export interface DropdownMenuItem {
    id?: string | number;
    gap?: string;
    prefix?: ReactNode;
    prefixItemPosition?: 'item-start' | 'item-center' | 'item-end';
    prefixGap?: string;
    content?: ReactNode;
    contentCss?: string;
    contentItemPosition?: 'item-start' | 'item-center' | 'item-end';
    contentJustifyPosition?: 'justify-start' | 'justify-center' | 'justify-end';
    postfix?: ReactNode;
    postfixItemPosition?: 'item-start' | 'item-center' | 'item-end';
    postfixGap?: string;
    separatorAfterPrefix?: boolean;
    separatorAfterMeta?: boolean;
    disabled?: boolean;
    selected?: boolean;
    divider?: boolean;
    dividerColor?: ColorDefinitions;
    onClick?: () => void;
    keepOpen?: boolean;
    children?: DropdownMenuItem[];
}

// Submenu
export interface OpenSubmenu {
    item: DropdownMenuItem;
    level: number;
    top: number;
    left: number;
}

export interface DropdownProps {
    trigger: DropdownTrigger;
    header?: DropdownHeader;
    footer?: DropdownFooter;
    menuItems?: DropdownMenuItem[],
    tabItems?: DropdownTabItem[];
    tabs?: DropdownTab[];
    maxHeight?: number;
    closeOnSelect?: boolean;
    verticalPlacement?: DropdownVerticalPlacement;
    horizontalPlacement?: DropdownHorizontalPlacement;
    enableSearch?: boolean;
    search?: DropdownSearch;
}

const Dropdown: React.FC<DropdownProps> = ({
    trigger,
    header,
    footer,
    menuItems,
    tabItems,
    tabs,
    maxHeight = 400,
    closeOnSelect = true,
    verticalPlacement = "auto",
    horizontalPlacement = "auto",
    enableSearch = false,
    search,
}) => {
    const [open, setOpen] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState<OpenSubmenu[]>([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState(tabItems?.[0]?.id);

    const ref = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Positioning
    const [placement, setPlacement] = useState<{
        vertical: "up" | "down";
        horizontal: "left" | "right";
    }>({
        vertical: "down",
        horizontal: "left"
    });

    const calculatePosition = () => {
        if (!triggerRef.current || !menuRef.current) return;

        const toggleRect = triggerRef.current.getBoundingClientRect();
        const menuEl = menuRef.current;

        const menuRect = menuEl.getBoundingClientRect();
        const menuHeight = menuRect.height;
        const menuWidth = menuRect.width;

        const bounds = getEffectiveBounds(triggerRef.current);

        let vertical: "up" | "down";

        if (verticalPlacement === "auto") {
            const spaceBelow = bounds.bottom - toggleRect.bottom;
            const spaceAbove = toggleRect.top - bounds.top;

            const fitsDown = spaceBelow >= menuHeight;
            const fitsUp = spaceAbove >= menuHeight;

            vertical = (!fitsDown && fitsUp) ? "up" : "down";
        } else {
            vertical = verticalPlacement;
        }

        let horizontal: "left" | "right";

        if (horizontalPlacement === "auto") {
            const spaceRight = bounds.right - toggleRect.right;
            const spaceLeft = toggleRect.left - bounds.left;

            const fitsRight = spaceRight >= menuWidth;
            const fitsLeft = spaceLeft >= menuWidth;

            if (fitsLeft) horizontal = "left";
            else if (fitsRight) horizontal = "right";
            else horizontal = "left";
        } else {
            horizontal = horizontalPlacement;
        }

        setPlacement({ vertical, horizontal });
    };

    useEffect(() => {
        if (!open) return;

        const schedule = () => {
            requestAnimationFrame(() => {
                calculatePosition();
            });
        };

        // initial position calc
        schedule();

        const observer = new ResizeObserver(() => {
            schedule();
        });

        if (menuRef.current) {
            observer.observe(menuRef.current);
        }

        const onScroll = () => schedule();
        const onResize = () => schedule();

        window.addEventListener("scroll", onScroll, true);
        window.addEventListener("resize", onResize);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", onScroll, true);
            window.removeEventListener("resize", onResize);
        };
    }, [open]);



    const closeDropdown = () => {
        setOpen(false);
        setOpenSubmenus([]);
    };


    // Submenu
    const handleExpand = (
        item: DropdownMenuItem,
        anchor: HTMLElement,
        level: number
    ) => {

        if (!menuRef.current) return;

        const anchorRect = anchor.getBoundingClientRect();

        setOpenSubmenus(prev => {

            const existing = prev.find(x => x.level === level && x.item.id === item.id);

            // zelfde item opnieuw aangeklikt => toggle dicht
            if (existing) {
                return prev.filter(x => x.level < level);
            }

            // ander item op hetzelfde niveau => alles vanaf dit niveau vervangen
            const filtered = prev.filter(x => x.level < level);

            return [
                ...filtered,
                {
                    item,
                    level,
                    top: anchorRect.top,
                    left: anchorRect.right
                }
            ];
        });
    };


    // Search
    const filteredMenuItems = menuItems?.filter(item => {
        if (item.divider) return true;
        if (!searchTerm) return true;

        const content =
            typeof item.content === "string"
                ? item.content.toLowerCase()
                : "";

        return content.includes(searchTerm.toLowerCase());
    });

    // Tabs
    const activePanes = tabs?.find(x => x.tabId === activeTab)?.tabPane ?? [];

    useEffect(() => {
        const clickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
                setOpenSubmenus([]);
                setSearchTerm("");
            }
        };

        document.addEventListener("mousedown", clickOutside);
        return () => document.removeEventListener("mousedown", clickOutside);
    }, []);


    // Trigger
    const renderTrigger = (
        trigger.variant === 'input'
            ? (
                <div className="dropdown__trigger form-group float">
                    <input readOnly className="form-control" />
                    <label>{trigger.label}</label>
                </div>
            )
            : (
                <ContentItem item={{
                    prefix: trigger.prefix,
                    content: (
                        <div className="dropdown__trigger__container">
                            <span>{trigger.label}</span>
                            {trigger.arrow && (
                                <Icon icon={IconDefinitions.angle_down} />
                            )}
                        </div>
                    )
                }} />
            )
    );

    const triggerCss = [
        "dropdown__trigger",
        open ? "dropdown__trigger--open" : '',
        trigger.dropdownTriggerCss ? trigger.dropdownTriggerCss : ""
    ].filter(Boolean).join(" ");


    const menuCss = [
        "dropdown__menu",
        `dropdown__menu--${placement.vertical}`,
        `dropdown__menu--${placement.horizontal}`
    ].filter(Boolean).join(" ");

    return (
        <div ref={ref} className="dropdown">

            {/* Trigger */}
            <button
                ref={triggerRef}
                className={triggerCss}
                onClick={() => {
                    setOpen(v => {
                        const next = !v;

                        if (!next) {
                            setOpenSubmenus([]);
                        }

                        return next;
                    });
                }}
            >
                {renderTrigger}
            </button>

            {/* Menu */}
            {open && (
                <div ref={menuRef} className={menuCss}
                    style={{
                        //width,
                        maxHeight
                    }}>

                    {header && (
                        <div className={`dropdown__header ${header.borderColor ? "border-" + header.borderColor : ""}`}>
                            {header.content}
                        </div>
                    )}


                    {enableSearch && (
                        <div className="dropdown__search">
                            <div className="dropdown__search__container">
                                <Icon icon={IconDefinitions.search} size={SizeDefinitions.Small} />
                                <input
                                    type="text"
                                    placeholder={search?.placeholder ?? "Zoeken..."}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                    )}

                    {tabItems && (
                        <div className="dropdown__tabs">
                            {tabItems.map((tab, idx) => (
                                <button
                                    key={tab.id ?? idx}
                                    disabled={tab.disabled}
                                    className={activeTab === tab.id ? "dropdown__tab active" : "dropdown__tab"}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.content}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Level 1 */}
                    <div className="dropdown__content" style={{ maxHeight }}>

                        {/* Tabs mode */}


                     
                        {tabs
                            ? activePanes.map((pane, idx) => (
                                <div key={pane.id ?? idx}>
                                    {pane.menuItems.map((item, idx) => (
                                        <DropdownItem
                                            key={item.id ?? idx}
                                            item={item}
                                            level={1}
                                            onExpand={handleExpand}
                                            closeDropdown={() => closeDropdown()}
                                            closeOnSelect={closeOnSelect}
                                        />
                                    ))}
                                </div>
                            ))

                            /* Menu mode */
                            :
                            <>
                                {
                                    filteredMenuItems?.length === 0 && (
                                        <div className="dropdown__item__empty">
                                            {search?.noResultsText ?? "Geen resultaten gevonden"}
                                        </div>
                                    )
                                }
                                {filteredMenuItems?.map((item, idx) => (
                                    <DropdownItem
                                        key={item.id ?? idx}
                                        item={item}
                                        level={1}
                                        onExpand={handleExpand}
                                        closeDropdown={() => closeDropdown()}
                                        closeOnSelect={closeOnSelect}
                                    />
                                ))}
                            </>

                        }
                    </div>

                    {/* Submenu's (Level 2+) */}
                    {openSubmenus.map((menu, idx) => (
                        <div
                            key={`${menu.level}-${menu.item.id ?? idx}`}
                            className="dropdown__submenu"
                            style={{
                                top: menu.top,
                                left: menu.left
                            }}
                        >
                            {menu.item.children?.map((child, idx) => (
                                <DropdownItem
                                    key={child.id ?? idx}
                                    item={child}
                                    level={menu.level + 1}
                                    onExpand={handleExpand}
                                    closeDropdown={() => closeDropdown()}
                                    closeOnSelect={closeOnSelect}
                                />
                            ))}
                        </div>
                    ))}

                    {footer && (
                        <div className={`dropdown__footer ${footer.borderColor ? "border-" + footer.borderColor : ""}`}>
                            {footer.content}
                        </div>)
                    }

                </div>
            )}
        </div>
    )
}

export default Dropdown;
