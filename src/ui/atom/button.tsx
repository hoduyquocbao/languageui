import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../core/theme';

// --- PROPS ---
type Variant = 'primary' | 'secondary';
type Size = 'medium' | 'small';
type State = 'disabled';

interface Props {
    children: React.ReactNode;
    variant?: Variant;
    size?: Size;
    state?: State;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    onClick?: () => void;
}

// --- STYLES ---
const sizes = {
    medium: css`
        padding: ${theme.space[3]} ${theme.space[4]};
        font-size: ${theme.typography.size.medium};
    `,
    small: css`
        padding: ${theme.space[2]} ${theme.space[3]};
        font-size: ${theme.typography.size.small};
    `,
};

const variants = {
    primary: css`
        background: ${theme.color.primary[100]};
        color: ${theme.color.neutral[100]};
        border: 1px solid ${theme.color.border.primary};

        &:hover {
            opacity: 0.9;
        }
    `,
    secondary: css`
        background: ${theme.color.neutral[100]};
        color: ${theme.color.neutral[200]};
        border: 1px solid ${theme.color.neutral[200]};

        &:hover {
            background: ${theme.color.neutral[200]};
            color: ${theme.color.neutral[100]};
        }
    `,
};

const Element = styled.button<Omit<Props, 'children'>>`
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

const Content = styled.span`
    display: inline-block;
`;

const Affix = styled.span`
    display: inline-flex;
    align-items: center;
`;

// --- COMPONENT ---
export const Button: React.FC<Props> = ({ children, prefix, suffix, state, ...rest }) => {
    return (
        <Element disabled={state === 'disabled'} {...rest}>
            {prefix && <Affix>{prefix}</Affix>}
            <Content>{children}</Content>
            {suffix && <Affix>{suffix}</Affix>}
        </Element>
    );
}; 