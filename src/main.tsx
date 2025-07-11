/**
 * @fileoverview
 * This is the main entry point for the application.
 * It sets up the global style, theme provider, and renders the main `App` component,
 * which serves as a showcase for the UI design system.
 */
import { dom, style } from '@/adapter';
import { theme } from '@/core/theme';
import { Card } from '@/ui/atom/card';
import { Title, Subtitle, Text } from '@/ui/atom/typography';
import { Swatch } from '@/ui/atom/swatch';
import type { FC, Node } from '@/adapter';
import { Logo } from '@/ui/atom/logo';
import { Button } from '@/ui/atom/button';
import { Icon, icons } from '@/ui/atom/icon';
import { Input } from '@/ui/molecule/input';
import { Textarea } from '@/ui/molecule/textarea';
import { Select } from '@/ui/molecule/select';
import { Checkbox } from '@/ui/molecule/checkbox';
import { Radio } from '@/ui/molecule/radio';
import { Toggle } from '@/ui/molecule/toggle';

/**
 * @name Global
 * @description The global style component. It injects base styles into the application,
 * such as background color and font smoothing, ensuring a consistent look and feel.
 */
const Global = style.global`
  body {
    background-color: #f8f9fa;
    font-family: ${theme.typography.font.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: ${theme.space[6]};
  }
`;

/**
 * @name Showcase
 * @description A container for styling the showcase sections.
 */
const Showcase = style('div')`
  display: flex;
  gap: ${theme.space[5]};
  margin-block: ${theme.space[4]};
  flex-wrap: wrap;
`;

/**
 * @name Section
 * @description A component to visually group and title a set of showcase items.
 * @param {object} props - The component props.
 * @param {string} props.title - The title for the section.
 * @param {React.ReactNode} props.children - The content of the section.
 * @returns {JSX.Element} The rendered section.
 */
const Section: FC<{ title: string; children: Node }> = ({ title, children }) => (
    <section>
        <Subtitle>{title}</Subtitle>
        <Showcase>{children}</Showcase>
    </section>
);

/**
 * @name Palette
 * @description A specialized section for displaying a color palette.
 * It iterates over a map of colors and renders a Swatch for each one.
 * @param {object} props - The component props.
 * @param {string} props.title - The title for the palette section.
 * @param {Record<string, string>} props.colors - A map of color names to hex/rgba values.
 * @returns {JSX.Element} The rendered palette section.
 */
const Palette: FC<{ title: string; colors: Record<string, string> }> = ({ title, colors }) => (
    <Section title={title}>
        {Object.entries(colors).map(([name, value]) => (
            <Swatch key={name} name={name} color={value} />
        ))}
    </Section>
);

/**
 * @name DarkCard
 * @description A Card variant with dark background for social icons.
 */
const DarkCard = style(Card)`
  background-color: ${theme.color.neutral[800]};
`;

/**
 * @name App
 * @description The root component of the application.
 * It renders a showcase of the design system's components, specifically demonstrating
 * the different shadow variants applied to the Card component.
 * @returns {JSX.Element} The rendered application component.
 */
const App: FC = () => (
    <main>
        <Title>LanguageUI Showcase</Title>

        <Section title="Logos">
            <Card>
                <Logo variant="icon" mode="light" size={80} />
            </Card>
            <Card>
                <Logo variant="icon" mode="dark" size={80} />
            </Card>
            <Card>
                <Logo variant="full" mode="light" height={40} />
            </Card>
            <Card>
                <Logo variant="full" mode="dark" height={40} />
            </Card>
        </Section>

        <Section title="Buttons">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                {/* Primary Buttons */}
                <Subtitle>Primary</Subtitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Button variant="primary" size="medium">Default</Button>
                    <Button variant="primary" size="small">Default</Button>
                    <Button variant="primary" size="medium" disabled>Disabled</Button>
                    <Button variant="primary" size="medium" prefix={<Icon kind="line" name="search" />}>{""}</Button>
                    <Button variant="primary" size="small" prefix={<Icon kind="line" name="search" />} suffix={<Icon kind="line" name="arrow" />}>Search</Button>
                </div>

                {/* Secondary Buttons */}
                <Subtitle>Secondary</Subtitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Button variant="secondary" size="medium">Default</Button>
                    <Button variant="secondary" size="small">Default</Button>
                    <Button variant="secondary" size="medium" disabled>Disabled</Button>
                    <Button variant="secondary" size="medium" prefix={<Icon kind="line" name="search" />}>{""}</Button>
                    <Button variant="secondary" size="small" prefix={<Icon kind="line" name="search" />} suffix={<Icon kind="line" name="arrow" />}>Search</Button>
                </div>

                {/* Tertiary Buttons */}
                <Subtitle>Tertiary</Subtitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Button variant="tertiary" size="medium">Default</Button>
                    <Button variant="tertiary" size="small">Default</Button>
                    <Button variant="tertiary" size="medium" disabled>Disabled</Button>
                    <Button variant="tertiary" size="medium" prefix={<Icon kind="line" name="search" />}>{""}</Button>
                    <Button variant="tertiary" size="small" prefix={<Icon kind="line" name="search" />} suffix={<Icon kind="line" name="arrow" />}>Search</Button>
                </div>
            </div>
        </Section>

        <Section title="Line Icons">
            {Object.keys(icons.line).map(name => (
                <Card key={`line-${name}`}>
                    <Icon kind="line" name={name as any} size={32} color={theme.color.neutral[800]} />
                    <Text>{name}</Text>
                </Card>
            ))}
        </Section>

        <Section title="Filled Icons">
            {Object.keys(icons.filled).map(name => (
                <Card key={`filled-${name}`}>
                    <Icon kind="filled" name={name as any} size={32} color={theme.color.neutral[800]} />
                    <Text>{name}</Text>
                </Card>
            ))}
        </Section>

        <Section title="Social Icons">
            {Object.keys(icons.social).map(name => (
                <DarkCard key={`social-${name}`}>
                    <Icon kind="social" name={name as any} size={32} />
                    <Text style={{ color: theme.color.neutral[100] }}>{name}</Text>
                </DarkCard>
            ))}
        </Section>

        <Palette title="Primary Colors" colors={theme.color.primary} />
        <Palette title="Secondary Colors" colors={theme.color.secondary} />
        <Palette title="Neutral Colors" colors={theme.color.neutral} />
        <Palette title="Overlay (Light)" colors={theme.color.overlay.light} />
        <Palette title="Overlay (Dark)" colors={theme.color.overlay.dark} />
        <Palette title="Gradients" colors={theme.color.gradient} />

        <Section title="Form Controls">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                {/* Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Subtitle>Input</Subtitle>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Input placeholder="Default input" />
                        <Input placeholder="Disabled input" disabled />
                        <Input placeholder="With prefix" prefix={<Icon kind="line" name="search" />} />
                        <Input placeholder="With suffix" suffix={<Icon kind="line" name="check" />} />
                    </div>
                </div>

                {/* Textarea */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Subtitle>Textarea</Subtitle>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Textarea placeholder="Default textarea" />
                        <Textarea placeholder="Disabled textarea" disabled />
                    </div>
                </div>

                {/* Select */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Subtitle>Select</Subtitle>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Select>
                            <option value="">Choose an option</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </Select>
                        <Select disabled>
                            <option value="">Disabled select</option>
                        </Select>
                    </div>
                </div>

                {/* Checkbox */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Subtitle>Checkbox</Subtitle>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Checkbox label="Default checkbox" />
                        <Checkbox label="Checked checkbox" defaultChecked />
                        <Checkbox label="Disabled checkbox" disabled />
                        <Checkbox label="Disabled checked" defaultChecked disabled />
                    </div>
                </div>

                {/* Radio */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Subtitle>Radio</Subtitle>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Radio name="radio1" label="Option 1" />
                        <Radio name="radio1" label="Option 2" defaultChecked />
                        <Radio name="radio1" label="Disabled option" disabled />
                    </div>
                </div>

                {/* Toggle */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Subtitle>Toggle</Subtitle>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Toggle label="Default toggle" />
                        <Toggle label="Checked toggle" defaultChecked />
                        <Toggle label="Disabled toggle" disabled />
                        <Toggle label="Disabled checked" defaultChecked disabled />
                    </div>
                </div>
            </div>
        </Section>

        <Section title="Primary Shadows">
            <Card variant="primary" shadow="xs"><Text>XS</Text></Card>
            <Card variant="primary" shadow="sm"><Text>SM</Text></Card>
            <Card variant="primary" shadow="md"><Text>MD</Text></Card>
            <Card variant="primary" shadow="lg"><Text>LG</Text></Card>
        </Section>

        <Section title="Secondary Shadows">
            <Card variant="secondary" shadow="xs"><Text>XS</Text></Card>
            <Card variant="secondary" shadow="sm"><Text>SM</Text></Card>
            <Card variant="secondary" shadow="md"><Text>MD</Text></Card>
            <Card variant="secondary" shadow="lg"><Text>LG</Text></Card>
        </Section>

        <Section title="Neutral Shadows">
            <Card variant="neutral" shadow="xs"><Text>XS</Text></Card>
            <Card variant="neutral" shadow="sm"><Text>SM</Text></Card>
            <Card variant="neutral" shadow="md"><Text>MD</Text></Card>
            <Card variant="neutral" shadow="lg"><Text>LG</Text></Card>
        </Section>
    </main>
);

/**
 * @name Root
 * @description The main rendering setup for the application.
 * It finds the root DOM element and renders the App, wrapped with the
 * global style and the theme provider to enable access to design tokens
 * throughout the component tree.
 */
const Root = dom.root(document.getElementById('root')!);
Root.render(
    <style.provider theme={theme}>
        <Global />
    <App />
    </style.provider>
);
