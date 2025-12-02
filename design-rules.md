# Pipelai Design System Rules

## Color Palette

### Primary Colors
- **Primary**: `#131138` - Deep Midnight Purple
  - Used for: Headers, navigation, main backgrounds, primary text
  - CSS Variable: `--primary-color`

- **Secondary**: `#3730a3` - Royal Blue-Purple  
  - Used for: Secondary buttons, hover states, accent elements
  - CSS Variable: `--secondary-color`

- **Accent**: `#a855f7` - Vibrant Purple
  - Used for: CTAs, highlights, interactive elements, links
  - CSS Variable: `--accent-color`

### Supporting Colors
- **Success**: `#22d3ee` - Electric Cyan
  - Used for: Success states, checkmarks, positive feedback
  - CSS Variable: `--success-color`

- **Light**: `#fafafa` - Pure White
  - Used for: Main backgrounds, cards, content areas
  - CSS Variable: `--background`

- **Light Background**: `#f8fafc` - Subtle Light Gray
  - Used for: Section backgrounds, subtle contrasts
  - CSS Variable: `--light-background`

### Text Colors
- **Primary Text**: `#334155` - Steel Gray
  - Used for: Main headings, important content
  - CSS Variable: `--text-color`

- **Secondary Text**: `#64748b` - Lighter Steel Gray
  - Used for: Body text, descriptions, less important content
  - CSS Variable: `--light-text`

### Utility Colors
- **Border**: `#e2e8f0` - Light Border
  - Used for: Borders, dividers, subtle separations
  - CSS Variable: `--border-color`

- **Error**: `#ef4444` - Modern Red
  - Used for: Error states, warnings, destructive actions
  - CSS Variable: `--error-color`

## Implementation Rules

### CSS Variables Usage
```css
:root {
    --primary-color: #131138;      /* Deep Midnight Purple */
    --secondary-color: #3730a3;    /* Royal Blue-Purple */
    --accent-color: #a855f7;       /* Vibrant Purple */
    --text-color: #334155;         /* Steel Gray */
    --light-text: #64748b;         /* Lighter Steel Gray */
    --background: #fafafa;         /* Pure White */
    --light-background: #f8fafc;   /* Subtle Light Gray */
    --border-color: #e2e8f0;       /* Light Border */
    --success-color: #22d3ee;      /* Electric Cyan */
    --error-color: #ef4444;        /* Modern Red */
}
```

### Color Application Guidelines

#### Backgrounds
- **Hero Section**: `var(--primary-color)` - Deep Midnight Purple
- **Main Content**: `var(--background)` - Pure White
- **Section Alternates**: `var(--light-background)` - Subtle Light Gray
- **Cards/Components**: `var(--background)` - Pure White

#### Text Hierarchy
- **H1, H2 (Hero)**: White (on dark backgrounds)
- **H2, H3 (Content)**: `var(--primary-color)` - Deep Midnight Purple
- **Body Text**: `var(--text-color)` - Steel Gray
- **Secondary Text**: `var(--light-text)` - Lighter Steel Gray

#### Interactive Elements
- **Primary CTAs**: `var(--accent-color)` - Vibrant Purple
- **Secondary CTAs**: `var(--secondary-color)` - Royal Blue-Purple
- **Links**: `var(--accent-color)` - Vibrant Purple
- **Hover States**: Lighten primary colors by 10-20%

#### Success/Status Elements
- **Success States**: `var(--success-color)` - Electric Cyan
- **Checkmarks**: `var(--success-color)` - Electric Cyan
- **Error States**: `var(--error-color)` - Modern Red

### Gradient Combinations
- **Primary Gradient**: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
- **Accent Gradient**: `linear-gradient(135deg, var(--accent-color), var(--secondary-color))`
- **Success Gradient**: `linear-gradient(135deg, var(--success-color), var(--accent-color))`

### Accessibility Rules
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text
- All interactive elements must have focus states
- Color should not be the only way to convey information

### Animation Rules
- Use `ease-in-out` for most transitions
- Duration: 0.3s for hover effects, 0.6s for page transitions
- Respect `prefers-reduced-motion` settings

### Responsive Breakpoints
- Mobile: `max-width: 768px`
- Tablet: `769px - 1024px`
- Desktop: `1025px+`

## Component-Specific Rules

### Buttons
- **Primary**: Background `var(--accent-color)`, text white
- **Secondary**: Border `var(--secondary-color)`, text `var(--secondary-color)`
- **Hover**: Lift effect with `translateY(-2px)` and increased shadow

### Cards
- Background: `var(--background)`
- Border: `1px solid var(--border-color)`
- Shadow: `0 4px 6px rgba(0, 0, 0, 0.05)`
- Border radius: `1rem` (16px)

### Navigation
- Background: `var(--primary-color)`
- Text: White
- Hover: `var(--accent-color)`

### Forms
- Input borders: `var(--border-color)`
- Focus state: `var(--accent-color)`
- Error state: `var(--error-color)`
- Success state: `var(--success-color)`

## Brand Voice in Design
- **Professional** yet **approachable**
- **Modern** and **tech-forward**
- **Clean** and **minimal**
- **Trustworthy** and **reliable**

## File Structure
- Main styles: `/css/styles.css`
- Color variables defined in `:root` at top of main CSS file
- All colors should use CSS variables, not hardcoded hex values
- Document any deviations from this system

---

**Last Updated**: November 12, 2025
**Version**: 1.0
**Approved By**: Pipelai Team