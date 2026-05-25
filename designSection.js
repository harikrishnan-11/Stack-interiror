document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Optional: Close other open accordion items (Single Open Behavior)
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle active state of the clicked item
            if (isExpanded) {
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            } else {
                header.setAttribute('aria-expanded', 'true');
                // Dynamically sets the height based on the text content size
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});