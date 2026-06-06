import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { ColorDefinitions } from '../../../lib/utils/definitions';

export interface PageLoaderProps {
    color?: ColorDefinitions;
    loading?: boolean;
}

const LoaderContainer = styled.div<{
    $color: ColorDefinitions;
    $loading: boolean;
}>`
    opacity: 0;
    padding: 2px;
    width: 100%;
    position: fixed;
    -webkit-box-shadow: 0 0 10px var(--color-surface-light);
    box-shadow: 0 0 10px var(--color-surface-light);

    ${({ $color }) => $color && ` background: var(--color-${$color});`}
    ${({ $loading }) => $loading && `animation: pageLoader 5s infinite;`}

  @-webkit-keyframes pageLoader {
        0%,
        5% {
            width: 0%;
            opacity: 1;
        }
        10%,
        20% {
            width: 10%;
            opacity: 1;
        }
        30%,
        50% {
            width: 30%;
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            width: 100%;
        }
    }
    @keyframes pageLoader {
        0%,
        5% {
            width: 0%;
            opacity: 1;
        }
        10%,
        20% {
            width: 10%;
            opacity: 1;
        }
        30%,
        50% {
            width: 30%;
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            width: 100%;
        }
    }
`;

const PageLoader: React.FC<PageLoaderProps> = ({ color = ColorDefinitions.Primary, loading = false }): ReactElement => {
    return <LoaderContainer $color={color} $loading={loading}></LoaderContainer>;
};

export default PageLoader;
