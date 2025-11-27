// Repelling effect for floating background elements
class RepellingElements {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.mouse = { x: 0, y: 0 };
        this.repellingRadius = 100; // Distance at which repelling starts
        this.maxRepellingForce = 150; // Maximum distance elements can be pushed
        this.damping = 0.5; // How quickly elements return to original position

        this.init();
    }

    init() {
        // Initialize element positions
        this.elements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            element.originalX = rect.left + rect.width / 2;
            element.originalY = rect.top + rect.height / 2;
            element.currentX = element.originalX;
            element.currentY = element.originalY;
            element.velocityX = 0;
            element.velocityY = 0;

            // Make elements absolutely positioned for smooth movement
            element.style.position = 'absolute';
            element.style.left = `${element.originalX - rect.width / 2}px`;
            element.style.top = `${element.originalY - rect.height / 2}px`;
            element.style.transform = 'translate(-50%, -50%)';
        });

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Start animation loop
        this.animate();
    }

    animate() {
        this.elements.forEach(element => {
            const dx = this.mouse.x - element.currentX;
            const dy = this.mouse.y - element.currentY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.repellingRadius && distance > 0) {
                // Calculate repelling force (stronger when closer)
                const force = (this.repellingRadius - distance) / this.repellingRadius;
                const forceX = (dx / distance) * force * this.maxRepellingForce;
                const forceY = (dy / distance) * force * this.maxRepellingForce;

                // Apply force to velocity
                element.velocityX -= forceX;
                element.velocityY -= forceY;
            }

            // Apply damping and return to original position
            const returnForce = 0.02;
            element.velocityX += (element.originalX - element.currentX) * returnForce;
            element.velocityY += (element.originalY - element.currentY) * returnForce;

            element.velocityX *= this.damping;
            element.velocityY *= this.damping;

            // Update position
            element.currentX += element.velocityX;
            element.currentY += element.velocityY;

            // Apply new position
            element.style.left = `${element.currentX}px`;
            element.style.top = `${element.currentY}px`;
        });

        requestAnimationFrame(() => this.animate());
    }

    // Method to adjust repelling parameters
    setRepellingRadius(radius) {
        this.repellingRadius = radius;
    }

    setMaxRepellingForce(force) {
        this.maxRepellingForce = force;
    }

    setDamping(damping) {
        this.damping = damping;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize repelling effect for floating background elements
    const repellingElements = new RepellingElements('.animate-float');

    // Optional: Add some subtle random movement for more organic feel
    setInterval(() => {
        document.querySelectorAll('.animate-float').forEach(element => {
            if (!element.velocityX) element.velocityX = 0;
            if (!element.velocityY) element.velocityY = 0;

            // Add small random movement
            element.velocityX += (Math.random() - 0.5) * 0.5;
            element.velocityY += (Math.random() - 0.5) * 0.5;
        });
    }, 2000);
});
