/**
 * @fileoverview
 * This file defines the single source of truth for all design tokens.
 * It follows the "single-word" naming convention for all token categories.
 */

// Colors are grouped by semantic meaning (primary, neutral) and type (gradient, border).
const color = {
    primary: {
        100: "#2388FF",
        200: "#FF2D46",
    },
    neutral: {
        100: "#ffffff",
        200: "#000000",
    },
    gradient: {
        primary: "linear-gradient(180deg, #2B7AFB 0%, #2174FD 100%)",
    },
    border: {
        primary: "#174BD2",
    }
};

// Typography tokens define font families, sizes, and weights.
const typography = {
    font: {
        primary: "'Inter', sans-serif",
    },
    size: {
        small: "12px",
        medium: "14px",
        large: "16px",
    },
    weight: {
        regular: 400,
        bold: 700,
    }
};

// Shadow tokens provide consistent elevation styles.
const shadow = {
    small: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    medium: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
};

// Radius tokens are used for border-radius properties.
const radius = {
    small: "4px",
    medium: "8px",
    large: "16px",
};

// Space tokens are used for margins, paddings, and gaps.
const space = {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
};

/**
 * The main theme object, aggregating all design token categories.
 * This object is consumed by the styled-components ThemeProvider.
 */
export const theme = {
    color,
    typography,
    shadow,
    radius,
    space,
}; 