import { ReactNode, useRef, useState } from "react";
import { ColorDefinitions, IconDefinitions } from "../../../lib/utils/definitions";
import { ContentItem, ContentItemType } from "../../Base/ContentItem";
import React from "react";
import Icon from "../Icons/Icon/Icon";
import { DropdownMenuItem } from "./Dropdown";


export interface DropdownItemProps {
    item: DropdownMenuItem;
    level?: number;
    closeDropdown: () => void;
    closeOnSelect?: boolean;
    onExpand?: (
        item: DropdownMenuItem,
        anchor: HTMLElement,
        level: number
    ) => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
    item,
    level = 0,
    closeDropdown,
    closeOnSelect,
    onExpand
}
) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const hasChildren = !!item.children?.length;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (item.disabled)
            return;

        // Open submenu
        if (hasChildren) {
            if (itemRef.current) {
                onExpand?.(
                    item,
                    itemRef.current,
                    level
                );
            }
            return;
        }

        // Normale click action
        item.onClick?.();

        if (closeOnSelect)
            closeDropdown();
    };


    // const handleClick = (e: React.MouseEvent) => {
    //     e.stopPropagation();

    //     if (item.disabled)
    //         return;

    //     if (hasChildren) {
    //         setExpanded(prev => !prev);
    //         return;
    //     }

    //     item.onClick?.();

    //     if (closeOnSelect) closeDropdown();
    // };

    const itemCss = [
        "dropdown__item",
        item.disabled && 'dropdown__item--disabled',
        item.selected && 'dropdown__item--selected',
    ].filter(Boolean).join(" ");


    return (
        <>
            <div ref={itemRef}
                className={itemCss}
                onClick={handleClick}
                style={{
                    paddingLeft: `${12 + level * 16}px`
                }}
            >
                <ContentItem
                    item={{
                        ...item,
                        postfix: item.children?.length
                            ? <Icon icon={IconDefinitions.angle_right} />
                            : item.postfix
                    }}
                />

                {item.divider && (
                    <div className="dropdown__divider" />
                )}
            </div>
        </>
    )
}