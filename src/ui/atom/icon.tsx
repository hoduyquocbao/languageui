import { lazy, Suspense } from '@/adapter';
import type { FC, SVG } from '@/adapter';

/**
 * Dynamically loads and renders SVG icons.
 * The `icons` object maps a single-word `Kind` to a dynamically imported SVG.
 * This uses React.lazy to ensure icons are only loaded when needed.
 */
const icons = {
    search: lazy(() => import('@/assets/icons/search.svg?react')),
    arrow: lazy(() => import('@/assets/icons/arrow.svg?react')),
};

/**
 * The props for the Icon component.
 * It extends standard SVG props.
 * 'name' is the single-word identifier for the icon to display.
 */
interface Props extends SVG<SVGSVGElement> {
    name: keyof typeof icons;
    size?: number;
}

/**
 * A component to render an SVG icon.
 * It looks up the icon component by its `name` and renders it,
 * wrapped in a `Suspense` component to handle the dynamic loading.
 */
export const Icon: FC<Props> = ({ name, size = 24, ...props }) => {
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