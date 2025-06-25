import { style } from '@/adapter';
import { theme } from '@/core/theme';
import type { FC } from '@/adapter';
import { Text } from '@/ui/atom/typography';

const Element = style('textarea')`
    border: 1px solid ${theme.color.border.medium};
    background: ${theme.color.neutral[100]};
    border-radius: ${theme.radius.medium};
    padding: ${theme.space[2]} ${theme.space[3]};
    font-size: ${theme.typography.size.body};
    color: ${theme.color.neutral[800]};
    width: 100%;
    min-height: 80px;
    resize: vertical;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
        outline: none;
        border-color: ${theme.color.primary[100]};
        box-shadow: 0 0 0 2px ${theme.color.secondary[200]};
    }

    &::placeholder {
        color: ${theme.color.neutral[500]};
    }

    &:disabled {
        background: ${theme.color.neutral[200]};
        cursor: not-allowed;
    }
`;

const Wrapper = style('div')`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[2]};
`;

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export const Textarea: FC<Props> = ({ label, ...rest }) => (
    <Wrapper>
        {label && <Text as="label">{label}</Text>}
        <Element {...rest} />
    </Wrapper>
); 