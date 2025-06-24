import React, { lazy, Suspense } from 'react';

const icons = {
    search: lazy(() => import('../../assets/icons/search.svg?react')),
    arrow: lazy(() => import('../../assets/icons/arrow.svg?react')),
};

export type IconName = keyof typeof icons;

interface Props extends React.SVGProps<SVGSVGElement> {
    name: IconName;
    size?: number;
}

export const Icon: React.FC<Props> = ({ name, size = 24, ...props }) => {
    const SvgComponent = icons[name];

    if (!SvgComponent) {
        return null;
    }

    return (
        <Suspense fallback={<div style={{ width: size, height: size }} />}>
            <SvgComponent width={size} height={size} {...props} />
        </Suspense>
    );
}; 