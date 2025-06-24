/**
 * @fileoverview
 * Provides a versatile Card component.
 * This component serves as a container for content, with configurable shadow effects
 * to create a sense of elevation and depth, based on the application's design system.
 */

import { style } from '@/adapter';
import type { FC, Node } from '@/adapter';
import { theme } from '@/core/theme';

/**
 * @name ShadowKey
 * @description A type defining the available keys for shadow sizes (e.g., 'xs', 'sm').
 * This ensures type safety when specifying a shadow level for the Card.
 */
type ShadowKey = keyof typeof theme.shadow.primary;

/**
 * @name Props
 * @description Interface for the Card component's props.
 * @property {Node} children - The content to be rendered inside the card.
 * @property {'primary' | 'secondary' | 'neutral'} [variant='neutral'] - The thematic variant of the shadow.
 * @property {ShadowKey} [shadow='sm'] - The size of the shadow to be applied.
 */
interface Props {
    children: Node;
    variant?: 'primary' | 'secondary' | 'neutral';
    shadow?: ShadowKey;
}

/**
 * @name Element
 * @description The styled-component representing the card.
 * It dynamically applies styles for background, border-radius, padding, and box-shadow
 * based on the props passed and the values from the global theme.
 */
const Element = style('div')<Props>`
    background: ${({ theme }) => theme.color.neutral[100]};
    border-radius: ${({ theme }) => theme.radius.large};
    padding: ${({ theme }) => theme.space[4]};
    box-shadow: ${({ theme, variant = 'neutral', shadow = 'sm' }) => theme.shadow[variant][shadow]};
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: ${({ theme, variant = 'neutral', shadow = 'sm' }) => {
            const keys = Object.keys(theme.shadow[variant]) as ShadowKey[];
            const currentIndex = keys.indexOf(shadow);
            const nextIndex = Math.min(currentIndex + 1, keys.length - 1);
            return theme.shadow[variant][keys[nextIndex]];
        }};
    }
`;

/**
 * @name Card
 * @description The main Card component.
 * It wraps the styled Element and passes down the props, providing a clean and reusable
 * interface for creating card-based UI elements.
 * @param {Props} props - The properties for the component.
 * @returns {JSX.Element} The rendered card component.
 */
export const Card: FC<Props> = ({ children, ...rest }) => (
    <Element {...rest}>{children}</Element>
); 