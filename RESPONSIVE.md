# Responsive Design Guidelines

This document provides guidelines for maintaining responsive design across all devices for the Pilots Cup website.

## Breakpoints

The website uses the following breakpoints:

- **Mobile**: 0-767px
- **Tablet**: 768-991px
- **Desktop**: 992-1199px
- **Large Desktop**: 1200px and above

## Files to Maintain

The following files are critical for responsive design:

1. `styles/globals.css` - Contains global responsive styles with a mobile-first approach
2. `public/mobile-responsive.css` - Contains additional responsive styles
3. `components/ResponsiveOptimizer.js` - JavaScript component that handles device-specific adjustments
4. `hooks/useResponsive.js` - React hook for responsive design in components
5. `components/ResponsiveWrapper.js` - Component for conditional rendering based on device type
6. `pages/_document.js` - Contains viewport and other meta tags for responsive design

## Best Practices

### CSS

- Always use a mobile-first approach (start with mobile styles, then add media queries for larger screens)
- Use relative units (%, em, rem) instead of fixed units (px) where possible
- Use CSS variables for consistent values across the site
- Test all changes on multiple devices and screen sizes

### JavaScript

- Use the `useResponsive` hook to conditionally render content based on screen size
- Use the `ResponsiveWrapper` component for more complex conditional rendering
- Avoid hard-coding pixel values in JavaScript

### Images

- Always use responsive images with appropriate srcset and sizes attributes
- Optimize images for different screen sizes
- Consider using next/image for automatic optimization

### Testing

Test your changes on the following devices:
- Mobile phones (small and large)
- Tablets (portrait and landscape)
- Laptops
- Desktop monitors
- High-resolution displays

## Deployment

When deploying to Render.com:

1. Ensure the `build.sh` script is executable
2. Verify that `render.yaml` includes the responsive headers
3. Test the deployed site on multiple devices

## Troubleshooting

If you encounter responsive design issues:

1. Check the viewport meta tag in `_document.js`
2. Verify that `ResponsiveOptimizer.js` is working correctly
3. Check for any hard-coded pixel values in your components
4. Test with the browser's device emulation tools
5. Use the `useResponsive` hook to log the current device type

## Resources

- [MDN Web Docs: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Next.js Documentation](https://nextjs.org/docs)
- [CSS-Tricks: A Complete Guide to CSS Media Queries](https://css-tricks.com/a-complete-guide-to-css-media-queries/)
- [Responsive Design Checker](https://responsivedesignchecker.com/) 