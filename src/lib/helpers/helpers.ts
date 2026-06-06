export function generateUUID() {
    // Public Domain/MIT
    let d = Date.now(); // Timestamp
    let d2 = (typeof performance !== 'undefined' && performance.now ? performance.now() * 1000 : 0); // Microseconds since page-load or 0 if unsupported

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16; // random number between 0 and 16
        if (d > 0) {
            // Use timestamp until depleted
            r = (d + r) % 16;
            d = Math.trunc(d / 16);
        } else {
            // Use microseconds since page-load if supported
            r = (d2 + r) % 16;
            d2 = Math.trunc(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

export const formatNumberToDutch = (value: number) => {
    return new Intl.NumberFormat('nl-NL').format(value);
};

export const toDutchDateString = (date: Date): string => {
    // Ensure the date is valid
    if (Number.isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    return date.toLocaleDateString('nl-NL');
};

export const parseToDate = (dateString: string): Date | null => {
    const myDate = new Date(dateString);
    if (Number.isNaN(myDate.getTime())) {
        return null;
    }

    return myDate;
};

export const toDateString = (date: Date): string => {
    return date.toString();
};

export const normalizeDate = (value: any): Date | null => {
    if (!value) return null;

    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value;
    }

    if (typeof value === 'string') {
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    return null;
};