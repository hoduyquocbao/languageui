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
 * @name App
 * @description The root component of the application.
 * It renders a showcase of the design system's components, specifically demonstrating
 * the different shadow variants applied to the Card component.
 * @returns {JSX.Element} The rendered application component.
 */
const App: FC = () => (
    <main>
        <Title>LanguageUI Showcase</Title>

        <Palette title="Primary Colors" colors={theme.color.primary} />
        <Palette title="Secondary Colors" colors={theme.color.secondary} />
        <Palette title="Neutral Colors" colors={theme.color.neutral} />
        <Palette title="Overlay (Light)" colors={theme.color.overlay.light} />
        <Palette title="Overlay (Dark)" colors={theme.color.overlay.dark} />
        <Palette title="Gradients" colors={theme.color.gradient} />

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
