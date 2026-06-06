import React, { useLayoutEffect, useRef, useState } from "react";
import { Popover } from "../../..";
import { ColorDefinitions, IconDefinitions } from "../../../../lib/utils/definitions";
import Checkbox from "../../../Forms/Checkbox/Checkbox";
import Dropdown from "../../../Forms/Dropdown/Dropdown";
import Icon from "../../../UI/Icons/Icon/Icon";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { TableRowConfig } from "../Old/Config/TableRowConfig";

export interface DatagridFilterToolbarProps<TData> {
    data?: TData[];
    dataRaw?: TData[];
    properties?: TableRowConfig<TData>[];
    searchTerm: string;
    onSearchChange: (value: string) => void;
    columnFilters: Record<string, any>;
    setColumnFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    searchPlaceholder?: string;
    removeFiltersTooltip?: string;
    filterButtonColor?: ColorDefinitions;
    filterButtonArrow?: boolean;
    filterGhostButton?: boolean;
    borderBottom?: boolean;
    borderColor?: ColorDefinitions;
    enableInfoPopover?: boolean;
    infoPopoverToggleIcon?: IconDefinitions;
    infoPopoverContent?: React.ReactNode;
}

function DatagridFilterToolbar<TData>({
    data,
    dataRaw,
    properties,
    searchTerm,
    onSearchChange,
    columnFilters,
    setColumnFilters,
    searchPlaceholder = "Filteren...",
    removeFiltersTooltip = "Filters wissen",
    filterButtonColor = ColorDefinitions.Surface,
    filterButtonArrow = true,
    filterGhostButton = true,
    borderBottom = false,
    borderColor = ColorDefinitions.Surface,
    enableInfoPopover = false,
    infoPopoverContent,
    infoPopoverToggleIcon = IconDefinitions.info_square,
}: Readonly<DatagridFilterToolbarProps<TData>>) {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);

    const updateScrollButtons = () => {
        const el = scrollRef.current;
        if (!el) return;

        const scrollable = el.scrollWidth > el.clientWidth;
        setIsScrollable(scrollable);
        setCanScrollLeft(scrollable && el.scrollLeft > 0);
        setCanScrollRight(
            scrollable && el.scrollWidth > el.clientWidth + el.scrollLeft
        );
    };

    useLayoutEffect(() => {
        updateScrollButtons();

        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener("scroll", updateScrollButtons);
        window.addEventListener("resize", updateScrollButtons);

        return () => {
            el.removeEventListener("scroll", updateScrollButtons);
            window.removeEventListener("resize", updateScrollButtons);
        };
    }, [properties, columnFilters]);

    if (!properties) return null;

    const selectFilters = properties.filter((p) => p.filter?.type === "select");

    const hasFilters =
        searchTerm.trim().length > 0 ||
        Object.values(columnFilters).some(
            (v) => v != null && v !== "" && !(Array.isArray(v) && v.length === 0)
        );

    const clearAll = () => {
        onSearchChange("");
        setColumnFilters({});
    };

    const scrollBy = (direction: "prev" | "next") => {
        const el = scrollRef.current;
        if (!el) return;

        el.scrollBy({
            left: direction === "next" ? 200 : -200,
            behavior: "smooth",
        });
    };

    const setFilterValue = (prop: string, value: any) => {
        setColumnFilters((prev) => ({ ...prev, [prop]: value }));
    };

    return (
        <div
            className={`filterbar ${borderBottom ? "border-" + borderColor : ''}`}>
            <div className="filterbar__container">
                <div
                    className="filterbar__left"
                    ref={scrollRef}
                    onScroll={updateScrollButtons}
                >
                    <div className="filterbar__item">
                        {enableInfoPopover && (
                            <Popover toggleIcon={infoPopoverToggleIcon}>
                                {infoPopoverContent}
                            </Popover>
                        )}
                    </div>
                    {/* Search */}
                    <div className="filterbar__item filterbar__item--keyword">
                        <div className="filterbar__keyword__filter">
                            <Icon icon={IconDefinitions.filter} />
                            <input
                                type="text"
                                className="filterbar__input"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => {
                                    onSearchChange(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    {selectFilters.map((col) => {
                        const isMultiSelect = col.filter?.multiSelect ?? false;
                        const rawSelectedValue = columnFilters[col.prop];
                        let selectedValue: string[] = [];

                        if (isMultiSelect) {
                            selectedValue = Array.isArray(rawSelectedValue)
                                ? rawSelectedValue.map(String)
                                : [];
                        } else if (rawSelectedValue != null) {
                            selectedValue = [String(rawSelectedValue)];
                        }

                        let options: { label: string; value: string }[] = [];

                        if (col.filter?.options) {
                            options = col.filter.options;
                        } else if (col.filter?.optionsSource && dataRaw) {
                            const values = col.filter.optionsSource(dataRaw);
                            const mapOption =
                                col.filter.mapOption ??
                                ((v: any) => ({ label: String(v), value: String(v) }));

                            options = values.map(mapOption);
                        }

                        const handleCheckboxChange = (
                            optValue: string,
                            isChecked: boolean
                        ) => {
                            const newValue = isChecked
                                ? selectedValue.filter((v) => v !== optValue)
                                : [...selectedValue, optValue];
                            setFilterValue(col.prop, newValue);
                        };

                        const dropdownItems: any[] = [
                            {
                                content: `${col.title}:`,
                                selected: isMultiSelect && selectedValue.length === 0,
                                onClick: isMultiSelect ? () => setFilterValue(col.prop, []) : undefined,
                                keepOpen: isMultiSelect,
                            },
                            ...options.map((opt) => {
                                const isChecked = isMultiSelect && selectedValue.includes(opt.value);
                                if (isMultiSelect) {
                                    return {
                                        content: (
                                            <Checkbox
                                                color={ColorDefinitions.Accent}
                                                css="pointer"
                                                key={opt.value}
                                                checked={isChecked}
                                                label={opt.label}
                                                onChange={() =>
                                                    handleCheckboxChange(opt.value, isChecked)
                                                }
                                            />
                                        ),
                                        keepOpen: true,
                                        onClick: undefined,
                                        selected: isChecked,
                                    };
                                } else {
                                    return {
                                        content: opt.label,
                                        onClick: () => setFilterValue(col.prop, opt.value),
                                        keepOpen: false,
                                        selected: opt.value === selectedValue[0],
                                    };
                                }
                            }),
                        ];

                        return (
                            <div
                                key={col.prop}
                                className="filterbar__item filterbar__item--dropdown"
                            >
                                <Dropdown
                                    key={col.prop}
                                    direction="down"
                                    dropdownToggle={{
                                        label: (
                                            <>
                                                <span>{col.title}: </span>
                                                <strong>
                                                    {isMultiSelect
                                                        ? (() => {
                                                            if (selectedValue.length === 0) return "";
                                                            if (selectedValue.length === 1) {
                                                                return (
                                                                    options.find(
                                                                        (o) => o.value === selectedValue[0]
                                                                    )?.label ?? ""
                                                                );
                                                            }
                                                            const firstLabel =
                                                                options.find(
                                                                    (o) => o.value === selectedValue[0]
                                                                )?.label ?? "";
                                                            return `${firstLabel}  (+ ${selectedValue.length - 1
                                                                })`;
                                                        })()
                                                        : options.find((o) => o.value === selectedValue[0])
                                                            ?.label ?? ""}
                                                </strong>
                                            </>
                                        ),
                                        renderArrow: filterButtonArrow,
                                        renderAsGhostButton: filterGhostButton,
                                        ghostButtonColor: filterButtonColor,
                                    }}
                                    menuItems={dropdownItems}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="filterbar__right">
                    {isScrollable && (
                        <>
                            <button
                                className="filterbar__control filterbar__control--prev"
                                onClick={() => scrollBy("prev")}
                                disabled={!canScrollLeft}
                                aria-disabled={!canScrollLeft}
                            >
                                <Icon icon={IconDefinitions.angle_left} />
                            </button>

                            <button
                                className="filterbar__control filterbar__control--next"
                                onClick={() => scrollBy("next")}
                                disabled={!canScrollRight}
                                aria-disabled={!canScrollRight}
                            >
                                <Icon icon={IconDefinitions.angle_right} />
                            </button>
                        </>
                    )}

                    {hasFilters && (
                        <Tooltip content={removeFiltersTooltip}>
                            <button
                                className="filterbar__control filterbar__control--dismiss"
                                onClick={clearAll}
                            >
                                <Icon icon={IconDefinitions.cross} />
                            </button>
                        </Tooltip>
                    )}
                </div>
            </div>            
        </div>
    );
}

export default DatagridFilterToolbar;
