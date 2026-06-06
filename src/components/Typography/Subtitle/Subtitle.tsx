import React, { ReactElement } from 'react';

export interface SubtitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    mute?: boolean;
}

function Subtitle({ mute = false, children, ...props }: Readonly<SubtitleProps>): ReactElement {
    return (
        <div className={`subtitle ${mute ? 'text-mute' : ''}`} {...props}>
            {children}
        </div>
    );
}

export default Subtitle;
