import moment from 'moment';
import { normalizeDate } from '../../../../lib/helpers/helpers';
import { DatagridRowConfig } from '../Config/DatagridRowConfig';
import { DatagridSortConfig } from '../Config/DatagridSort';

const orderMap = {
    desc: -1,
    asc: 1,
};


const getPropConfig = <TData>(
    prop: string,
    propertyConfigs?: DatagridRowConfig<TData>[]
): DatagridRowConfig<TData> | undefined => {
    if (!propertyConfigs) {
        return;
    }

    const config = propertyConfigs.filter((x) => x.prop == prop);

    if (!config.length) {
        return;
    }

    return config[0];
};

const getValue = <TData>(val: any, prop: string, propertyConfigs?: DatagridRowConfig<TData>[]): any => {
    const retVal = val[prop];
    const config = getPropConfig(prop, propertyConfigs);

    if (!config) {
        return retVal;
    }

    const transform = config.transformValue ?? ((x: any) => x);

    return transform(retVal);
};

export function defaultSort<TData>(
    items: TData[],
    sortConfig: DatagridSortConfig,
    propertyConfigs?: DatagridRowConfig<TData>[]
): TData[] {

    const data = [...items];

    data.sort((a: TData, b: TData) => {
        const config = getPropConfig(sortConfig.prop, propertyConfigs);

        let result: number;

        if (config?.sort) {
            result = config.sort(a, b);
        } else {
            const valA = getValue(a, sortConfig.prop, propertyConfigs);
            const valB = getValue(b, sortConfig.prop, propertyConfigs);

            const aIsNull = valA === null || valA === undefined;
            const bIsNull = valB === null || valB === undefined;

            if (aIsNull && bIsNull) {
                result = 0;
            } else if (aIsNull) {
                result = 1;
            } else if (bIsNull) {
                result = -1;
            } else if (valA > valB) {
                result = 1;
            } else if (valA < valB) {
                result = -1;
            } else {
                result = 0;
            }
        }

        return result * orderMap[sortConfig.order];
    });

    return data;
}

export const getStringValue = (val: any): string => {
    if (val instanceof Date) {
        return moment(val).format('DD-MM-YYYY');
    }
    if (val === null || val === undefined) {
        return val;
    }

    return val + '';
};

const _defaultSearch = (val: string, searchTerm: string) => {
    if (!val || !searchTerm) {
        return false;
    }

    return val.toLowerCase().includes(searchTerm.toLowerCase());
};


export const debounce = (func: any, timeout = 300) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
};

export const defaultSearch = <TData>(
    data: TData[],
    searchTerm: string,
    propertyConfigs?: DatagridRowConfig<TData>[]
): TData[] => {

    const term = searchTerm.toLowerCase();

    return data.filter(item =>
        propertyConfigs?.some(col => {
            const rawVal = (item as any)[col.prop];
            if (rawVal == null) return false;

            const filterType = col.filter?.type ?? 'text';

            // Date: search on normalised ISO string
            if (filterType === 'date') {
                const date = normalizeDate(rawVal);
                if (!date) return false;

                const yyyy = date.getFullYear();
                const mm = String(date.getMonth() + 1).padStart(2, '0');
                const dd = String(date.getDate()).padStart(2, '0');

                const searchableValues = [
                    `${yyyy}-${mm}-${dd}`, // 2026-01-16
                    `${dd}-${mm}-${yyyy}`, // 16-01-2026
                    `${dd}-${mm}`,         // 16-01
                    `${yyyy}`              // 2026
                ];

                return searchableValues.some(v =>
                    v.includes(term)
                );
            }

            // TEXT (default)
            return String(rawVal).toLowerCase().includes(term);
        }) ?? false
    );
};

