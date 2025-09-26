# Hui Prism Theme Testbed

This testbed provides a comprehensive testing environment for the Hui Prism theme with various code examples and interactive features.

## Features

- **Multiple Language Examples**: JavaScript, Python, CSS/SCSS, HTML, JSON, Bash, TypeScript
- **Theme Switching**: Toggle between development and production builds
- **Copy to Clipboard**: Easy code copying functionality
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance Monitoring**: Built-in performance tracking

## Usage

### Quick Start

```bash
# Build theme and start testbed server
npm run testbed

# Or build and open in browser automatically
npm run testbed:open
```

### Manual Setup

```bash
# Build the theme first
npm run build:dev

# Start a local server in the testbed directory
cd testbed
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

## Keyboard Shortcuts

- `Ctrl/Cmd + D` - Switch to Development theme
- `Ctrl/Cmd + P` - Switch to Production theme
- `Escape` - Close notifications

## File Structure

```
testbed/
├── index.html          # Main testbed page
├── testbed.css         # Testbed-specific styles
├── testbed.js          # Interactive functionality
└── README.md           # This file
```

## Testing Different Themes

The testbed automatically loads the latest built theme from `../dist/theme.css`. To test different theme variants:

1. Build the desired theme variant:
   ```bash
   npm run build:dev    # Development build
   npm run build:prod   # Production build
   ```

2. Use the theme switcher buttons in the testbed interface

3. Or use keyboard shortcuts for quick switching

## Code Examples

The testbed includes comprehensive examples for:

- **JavaScript**: Modern ES6+ features, async/await, classes
- **Python**: Type hints, dataclasses, async programming
- **CSS/SCSS**: Custom properties, modern selectors, responsive design
- **HTML**: Semantic markup, accessibility features
- **JSON**: Configuration files, API responses
- **Bash**: Shell scripting, error handling
- **TypeScript**: Interfaces, generics, utility types

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Development

The testbed is designed to be:
- **Excluded from npm packages** (via `.npmignore`)
- **Included in git repository** for development and testing
- **Self-contained** with all necessary assets
- **Responsive** for testing on different devices

## Notes

- The testbed uses CDN-hosted Prism.js for syntax highlighting
- Theme switching is handled via JavaScript for dynamic testing
- All examples are real-world code snippets for authentic testing
- Performance metrics are logged to the browser console
