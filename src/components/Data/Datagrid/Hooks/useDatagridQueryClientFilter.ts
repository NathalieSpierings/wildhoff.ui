import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { DatagridGetDataArguments } from '../Config/DatagridData';
import { normalizeDate } from '../../../../lib/helpers/helpers';
import { defaultSearch, defaultSort } from '../Utils/datagridDataManipulation';


export interface UseDatagridQueryProps<TData> {
    queryFn: UseQueryOptions<TData[], unknown, TData[], any[]>;
    filters: DatagridGetDataArguments<TData> | null;
}

export type Status = 'error' | 'success' | 'pending';

const filterData = <TData>(
    data: TData[] | undefined,
    filters: DatagridGetDataArguments<TData> | null
): [TData[], number] => {

    if (!filters) {
        return [data || [], data?.length || 0];
    }

    const { searchTerm, sort, propertyConfigs, pagination, columnFilters } = filters;

    let filtered = data || [];


    // Search
    if (searchTerm) {
        filtered = defaultSearch(filtered, searchTerm, propertyConfigs);
    }

    // Column filters (single + multi)
    if (columnFilters) {
        for (const [key, value] of Object.entries(columnFilters)) {

            if (
                value == null ||
                value === '' ||
                (Array.isArray(value) && value.length === 0)
            ) {
                continue;
            }

            const colConfig = propertyConfigs?.find(p => p.prop === key);
            const filterType = colConfig?.filter?.type ?? 'text';

            filtered = filtered.filter(item => {
                const rawVal = (item as any)[key];
                if (rawVal == null) return false;

                const filterValues = Array.isArray(value) ? value : [value];

                // Text filter
                if (filterType === 'text') {
                    const text = String(rawVal).toLowerCase();
                    return filterValues.some(v =>
                        text.includes(String(v).toLowerCase())
                    );
                }

                // Date filter
                if (filterType === 'date') {
                    const itemDate = normalizeDate(rawVal);
                    if (!itemDate) return false;

                    return filterValues.some(v => {
                        const filterDate = normalizeDate(v);
                        if (!filterDate) return false;

                        // same day comparising
                        return (
                            itemDate.getFullYear() === filterDate.getFullYear() &&
                            itemDate.getMonth() === filterDate.getMonth() &&
                            itemDate.getDate() === filterDate.getDate()
                        );
                    });
                }

                // Select / default exact match
                return filterValues.some(v =>
                    String(rawVal).toLowerCase() === String(v).toLowerCase()
                );
            });
        }
    }

    // Sorting
    if (sort) {
        filtered = defaultSort(filtered, sort, propertyConfigs);
    }

    // Pagination
    const total = filtered.length;
    const start = (pagination.page - 1) * pagination.perPage;
    const end = pagination.page * pagination.perPage;
    const paged = filtered.slice(start, Math.min(total, end));

    return [paged, total];
};

function useDatagridQueryClientFilter<TData>({
    queryFn,
    filters
}: UseDatagridQueryProps<TData>): [TData[], TData[], number, Status] {

    const { data: dataRaw, status } = useQuery(queryFn);
    const [data, total] = useMemo(() => filterData(dataRaw, filters), [dataRaw, filters]);

    return [dataRaw ?? [], data, total, status as Status];
}

export default useDatagridQueryClientFilter;
