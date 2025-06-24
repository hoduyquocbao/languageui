import { style, utility } from '@/adapter';
import type { FC, Node } from '@/adapter';
import { theme } from '@/core/theme';

/**
 * @fileoverview
 * This file defines the atomic Button component.
 * It is built using the style adapter and consumes tokens from the theme.
 */

// --- PROPS ---
/** The visual style of the button. */
type Variant = 'primary' | 'secondary';
/** The size of the button, affecting padding and font size. */
type Size = 'medium' | 'small';
/** The state of the button, e.g., disabled. */
type State = 'disabled';

/**
 * Defines the properties for the Button component.
 * All prop names are single words.
 */
interface Props {
    children: Node;
    variant?: Variant;
    size?: Size;
    state?: State;
    prefix?: Node;
    suffix?: Node;
    onClick?: () => void;
}

// --- STYLES ---
// Defines the CSS for different button sizes using the `utility` adapter.
const sizes = {
    medium: utility`
        padding: ${theme.space[3]} ${theme.space[4]};
        font-size: ${theme.typography.size.medium};
    `,
    small: utility`
        padding: ${theme.space[2]} ${theme.space[3]};
        font-size: ${theme.typography.size.small};
    `,
};

// Defines the CSS for different button variants.
const variants = {
    primary: utility`
        background: ${theme.color.primary[100]};
        color: ${theme.color.neutral[100]};
        border: 1px solid ${theme.color.border.primary};

        &:hover {
            opacity: 0.9;
        }
    `,
    secondary: utility`
        background: ${theme.color.neutral[100]};
        color: ${theme.color.neutral[200]};
        border: 1px solid ${theme.color.neutral[200]};

        &:hover {
            background: ${theme.color.neutral[200]};
            color: ${theme.color.neutral[100]};
        }
    `,
};

/**
 * The core styled-component for the button element.
 * It dynamically applies styles based on props.
 * Created using the `style` adapter facade.
 */
const Element = style('button')<Omit<Props, 'children'>>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.space[2]};
    border-radius: ${theme.radius.medium};
    font-family: ${theme.typography.font.primary};
    font-weight: ${theme.typography.weight.bold};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    ${({ size = 'medium' }) => sizes[size]}
    ${({ variant = 'primary' }) => variants[variant]}

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

/** A container for the button's main content/text. */
const Content = style('span')`
    display: inline-block;
`;

/** A container for the prefix or suffix icons. */
const Affix = style('span')`
    display: inline-flex;
    align-items: center;
`;

// --- COMPONENT ---
/**
 * The main Button component.
 * It assembles the core element with optional prefix and suffix nodes.
 */
export const Button: FC<Props> = ({ children, prefix, suffix, state, ...rest }) => {
    return (
        <Element disabled={state === 'disabled'} {...rest}>
            {prefix && <Affix>{prefix}</Affix>}
            <Content>{children}</Content>
            {suffix && <Affix>{suffix}</Affix>}
        </Element>
    );
}; 