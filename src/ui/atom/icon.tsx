import React, { lazy, Suspense } from 'react';

const icons = {
    search: lazy(() => import('../../assets/icons/search.svg?react')),
    arrow: lazy(() => import('../../assets/icons/arrow.svg?react')),
};

export type Kind = keyof typeof icons;

interface Props extends React.SVGProps<SVGSVGElement> {
    name: Kind;
    size?: number;
}

export const Icon: React.FC<Props> = ({ name, size = 24, ...props }) => {
    const Element = icons[name];

    if (!Element) {
        return null;
    }

    return (
        <Suspense fallback={<div style={{ width: size, height: size }} />}>
            <Element width={size} height={size} {...props} />
        </Suspense>
    );
}; 