document.addEventListener('DOMContentLoaded', () => {
    const profileButton = document.getElementById('profile-button');
    const profileModal = document.getElementById('profile-modal');
    const closeProfileModal = document.getElementById('close-profile-modal');
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const profileSection = document.getElementById('profile-section');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const logoutButton = document.getElementById('logout-button');
    const profileUsername = document.getElementById('profile-username');
    let user = JSON.parse(localStorage.getItem('user'));

    const API_URL = 'https://winenot-i5n3.onrender.com/api';


    const toggleProfileModal = (show) => {
        profileModal.style.display = show ? 'block' : 'none';
    };

    const toggleSections = () => {
        if (user) {
            loginSection.style.display = 'none';
            signupSection.style.display = 'none';
            profileSection.style.display = 'block';
            profileUsername.textContent = user.username;
        } else {
            loginSection.style.display = 'block';
            signupSection.style.display = 'none';
            profileSection.style.display = 'none';
        }
    };

    profileButton.addEventListener('click', () => toggleProfileModal(true));
    closeProfileModal.addEventListener('click', () => toggleProfileModal(false));
    window.addEventListener('click', (event) => {
        if (event.target === profileModal) {
            toggleProfileModal(false);
        }
    });

    showSignup.addEventListener('click', () => {
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
    });

    showLogin.addEventListener('click', () => {
        signupSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                user = await response.json();
                localStorage.setItem('user', JSON.stringify(user));
                toggleSections();
            } else {
                console.error('Failed to login:', await response.json());
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    });

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                user = await response.json();
                localStorage.setItem('user', JSON.stringify(user));
                toggleSections();
            } else {
                console.error('Failed to sign up:', await response.json());
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    });

    logoutButton.addEventListener('click', () => {
        user = null;
        localStorage.removeItem('user');
        toggleSections();
    });

    toggleSections(); 
});
