declare module '*.woff2';
declare module '*.svg';
declare module '*.webp';

declare module '*.jpg' {
    const src: string;
    export default src;
}
declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.css' {
    const src: string;
    export default src;
}

declare module '*.scss' {
    const src: string;
    export default src;
}