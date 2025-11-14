// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- Get All Elements ---
    
    // Modals
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal'); // New
    const cartModal = document.getElementById('cart-modal');
    
    // Side Panel
    const sidePanel = document.getElementById('side-panel');
    
    // Open Buttons
    const loginOpenBtn = document.getElementById('login-open-btn');
    const signupOpenBtn = document.getElementById('signup-open-btn'); // New
    const cartOpenBtn = document.getElementById('cart-open-btn');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    
    // Close Buttons
    const loginCloseBtn = document.getElementById('login-close-btn');
    const signupCloseBtn = document.getElementById('signup-close-btn'); // New
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const sidePanelCloseBtn = document.getElementById('side-panel-close-btn');
    
    // Modal Switching Links
    const signupLink = document.getElementById('signup-link'); // New
    const loginLink = document.getElementById('login-link'); // New

    // Overlay
    const overlay = document.getElementById('overlay');

    
    // --- Helper Functions ---
    
    function openModal(modal) {
        modal.classList.add('open');
        overlay.classList.add('active');
    }

    function closeModal(modal) {
        modal.classList.remove('open');
        overlay.classList.remove('active');
    }

    function openSidePanel() {
        sidePanel.classList.add('open');
        overlay.classList.add('active');
    }

    function closeSidePanel() {
        sidePanel.classList.remove('open');
        overlay.classList.remove('active');
    }

    // Updated closeAll to include signupModal
    function closeAll() {
        closeModal(loginModal);
        closeModal(signupModal); // Updated
        closeModal(cartModal);
        closeSidePanel();
    }

    
    // --- Event Listeners ---
    
    // Open Login Modal
    loginOpenBtn.addEventListener('click', () => {
        openModal(loginModal);
    });

    // Open Signup Modal (New)
    signupOpenBtn.addEventListener('click', () => {
        openModal(signupModal);
    });
    
    // Open Cart Modal
    cartOpenBtn.addEventListener('click', () => {
        openModal(cartModal);
    });

    // Open Side Panel
    menuToggleBtn.addEventListener('click', () => {
        openSidePanel();
    });

    // Close Buttons
    loginCloseBtn.addEventListener('click', () => {
        closeModal(loginModal);
    });

    signupCloseBtn.addEventListener('click', () => { // New
        closeModal(signupModal);
    });

    cartCloseBtn.addEventListener('click', () => {
        closeModal(cartModal);
    });

    sidePanelCloseBtn.addEventListener('click', () => {
        closeSidePanel();
    });

    // Modal Switching Listeners (New)
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(signupModal);
    });

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        openModal(loginModal);
    });

    // Close by clicking overlay
    overlay.addEventListener('click', () => {
        closeAll();
    });

    // Close with 'Escape' key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAll();
        }
    });
});