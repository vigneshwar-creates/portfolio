// This script creates a custom "buttery smooth" cursor effect.

document.addEventListener('DOMContentLoaded', () => {
    // Only run this script on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    // Create the cursor element and add it to the page
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    // Variables to store mouse position and cursor position
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    // Variables for the scaling effect on click
    let currentScale = 1, targetScale = 1;

    // The 'speed' determines how much the cursor "lags" behind the mouse.
    // A lower value (e.g., 0.1) means more lag and a smoother, more "buttery" effect.
    const speed = 0.1; 

    // The core animation function
    function animate() {
        // Linearly interpolate the cursor's position towards the mouse's position
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        // Linearly interpolate the cursor's scale for the click effect
        currentScale += (targetScale - currentScale) * speed;

        // Apply the calculated position and scale to the cursor element using a 3D transform
        // for better performance. We offset by half the cursor size to center it.
        cursor.style.transform = `translate3d(${cursorX - 16}px, ${cursorY - 16}px, 0) scale(${currentScale})`;

        // Request the next animation frame to create a smooth loop
        requestAnimationFrame(animate);
    }
    // Start the animation loop
    animate();

    // Listen for mouse movement to update the target position
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Listen for mouse down and up to trigger the scaling effect
    document.addEventListener('mousedown', () => {
        targetScale = 0.8; // Shrink the cursor on click
    });

    document.addEventListener('mouseup', () => {
        targetScale = 1; // Return to normal size on release
    });
});

