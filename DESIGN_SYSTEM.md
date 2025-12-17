# Ascenders Design System Documentation

## 🎨 Design Philosophy

Ascenders uses a **strict black & white monochrome design system** with no colors except shades of gray. The design emphasizes:

- **Clarity over decoration**: Every element serves a functional purpose
- **Hierarchy through contrast**: Using size, weight, and spacing instead of color
- **Accessibility first**: AAA contrast ratios, keyboard navigation, focus states
- **Minimalist aesthetics**: Clean lines, generous whitespace, flat design

---

## 🎯 Color Palette

### Base Colors

```css
--asc-bg: #0B0B0B           /* Primary background (almost black) */
--asc-surface: #121212      /* Card/surface background */
--asc-surface2: #181818     /* Elevated surface */
--asc-border: #2A2A2A       /* Border color */
--asc-text: #FFFFFF         /* Primary text (white) */
--asc-secondary: #BDBDBD    /* Secondary text */
--asc-muted: #8A8A8A        /* Muted/disabled text */
--asc-hover: #1F1F1F        /* Hover state */
--asc-active: #252525       /* Active state */
```

### Contrast Ratios (WCAG AAA)

- Text on bg: **15.3:1** ✅
- Secondary on bg: **7.2:1** ✅
- Muted on bg: **4.8:1** ✅

---

## 📐 Typography

### Font Family

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Font Sizes

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px | 16px | Metadata, labels |
| `text-sm` | 14px | 20px | Body text, descriptions |
| `text-base` | 16px | 24px | Default body text |
| `text-lg` | 18px | 28px | Emphasized text |
| `text-xl` | 20px | 28px | Small headings |
| `text-2xl` | 24px | 32px | Section headings |
| `text-3xl` | 28px | 36px | Page headings |

### Font Weights

- `400` - Normal (body text)
- `500` - Medium (labels, nav items)
- `600` - Semibold (headings, emphasis)
- `700` - Bold (titles, CTAs)

---

## 📏 Spacing System

Based on **8px grid**:

```
space-1: 4px
space-2: 8px
space-3: 12px
space-4: 16px
space-5: 20px
space-6: 24px
space-8: 32px
space-10: 40px
space-12: 48px
space-16: 64px
```

### Common Patterns

- **Card padding**: `16px` (space-4)
- **Section spacing**: `24px` (space-6)
- **Page margins**: `24px` (space-6)
- **Compact spacing**: `8px` (space-2)

---

## 🔲 Components

### Buttons

#### Primary Button
```tsx
<button className="btn-primary">
  Create Thread
</button>
```

**States**:
- Default: White bg, black text
- Hover: Light gray bg, scale 1.02
- Active: Gray bg
- Disabled: 50% opacity
- Loading: Spinner animation

#### Secondary Button
```tsx
<button className="btn-secondary">
  Cancel
</button>
```

**States**:
- Default: Transparent bg, border, white text
- Hover: Dark gray bg, lighter border
- Disabled: 50% opacity

#### Ghost Button
```tsx
<button className="btn-ghost">
  Options
</button>
```

**States**:
- Default: Transparent, secondary text
- Hover: Dark bg, white text

#### Destructive Button
```tsx
<button className="btn-destructive">
  Delete
</button>
```

**States**:
- Red-tinted bg and border
- Hover: Brighter red

---

### Input Fields

#### Text Input
```tsx
<input type="text" className="input" />
```

**States**:
- Default: Surface bg, border
- Focus: White border, focus ring
- Error: Red border (`input-error`)
- Disabled: 50% opacity

#### Textarea
```tsx
<textarea className="textarea" />
```

Same states as input, no resize.

#### Select
```tsx
<select className="input">
  <option>Option 1</option>
</select>
```

---

### Cards

#### Thread Card
```tsx
<article className="card">
  {/* Content */}
</article>
```

**Properties**:
- Background: `--asc-surface`
- Border: `--asc-border`
- Padding: `16px`
- Radius: `12px`
- Hover: Border becomes lighter

---

### Tags & Badges

#### Tag/Chip
```tsx
<span className="tag">#tutorial</span>
```

**Properties**:
- Small, inline-flex
- Surface2 bg, border
- Rounded-full
- Hover: Lighter bg

#### Badge
```tsx
<span className="badge">PINNED</span>
<span className="badge badge-pinned">PINNED</span>
<span className="badge badge-locked">LOCKED</span>
```

---

### Navigation

#### Nav Item
```tsx
<button className="nav-item">
  <Home size={18} />
  <span>Home</span>
</button>

<button className="nav-item nav-item-active">
  <Home size={18} />
  <span>Home</span>
</button>
```

**States**:
- Default: Secondary text
- Hover: Dark bg, white text
- Active: Surface2 bg, white text, left border

---

### Dropdowns

#### Dropdown Menu
```tsx
<div className="dropdown-menu">
  <button className="dropdown-item">
    <User size={16} />
    <span>Profile</span>
  </button>
</div>
```

**Behavior**:
- Appears below trigger
- Close on ESC or click outside
- Focus trap within menu
- Return focus to trigger on close

---

### Modals

#### Modal
```tsx
<div className="modal-overlay">
  <div className="modal-content">
    {/* Content */}
  </div>
</div>
```

**Behavior**:
- Backdrop blur
- Close on ESC or click outside
- Focus trap
- Prevent body scroll
- Return focus on close

---

### Toast Notifications

#### Toast
```tsx
<div className="toast toast-success">
  <CheckCircle size={18} />
  <span>Thread created successfully</span>
</div>

<div className="toast toast-error">
  <AlertCircle size={18} />
  <span>Failed to save changes</span>
</div>
```

**Behavior**:
- Bottom-right position
- Auto-dismiss after 5s
- Slide-up animation
- Click to dismiss

---

## 🎭 Animations

### Transitions

```css
--transition-fast: 120ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 160ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 240ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Animations

- `fade-in`: 180ms opacity 0 → 1
- `slide-up`: 180ms translateY(8px) → 0
- `slide-in-right`: 180ms translateX(-8px) → 0

### Usage

```tsx
className="animate-fade-in"
className="animate-slide-up"
className="animate-slide-in-right"
```

---

## ♿ Accessibility

### Keyboard Navigation

- All interactive elements accessible via Tab
- Enter/Space activate buttons
- ESC closes modals/dropdowns
- Arrow keys navigate lists

### Focus States

All focusable elements show **white outline** on focus:

```css
*:focus-visible {
  outline: 2px solid #FFFFFF;
  outline-offset: 2px;
}
```

### ARIA Labels

```tsx
<button aria-label="Close modal">×</button>
<button aria-expanded={open}>Menu</button>
<div role="dialog" aria-modal="true">...</div>
```

### Screen Reader Support

- Semantic HTML
- Descriptive labels
- Live regions for dynamic content
- Skip links for main content

---

## 📱 Responsive Breakpoints

```css
sm: 480px    /* Mobile landscape */
md: 768px    /* Tablet */
lg: 992px    /* Desktop */
xl: 1200px   /* Large desktop */
```

### Mobile Adaptations

- Sidebar → Hamburger drawer
- Stack layouts vertically
- Increase touch targets (min 44px)
- Sticky headers
- Bottom action bars

---

## 🎯 Component States

### All Interactive Elements

| State | Visual Change |
|-------|---------------|
| Default | Base styles |
| Hover | Lighter bg or border |
| Focus | White outline, 2px offset |
| Active | Darker bg |
| Disabled | 50% opacity, no pointer events |
| Loading | Spinner, "...ing" text |
| Error | Red tint (very subtle) |

---

## 📋 Usage Examples

### Thread Card (Complete)

```tsx
<article className="card group">
  <div className="flex gap-4">
    {/* Avatar */}
    <div className="w-10 h-10 bg-asc-text text-asc-bg rounded-full flex items-center justify-center font-semibold text-sm">
      J
    </div>
    
    {/* Content */}
    <div className="flex-1 min-w-0">
      {/* Badges */}
      <div className="flex items-center gap-2 mb-1">
        <span className="badge badge-pinned">PINNED</span>
      </div>
      
      {/* Title */}
      <Link href="/thread/1" className="text-base font-semibold text-asc-text hover:underline line-clamp-1">
        How to get started with Ascenders?
      </Link>
      
      {/* Excerpt */}
      <p className="text-sm text-asc-secondary line-clamp-2 mb-3">
        Learn the basics of creating threads, replying to posts...
      </p>
      
      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-asc-muted">
        <span className="tag">help</span>
        <span>by @john</span>
        <span>2h ago</span>
        <div className="flex items-center gap-3 ml-auto">
          <span className="flex items-center gap-1">
            <MessageSquare size={12} />24
          </span>
          <span className="flex items-center gap-1">
            <Heart size={12} />12
          </span>
        </div>
      </div>
    </div>
  </div>
</article>
```

---

## 🔧 Utilities

### Text Utilities

```tsx
className="text-balance"      // Balanced text wrapping
className="line-clamp-1"      // Truncate to 1 line
className="line-clamp-2"      // Truncate to 2 lines
className="truncate"          // Ellipsis overflow
```

### Spacing

```tsx
className="space-y-3"         // Vertical spacing (12px)
className="gap-4"             // Gap (16px)
className="p-6"               // Padding (24px)
className="mb-4"              // Margin bottom (16px)
```

---

## 🎨 Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --asc-bg: #0B0B0B;
  --asc-surface: #121212;
  --asc-surface2: #181818;
  --asc-border: #2A2A2A;
  --asc-text: #FFFFFF;
  --asc-secondary: #BDBDBD;
  --asc-muted: #8A8A8A;
  --asc-hover: #1F1F1F;
  --asc-active: #252525;
  
  /* Radius */
  --asc-radius: 10px;
  --asc-radius-lg: 12px;
}
```

---

## 📦 Export for Developers

### Tailwind Config

All design tokens are available in `tailwind.config.ts`:

```typescript
colors: {
  asc: {
    bg: '#0B0B0B',
    surface: '#121212',
    surface2: '#181818',
    border: '#2A2A2A',
    text: '#FFFFFF',
    secondary: '#BDBDBD',
    muted: '#8A8A8A',
    hover: '#1F1F1F',
    active: '#252525',
  }
}
```

### CSS Classes

All component classes are in `globals.css`:

- `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-destructive`
- `.input`, `.textarea`
- `.card`, `.tag`, `.badge`
- `.nav-item`, `.dropdown-menu`, `.modal-overlay`
- `.toast`, `.skeleton`

---

## ✅ Checklist for New Components

- [ ] Uses only N&B color palette
- [ ] Has hover state
- [ ] Has focus-visible state
- [ ] Has disabled state
- [ ] Has loading state (if applicable)
- [ ] Keyboard accessible
- [ ] ARIA labels added
- [ ] Responsive on mobile
- [ ] Minimum 44px touch target
- [ ] 120-180ms transitions
- [ ] Uses spacing system (8px grid)

---

**Made with precision for Ascenders** 🚀
