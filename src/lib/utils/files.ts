export function readFile(file: File): Promise<string> {
    return file.text();
}

export const filesize = (sizeInBytes: number, decimals = 2) => {
    if (!+sizeInBytes) {
        return '0 Bytes';
    }

    const k = 1024;
    const dm = Math.max(0, decimals);
    const sizes = ['b', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));

     return `${Number.parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export function downloadFile(blob: Blob, name = 'file', type = 'text/plain') {
    const {
        URL: { createObjectURL, revokeObjectURL },
        setTimeout,
    } = globalThis;

    const url = createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.setAttribute('href', url);
    anchor.setAttribute('download', name);
    anchor.click();

    setTimeout(() => {
        revokeObjectURL(url);
    }, 100);
}

export const matchKlantNummer = (
    validateKlantNummer: boolean,
    file: File,
    klantNummer: string
): boolean => {
    if (!validateKlantNummer) {
        return true;
    }
    // Bestandsnaam moet eindigen op #<1–4 cijfers> voor de extensie
    const klantnummerRegex = /#\d{1,4}(?=\.)/;
    const match = new RegExp(klantnummerRegex).exec(file.name);
    if (!match) {
        return false;
    }

    if(match[0].substring(1) !== klantNummer) { 
        return false;
    }

    return klantnummerRegex.test(file.name);
};


export const matchFileType = (acceptedFiles: string[], file: File): boolean => {
    // This algorithm is taken from the DropZone library
    if (!acceptedFiles.length) {
        return true;
    }

    const mimeType = file.type;
    const baseMimeType = mimeType.replace(/\/.*$/, '');

    for (let validFileType of acceptedFiles.map((f) => f.trim())) {
        if (validFileType.startsWith('.')) {
            if (file.name.toLowerCase().endsWith(validFileType.toLowerCase())) {
                return true;
            }
        } else if (validFileType.endsWith('/*')) {
            if (baseMimeType === validFileType.replace(/\/.*$/, '')) {
                return true;
            }
        } else if (mimeType === validFileType) {
            return true;
        }
    }

    return false;
};
