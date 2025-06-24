/**
 * @fileoverview
 * This is the Adapter Layer for all external libraries.
 * It encapsulates external dependencies and exposes them to the application
 * with a consistent, single-word API.
 * This is a key architectural pattern to ensure loose coupling.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import styled, {
    css as cssUtil,
    createGlobalStyle,
    ThemeProvider,
    type DefaultTheme
} from 'styled-components';

// --- React Adapter ---
// Encapsulates React's core hooks and components.
export const state = React.useState;
export const effect = React.useEffect;
export const context = React.useContext;
export const reducer = React.useReducer;
export const memo = React.useMemo;
export const callback = React.useCallback;
export const ref = React.useRef;
export const lazy = React.lazy;
export const Suspense = React.Suspense; // Export component dưới dạng PascalCase

// Re-exports common React types for convenience.
export type Node = React.ReactNode;
export type Element = React.ReactElement;
export type FC<P = {}> = React.FC<P>;
export type SVG<P = {}> = React.SVGProps<P>;


// --- Styled-Components Adapter ---
// Facade for creating styled components. Ex: `style('button')`
export const style = (tag: any) => styled(tag);
// Utility for writing CSS blocks.
export const utility = cssUtil;
// For creating global styles.
export const global = createGlobalStyle;
// The ThemeProvider component.
export const Provider = ThemeProvider; // Export component dưới dạng PascalCase

// Re-exports the theme type.
export type Theme = DefaultTheme;


// --- React-DOM Adapter ---
/**
 * Encapsulates the logic for rendering the application into the DOM.
 * @param element The root React element to render.
 * @param containerId The ID of the DOM element to mount the app to.
 */
export function render(element: React.ReactElement, containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`DOM container with id '${containerId}' not found.`);
        return;
    }
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            {element}
        </React.StrictMode>
    );
} 