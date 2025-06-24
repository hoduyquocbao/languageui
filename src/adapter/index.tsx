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
export const style = Object.assign(
    (tag: any) => styled(tag),
    {
        // Utility for writing CSS blocks.
        utility: cssUtil,
        // For creating global styles.
        global: createGlobalStyle,
        // The ThemeProvider component.
        provider: ThemeProvider,
    }
);

// Re-exports the theme type.
export type Theme = DefaultTheme;


// --- React-DOM Adapter ---
/**
 * @name dom
 * @description Encapsulates the React-DOM client for mounting the application.
 * This follows the React 18 API for creating a root and rendering into it.
 */
export const dom = {
    /**
     * @param {HTMLElement} container - The DOM element to mount the application into.
     * @returns {object} An object with a `render` method.
     */
    root: (container: HTMLElement) => {
        const root = ReactDOM.createRoot(container);
        return {
            /**
             * @param {React.ReactElement} element - The root React element to render.
             */
            render: (element: React.ReactElement) => {
                root.render(<React.StrictMode>{element}</React.StrictMode>);
            }
        };
    }
}; 