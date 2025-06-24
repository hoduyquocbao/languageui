/**
 * @fileoverview
 * This file provides the Swatch component.
 * A Swatch is a visual representation of a color, displaying the color itself,
 * its thematic name, and its hex code. It is a key atom for building a live style guide.
 */

import { style } from '@/adapter';
import type { FC } from '@/adapter';
import { theme } from '@/core/theme';

/**
 * @name Props
 * @description Interface for the Swatch component's props.
 * @property {string} name - The semantic name of the color (e.g., 'primary.100').
 * @property {string} color - The hex or rgba value of the color to display.
 */
interface Props {
    name: string;
    color: string;
}

/**
 * @name Container
 * @description The main container for the Swatch component.
 * It provides the card-like appearance with shadow and rounded corners.
 */
const Container = style('div')`
    display: flex;
    flex-direction: column;
    width: 160px;
    box-shadow: ${theme.shadow.neutral.sm};
    border-radius: ${theme.radius.medium};
    overflow: hidden;
    border: 1px solid ${theme.color.border.medium};
`;

/**
 * @name Block
 * @description The styled block that displays the actual color.
 * Its background is set dynamically based on the `color` prop.
 */
const Block = style('div')<{ color: string }>`
    height: 100px;
    background: ${({ color }) => color};
`;

/**
 * @name Info
 * @description A container for the textual information (name and hex code) of the color.
 */
const Info = style('div')`
    padding: ${theme.space[2]} ${theme.space[3]};
    background: ${theme.color.neutral[100]};
`;

/**
 * @name Name
 * @description The styled text for the color's semantic name.
 */
const Name = style('p')`
    font-weight: ${theme.typography.weight.bold};
    font-size: 14px;
    color: ${theme.color.neutral[800]};
    margin: 0 0 ${theme.space[1]} 0;
`;

/**
 * @name Hex
 * @description The styled text for the color's hex code.
 * It uses a monospace font for better readability of the code.
 */
const Hex = style('p')`
    font-family: monospace;
    font-size: 12px;
    color: ${theme.color.neutral[600]};
    margin: 0;
    text-transform: uppercase;
`;

/**
 * @name Swatch
 * @description The main Swatch component.
 * It assembles the color block and the info section into a single, reusable component.
 * @param {Props} props - The properties for the component.
 * @returns {JSX.Element} The rendered swatch component.
 */
export const Swatch: FC<Props> = ({ name, color }) => {
    return (
        <Container>
            <Block color={color} />
            <Info>
                <Name>{name}</Name>
                <Hex>{color}</Hex>
            </Info>
        </Container>
    );
}; 