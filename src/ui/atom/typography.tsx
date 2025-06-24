/**
 * @fileoverview
 * This file provides a set of typography components.
 * These components (`Title`, `Subtitle`, `Text`) ensure consistent text styling
 * across the application by using predefined tokens from the theme.
 */

import { style } from '@/adapter';
import { theme } from '@/core/theme';

/**
 * @name Text
 * @description The base text component.
 * It applies the default font family, body size, and regular weight.
 * It serves as the standard for all paragraph or body content.
 */
export const Text = style('p')`
    font-family: ${theme.typography.font.primary};
    font-size: ${theme.typography.size.body};
    font-weight: ${theme.typography.weight.regular};
    color: ${theme.color.neutral[200]};
    margin: 0;
`;

/**
 * @name Subtitle
 * @description A text component for subtitles.
 * It inherits from Text but uses a larger font size and bold weight,
 * making it suitable for section headings or secondary titles.
 */
export const Subtitle = style(Text)`
    font-size: ${theme.typography.size.subtitle};
    font-weight: ${theme.typography.weight.bold};
`;

/**
 * @name Title
 * @description A text component for primary titles.
 * It inherits from Subtitle, using an even larger font size to give it
 * the most emphasis, ideal for page or main section titles.
 */
export const Title = style(Subtitle)`
    font-size: ${theme.typography.size.title};
`; 