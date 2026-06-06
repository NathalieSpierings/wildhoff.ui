import React, { RefObject, useEffect } from "react";

export interface TableSearchProps {
    enableSearch?: boolean;
    searchTerm: string;
    inputRef: RefObject<HTMLInputElement>;
    onSearchChange: (q: string) => void;
    autoFocusDelay?: number;
}

const DatagridSearch = ({
    enableSearch = false,
    searchTerm,
    inputRef,
    onSearchChange,
    autoFocusDelay = 500,
}: TableSearchProps) => {

    useEffect(() => {
        if (!enableSearch || !inputRef.current) return;

        const t = setTimeout(() => {
            inputRef.current?.focus();
        }, autoFocusDelay);

        return () => clearTimeout(t);
    }, [enableSearch, inputRef, autoFocusDelay]);

    if (!enableSearch) return null;

    return (
        <div className={`datagrid__search ${enableSearch ? "shown" : ""}`}>
            <div className="form-group form-group__simple">
                <input
                    ref={inputRef}
                    className="form-control"
                    type="search"
                    placeholder="Zoeken..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    aria-controls="datatable"
                />
            </div>
        </div>
    );
};

export default DatagridSearch;
