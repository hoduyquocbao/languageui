import { Provider, render } from '@/adapter';
import { theme } from '@/core/theme';
import { Button } from '@/ui/atom/button';
import { Icon } from '@/ui/atom/icon';

/**
 * The main application component for showcasing UI elements.
 */
const App = () => (
  <div style={{ padding: '2rem' }}>
    <h1>Component Showcase</h1>
    
    <h2>Buttons</h2>
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary" size="medium">Primary Button</Button>
      <Button variant="secondary" size="small">Secondary Button</Button>
      <Button variant="primary" state="disabled">Disabled</Button>
      <Button variant="primary" prefix={<Icon name="search" />}>Search</Button>
      <Button variant="secondary" suffix={<Icon name="arrow" />}>Next</Button>
    </div>
  </div>
);

/**
 * Renders the application into the DOM.
 */
render(
  <Provider theme={theme}>
    <App />
  </Provider>,
  'root'
);
