import React, { ReactElement } from 'react';

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    muted?: boolean; 
    size?: 'xs' |'sm' | 'md' | 'lg';
    css?: string;
}

function Title({ size, css='', muted = false, children, ...props }: Readonly<TitleProps>): ReactElement {
    return (
        <div className={`${size ? 'title-' + size : 'title'} ${muted ? 'text-mute' : ''} ${css}`} {...props}>
            {children}
        </div>
    );
}

export default Title;
