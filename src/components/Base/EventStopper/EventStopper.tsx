import React, { FC, PropsWithChildren } from 'react';

export interface EventStopperProps extends PropsWithChildren {}

const EventStopper: FC<EventStopperProps> = ({ children }) => {
    return <div onClick={(e) => e.stopPropagation()}>{children}</div>;
};

export default EventStopper;
 