import React, { useCallback, useMemo } from "react";
import { ColorDefinitions } from "../../../lib/utils/definitions";

export interface PaginationData {
    page: number;
    perPage: number;
}

export interface PaginationProps {
    total: number;
    pagination: PaginationData;
    setPagination: (newPagination: PaginationData) => void;
    color?: ColorDefinitions;
}

const options = [5, 10, 25, 50, 100];
const maxVisiblePages = 4;

const Pagination = ({
    total,
    pagination,
    setPagination,
    color,
}: PaginationProps) => {
    const totalPages = Math.max(1, Math.ceil(total / pagination.perPage));
    const pageRange = Math.floor(maxVisiblePages / 2);

    let minPageNumber = Math.max(pagination.page - pageRange, 1);
    let maxPageNumber = Math.min(minPageNumber + maxVisiblePages - 1, totalPages);

    if (maxPageNumber - minPageNumber + 1 < maxVisiblePages) {
        minPageNumber = Math.max(maxPageNumber - maxVisiblePages + 1, 1);
    }

    const visiblePages = useMemo(
        () =>
            Array.from(
                { length: maxPageNumber - minPageNumber + 1 },
                (_, i) => minPageNumber + i
            ),
        [minPageNumber, maxPageNumber]
    );

    const handleClick = useCallback(
        (page: number) => {
            if (page < 1 || page > totalPages) return;
            setPagination({ ...pagination, page });
        },
        [pagination, setPagination, totalPages]
    );

    const handleSelect = (perPage: number) => {
        setPagination({ page: 1, perPage });
    };

    return (
        
            <div className="datagrid__pagination">
                <div className={`datagrid__pager ${color ? "bg-" + color : ""}`}>
                    <button
                        disabled={pagination.page === 1}
                        className="datagrid__pager__item first"
                        onClick={() => handleClick(1)}
                    >
                        <div className="datagrid__pager__item__link" aria-label="Eerste pagina">
                            <svg>
                                <use xlinkHref="#svg_icon_pager_first" />
                            </svg>
                        </div>
                    </button>

                    <button
                        disabled={pagination.page === 1}
                        className="datagrid__pager__item prev"
                        onClick={() => handleClick(pagination.page - 1)}
                    >
                        <div className="datagrid__pager__item__link" aria-label="Vorige pagina">
                            <svg>
                                <use xlinkHref="#svg_icon_pager_previous" />
                            </svg>
                        </div>
                    </button>

                    {visiblePages.map((number) => (
                        <button
                            key={number}
                            className={`datagrid__pager__item ${pagination.page === number ? "bg-primary active" : ""
                                }`}
                            onClick={() => handleClick(number)}
                        >
                            <div className="datagrid__pager__item__link" aria-label={`Pagina ${number}`}>
                                {number}
                            </div>
                        </button>
                    ))}

                    <button
                        disabled={pagination.page === totalPages}
                        className="datagrid__pager__item next"
                        onClick={() => handleClick(pagination.page + 1)}
                    >
                        <div className="datagrid__pager__item__link" aria-label="Volgende pagina">
                            <svg>
                                <use xlinkHref="#svg_icon_pager_next" />
                            </svg>
                        </div>
                    </button>

                    <button
                        disabled={pagination.page === totalPages}
                        className="datagrid__pager__item last"
                        onClick={() => handleClick(totalPages)}
                    >
                        <div className="datagrid__pager__item__link" aria-label="Laatste pagina">
                            <svg>
                                <use xlinkHref="#svg_icon_pager_last" />
                            </svg>
                        </div>
                    </button>
                </div>
                <div className="datagrid__pager__info">
                    <div className="datagrid__pager__info--results">
                        <label>
                            <span className="sr-only">Resultaten per pagina: </span>{" "}
                            {/* screen-reader only */}
                            Resultaten per pagina:
                        </label>
                        <div className="form-group form-group__simple select">
                            <select
                                className="form-control"
                                value={pagination.perPage}
                                onChange={(e) => handleSelect(Number(e.target.value))}
                            >
                                {options.map((x) => (
                                    <option key={x} value={x}>
                                        {x}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <label>
                        Totaal resultaten: <strong>{total}</strong>
                    </label>
                </div>
            </div>
      
    );
};

export default Pagination;
