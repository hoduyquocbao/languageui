import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme } from './core/theme'
import { Button } from './ui/atom/button'
import { Icon } from './ui/atom/icon'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.typography.font.primary};
    margin: 0;
    padding: 2rem;
    background-color: #f0f2f5;
  }
`

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <h1>Component Showcase</h1>
      
      <h2>Buttons</h2>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="primary" size="medium">Primary Button</Button>
        <Button variant="secondary" size="small">Secondary Button</Button>
        <Button variant="primary" state="disabled">Disabled</Button>
        <Button variant="primary" prefix={<Icon name="search" />}>Search</Button>
        <Button variant="secondary" suffix={<Icon name="arrow" />}>Next</Button>
      </div>

    </ThemeProvider>
  </React.StrictMode>,
)
