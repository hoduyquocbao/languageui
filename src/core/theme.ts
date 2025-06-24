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
        body: "14px",
        subtitle: "20px",
        title: "28px",
    },
    weight: {
        regular: 400,
        bold: 700,
    }
};

/**
 * @name shadow
 * @description Defines the box-shadow tokens for the application, categorized by semantic meaning.
 * Each category (primary, secondary, neutral) provides a scale of shadows (xs, sm, md, lg)
 * to ensure consistent depth and elevation across the UI.
 */
const shadow = {
    primary: {
        xs: "0px 0px 2px rgba(77, 145, 225, 0.23)",
        sm: "0px 4px 8px rgba(77, 145, 225, 0.10)",
        md: "0px 8px 15px rgba(77, 145, 225, 0.10)",
        lg: "0px 8px 24px rgba(77, 145, 225, 0.10)",
    },
    secondary: {
        xs: "0px 0px 2px rgba(155, 32, 47, 0.10)",
        sm: "0px 4px 8px rgba(155, 32, 47, 0.10)",
        md: "0px 8px 15px rgba(155, 32, 47, 0.10)",
        lg: "0px 8px 24px rgba(155, 32, 47, 0.14)",
    },
    neutral: {
        xs: "0px 1px 3px rgba(25, 33, 61, 0.10)",
        sm: "0px 2px 4px rgba(25, 33, 61, 0.08)",
        md: "0px 8px 15px rgba(25, 33, 61, 0.10)",
        lg: "0px 8px 24px rgba(25, 33, 61, 0.12)",
    }
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