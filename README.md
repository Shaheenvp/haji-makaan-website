# Haji Makaan Restaurant Website

A premium, interactive website for Haji Makaan Restaurant located in Edapally, Kochi.

## Features

- **Modern, Premium Design**: Elegant UI matching the restaurant's brand colors (gold, bronze, brown)
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Full-Screen Menu Pages**: Separate full-screen pages for Dine-In and Takeaway menus with PDF viewers
- **Online Reservations**: Easy-to-use reservation form with validation
- **Gallery Section**: Showcase restaurant ambiance and dishes
- **Contact Information**: Integrated Google Maps, social media links, and contact details
- **Smooth Animations**: Professional scroll animations and transitions
- **Social Media Integration**: Links to Instagram and Google Business Profile

## Setup Instructions

1. **Add Logo**: Place your restaurant logo file as `logo.png` in the same directory as `index.html`

2. **Add Menu PDFs**: 
   - Upload `menu-dinein.pdf` (your Dine-In menu)
   - Upload `menu-takeaway.pdf` (your Takeaway menu)
   - Both files should be in the same folder as `index.html` and `menu.html`
   - See `MENU_PDF_INSTRUCTIONS.txt` for detailed instructions

3. **Update Contact Information**: 
   - Edit the phone number in `index.html` (replace `+91 XXXXXXXXXX`)
   - Update the email address if needed
   - Verify the Google Maps embed URL for the exact location

4. **Add Real Images**:
   - Replace placeholder divs in the Gallery section with actual images
   - Add food images to menu items if desired
   - Update the About section image placeholder

5. **Open the Website**:
   - Simply open `index.html` in a web browser
   - For production, upload all files to a web server

## File Structure

```
.
├── index.html              # Main HTML file (homepage)
├── menu-dinein.html        # Full-screen Dine-In menu page
├── menu-takeaway.html      # Full-screen Takeaway menu page
├── styles.css              # All styling and responsive design
├── script.js               # Interactive features and functionality
├── logo.png                # Restaurant logo (you need to add this)
├── menu-dinein.pdf         # Dine-In menu PDF (you need to add this)
├── menu-takeaway.pdf       # Takeaway menu PDF (you need to add this)
├── README.md               # This file
├── MENU_PDF_INSTRUCTIONS.txt  # Menu PDF upload guide
└── LOGO_INSTRUCTIONS.txt   # Logo setup guide
```

## Customization

### Colors
The color scheme matches the logo:
- Gold: `#D4AF37`
- Bronze: `#CD7F32`
- Brown Dark: `#5C4033`
- Brown Medium: `#6B4423`

You can modify these in the `:root` section of `styles.css`.

### Menu PDFs
The menu is displayed as PDF files on separate full-screen pages. Simply replace `menu-dinein.pdf` and `menu-takeaway.pdf` with your own menu PDFs. Each menu page (`menu-dinein.html` and `menu-takeaway.html`) will automatically display the corresponding PDF in full screen with options to download or open in a new tab. Users can easily switch between Dine-In and Takeaway menus using the menu switcher.

### Social Media Links
Social media links are already integrated:
- Instagram: https://www.instagram.com/hajimakaan/
- Google Business: https://share.google/xUPIuE6SnnkcnTNBh

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The reservation form currently shows a success message. To actually process reservations, you'll need to connect it to a backend service.
- The Google Maps embed uses a placeholder. Update it with your exact location coordinates.
- All images are currently placeholders. Replace them with actual restaurant photos for best results.

## License

This website is created specifically for Haji Makaan Restaurant.

