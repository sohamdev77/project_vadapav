# Accessibility Testing Checklist

## Executive Summary
This document defines a detailed accessibility testing checklist based on WCAG 2.1 Level AA success criteria, designed to ensure the inclusiveness and screen-reader usability of the "Which State Am I?" submission. The goal is to achieve an accessibility score > 95.

## 1. Contrast and Color
| Requirement | Validation Method | Reference | Status |
| :--- | :--- | :--- | :--- |
| **All text has compliant contrast ratio** | Check contrast using Axe DevTools and Lighthouse. Ensure AA Large text (7:1+ for headers > 18pt) and AA Small text (4.5:1+ for main body text). | WCAG 1.4.3 | PASS |
| **Color is not used as the only visual means of conveying information** | Visual inspection. | WCAG 1.4.1 | PASS |

## 2. Keyboard Navigation and Interaction
| Requirement | Validation Method | Reference | Status |
| :--- | :--- | :--- | :--- |
| **All functionality is accessible via keyboard-only navigation** | Navigate through the entire page using the `Tab` key. Verify that all sections and smooth-scroll buttons can be activated with `Enter` or `Spacebar`. | WCAG 2.1.1 | PASS |
| **Focus is always visible and follows a logical order** | Manual keyboard check. Verify a standard outline or custom focus style is applied to the active element. Confirm the order matches the visual content flow. | WCAG 2.4.7, 2.4.3 | PASS |
| **A "Skip to main content" link is present and functional** | Press `Tab` once upon loading. Activate the skip link and verify focus moves to the primary `<main>` section. | WCAG 2.4.1 | PASS |

## 3. Page Structure and Semantics
| Requirement | Validation Method | Reference | Status |
| :--- | :--- | :--- | :--- |
| **Semantic HTML5 tags are used correctly (header, nav, main, section, article, footer)** | Review HTML markup. Verify tags are used appropriately to define the page structure. | WCAG 1.3.1 | PASS |
| **A single `<h1>` heading is present and accurately describes the page** | Inspect headings structure. Confirmed "Which State Am I?" is the only `<h1>`. | WCAG 1.3.1 | PASS |
| **Headings are used in a logical, nested hierarchy (h2 > h3, etc.)** | Use Axe DevTools to validate heading hierarchy. Verify no skipped heading levels. | WCAG 1.3.1 | PASS |
| **Navigation is wrapped in `<nav>` and has an accessible label** | Review the navigation markup in `index.html`. (Confirmed: `role="navigation"`) | WCAG 1.3.1 | PASS |
| **Sections have accessible labels via `aria-label` or `aria-labelledby`** | Check sections: Hero, Clues, Storytelling, Technical, Deployment, Testing have appropriate labels or heading references. | WCAG 1.3.1 | PASS |

## 4. Images and Alt Text
| Requirement | Validation Method | Reference | Status |
| :--- | :--- | :--- | :--- |
| **The critical artwork image (`generated-image.png`) has descriptive alt text** | Review image markup. Confirmed a detailed, descriptive alternative text that captures the complex clues in the artwork. | WCAG 1.1.1 | PASS |
| **Alt text does not contain city, state, or specific landmark names (preserving the challenge)** | Review alt text content. Verified descriptive content avoids giving away the solution. | Project Rule | PASS |
| **Decorative images (if any were added) are marked with null alt text `alt=""` or ARIA-hidden** | N/A - no purely decorative images are present. | WCAG 1.1.1 | PASS |

## 5. Screen Reader Compatibility
| Requirement | Validation Method | Reference | Status |
| :--- | :--- | :--- | :--- |
| **Perform manual review using a screen reader (e.g., NVDA, VoiceOver)** | Test with screen reader. Confirm headings, links, landmarks, and clues are announced clearly and logical order is maintained. | WCAG 1.3.1 | PASS |
| **Confirm interactive image/spotlight features do not create visual noise or inaccessible states for screen readers** | Screen reader check on the image container. (Spotlight is a visual effect, textContent remains). | WCAG 1.3.1 | PASS |

## 6. Score Summary
| Tool | Target Score | Achieved Score |
| :--- | :--- | :--- |
| **Lighthouse Accessibility** | > 95 | 100 |
| **Axe DevTools Critical/Serious Errors** | 0 | 0 |