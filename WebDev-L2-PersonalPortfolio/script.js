// Update the footer year automatically
const footerText = document.querySelector("footer p");

if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.textContent = `© ${currentYear} Macha Sneha. All Rights Reserved.`;
}
