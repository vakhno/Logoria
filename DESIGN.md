# Design

This is a reusable documentation template. Each section explains what to record and provides a completed example for a fictional team planning application. All example values are illustrative; they are not requirements or a description of the current repository.

When adapting this template, replace examples with confirmed design decisions, remove sections that do not apply, and leave unresolved choices under Open design decisions. Do not treat fictional examples as instructions to change the application.

This document owns visual intent, interaction patterns, and interface copy. Product purpose and business rules belong in `PRODUCT.md`; implementation details belong in `CONTEXT.md`. Reference stylesheets and reusable components for implemented values rather than maintaining a second copy here.

## Overview

**Section description:** Describe the intended visual character, the experience it supports, and the main design priorities.

**Project-agnostic example:**

The interface feels calm, organized, and practical. Users should be able to scan a project, identify its status, and find the next action without reading every detail. Clear headings, restrained color, and predictable controls take priority over decorative effects. Dense information appears in lists and tables; cards are used for summaries.

## Colors and themes

**Section description:** Explain semantic color roles, usage rules, and theme behavior. Reference the stylesheet that owns token values instead of duplicating them here.

**Project-agnostic example:**

Color tokens and their light and dark values are defined in `shared/styles/src/globals.css`. That stylesheet is the source of truth for implemented values.

Use `background` and `foreground` for page content, `card` and `card-foreground` for card surfaces, `primary` and `primary-foreground` for main actions, and `muted-foreground` for supporting text. Use `border` for dividers, `ring` for focus indicators, and `destructive` for destructive actions. Status labels include text or an icon so their meaning remains clear without color.

Users and agents may edit token values directly in `globals.css`. Review affected components in both themes and check text, control, and focus contrast after changes. Components should reuse semantic tokens rather than introduce separate color values.

Update this document when the intended meaning or usage of a token changes. Ordinary value adjustments belong in the stylesheet and do not need to be copied here. Theme selection supports light, dark, and system preferences and persists between visits.

## Typography

**Section description:** Explain typographic hierarchy, readability, and text conventions. Reference font definitions and type styles for implemented values.

**Project-agnostic example:**

Page titles establish the strongest hierarchy, section headings organize content, and supporting text remains readable without competing with the main message. Headings and labels use sentence case. Technical identifiers use the shared monospace style.

Font definitions and type styles own the exact family, size, weight, and line height. Reuse those styles rather than creating per-screen alternatives. Long titles and translated text wrap naturally without hiding meaningful information.

## Layout and spacing

**Section description:** Describe the application shell, content widths, spacing scale, grouping, and alignment rules.

**Project-agnostic example:**

The desktop shell contains navigation and a flexible main region. Overview pages use a wider container; forms use a narrower container to keep labels and controls easy to follow. Related fields sit closer together than independent sections. Labels sit directly above their controls, and actions align with the content they affect.

Use the shared spacing scale and existing layout components. Exact gutters, widths, and spacing values belong in the stylesheet or component that implements them.

## Responsive behavior

**Section description:** Explain how layouts and interactions change on small screens, with long content, and under browser zoom.

**Project-agnostic example:**

Below 768px, the sidebar becomes a menu opened from the header, page gutters reduce to 16px, and summary columns stack vertically. Table actions remain available through a labeled menu. Wide tables scroll inside their own container rather than making the entire page scroll horizontally.

Forms use one column on phones. Dialogs fit within the viewport and scroll internally when necessary. Navigation, errors, and primary actions remain usable at 200% browser zoom.

## Shapes and elevation

**Section description:** Define radii, borders, shadows, and the hierarchy between ordinary and floating surfaces.

**Project-agnostic example:**

Controls share one shape treatment, cards use a slightly softer treatment, and status badges may use a pill shape. Ordinary cards use a border without a shadow. Menus use a small shadow, and dialogs use a stronger shadow with a dimmed backdrop. Additional elevation is reserved for surfaces that overlap other content. Exact radii, borders, and shadows are owned by shared styles and components.

## Components and interactions

**Section description:** Document reusable component variants, dimensions, state behavior, and interaction patterns.

**Project-agnostic example:**

Use existing button variants for primary, secondary, and destructive actions. Shared components own control dimensions and padding. Each form or dialog has one primary action. While a save is pending, its button displays “Saving…” and prevents duplicate submission.

Inputs have a persistent visible label, optional help text, and an associated validation message. Invalid fields explain the correction: “Enter an email address such as name@example.com.” Placeholder text provides an example without replacing the label.

Navigation identifies the current page visually and semantically. Segmented controls show exactly one selected option. Dialogs move focus inside when opened, keep keyboard focus within the dialog, and restore focus to the trigger when closed.

## Content and interface copy

**Section description:** Describe tone, naming, labels, instructions, and how messages help users act.

**Project-agnostic example:**

Copy is direct, friendly, and specific. Actions use verbs such as “Create project,” “Invite member,” and “Save changes.” Error messages explain what happened and what to do next. Avoid vague labels such as “Submit” when the action has a clearer name.

A failed save reads: “Your changes could not be saved. Check your connection and try again.” A destructive confirmation names the affected item and explains whether it can be recovered.

## Motion and feedback states

**Section description:** Define transitions and loading, empty, error, success, disabled, and focus states.

**Project-agnostic example:**

Hover and focus transitions last 150ms. Menus use a short opacity transition; reduced-motion preferences remove nonessential animation.

Initial loading shows a skeleton matching the expected content. An empty project displays “No work items yet” with a “Create work item” action. A failed request shows a retry action. Successful updates appear immediately in the view and announce completion through an accessible status message. Disabled actions explain the missing requirement where it is not obvious.

## Accessibility and inclusion

**Section description:** Record accessibility goals and practical requirements for input methods, semantics, localization, and visual preferences.

**Project-agnostic example:**

The accessibility target is WCAG 2.2 AA. Every core journey supports keyboard input, visible focus, and screen-reader navigation. Controls have accessible names and expose selected, expanded, and disabled states. Text contrast, control contrast, and zoom behavior are checked during review.

Long translated labels can wrap. Layouts use logical start and end alignment for right-to-left languages. Icons that communicate information include text alternatives, and decorative icons are hidden from assistive technology.

## Design rules and anti-patterns

**Section description:** List concrete practices to follow and recurring patterns to avoid.

**Project-agnostic example:**

- Use existing semantic tokens and component variants before introducing new ones.
- Place related actions beside the content they affect.
- Preserve visible labels and keyboard focus indicators.
- Avoid nested cards that obscure hierarchy.
- Avoid using color alone to distinguish statuses.
- Avoid icon-only actions when their meaning is unfamiliar.

## Open design decisions

**Section description:** Track unresolved visual or interaction decisions and the evidence needed to resolve them.

**Project-agnostic example:**

- Should large project tables support a compact density setting? Test readability and editing speed with representative users.
- Should mobile filters open inline or in a separate panel? Compare both approaches on a narrow viewport.
- Should destructive actions allow undo? Confirm the recovery model before finalizing confirmation copy.
