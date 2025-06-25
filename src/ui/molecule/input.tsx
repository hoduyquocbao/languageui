import { style } from '@/adapter';
import { theme } from '@/core/theme';
import type { FC, Node } from '@/adapter';

const Wrapper = style('div')`
    position: relative;
    display: flex;
    align-items: center;
`;

const Field = style('input')`
    width: 100%;
    padding: ${theme.space[2]} ${theme.space[3]};
    border: 1px solid ${theme.color.neutral[300]};
    border-radius: ${theme.radius.medium};
    font-size: ${theme.typography.size.body};
    transition: border-color 150ms;
    
    &:focus {
        outline: none;
        border-color: ${theme.color.primary[100]};
    }
    
    &:disabled {
        background: ${theme.color.neutral[100]};
        color: ${theme.color.neutral[500]};
        cursor: not-allowed;
    }
    
    &::placeholder {
        color: ${theme.color.neutral[400]};
    }
`;

const Prefix = style('div')`
    position: absolute;
    left: ${theme.space[3]};
    color: ${theme.color.neutral[500]};
    pointer-events: none;
    display: flex;
    align-items: center;
    z-index: 1;
`;

const Suffix = style('div')`
    position: absolute;
    right: ${theme.space[3]};
    color: ${theme.color.neutral[500]};
    pointer-events: none;
    display: flex;
    align-items: center;
    z-index: 1;
`;

interface Props {
    placeholder?: string;
    disabled?: boolean;
    prefix?: Node;
    suffix?: Node;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = ({ prefix, suffix, ...rest }) => (
    <Wrapper>
        <Field 
            {...rest} 
            style={{ 
                paddingLeft: prefix ? `${theme.space[6]}` : undefined,
                paddingRight: suffix ? `${theme.space[6]}` : undefined
            }}
        />
        {prefix && <Prefix>{prefix}</Prefix>}
        {suffix && <Suffix>{suffix}</Suffix>}
    </Wrapper>
); 