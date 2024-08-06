document.addEventListener("DOMContentLoaded", () => {
    const profileButton = document.getElementById('profile-button');
    const profileSection = document.getElementById('profile-section');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    const logoutButton = document.getElementById('logout-button');
    const loginSignupForms = document.getElementById('login-signup-forms');
    const profileInfo = document.getElementById('profile-info');
    const showUpdateFormButton = document.getElementById('show-update-form');
    const updateForm = document.getElementById('update-form');
    const userUsernameElement = document.getElementById('user-username');
    const showDeleteConfirmLink = document.getElementById('show-delete-confirm');
    const deleteConfirm = document.getElementById('delete-confirm');
    const confirmDeleteButton = document.getElementById('confirm-delete-button');
    const cancelDeleteButton = document.getElementById('cancel-delete-button');
    const loginError = document.getElementById('login-error');
    const signupError = document.getElementById('signup-error');
    const updateError = document.getElementById('update-error');

    let userData = JSON.parse(localStorage.getItem('userData')); // Store user data in localStorage

    // Log all elements to check their presence
    console.log('Elements:', {
        profileButton,
        profileSection,
        loginForm,
        signupForm,
        showSignupLink,
        showLoginLink,
        logoutButton,
        loginSignupForms,
        profileInfo,
        showUpdateFormButton,
        updateForm,
        userUsernameElement,
        showDeleteConfirmLink,
        deleteConfirm,
        confirmDeleteButton,
        cancelDeleteButton,
        loginError,
        signupError,
        updateError
    });

    // Check if the user is authenticated
    function checkAuthentication() {
        console.log('Checking authentication:', userData);

        if (!loginSignupForms || !profileInfo || !logoutButton || !showUpdateFormButton || !updateForm || !profileButton || !userUsernameElement) {
            console.error('One or more elements are missing in the DOM', {
                profileButton,
                profileSection,
                loginForm,
                signupForm,
                showSignupLink,
                showLoginLink,
                logoutButton,
                loginSignupForms,
                profileInfo,
                showUpdateFormButton,
                updateForm,
                userUsernameElement,
                showDeleteConfirmLink,
                deleteConfirm,
                confirmDeleteButton,
                cancelDeleteButton
            });
            return;
        }

        if (userData) {
            loginSignupForms.style.display = 'none';
            profileInfo.style.display = 'block';
            userUsernameElement.textContent = userData.username;
            logoutButton.style.display = 'inline-block';
            showUpdateFormButton.style.display = 'inline-block';
            updateForm.style.display = 'none';
            profileButton.textContent = 'PROFILE';
        } else {
            loginSignupForms.style.display = 'block';
            profileInfo.style.display = 'none';
            logoutButton.style.display = 'none';
            showUpdateFormButton.style.display = 'none';
            updateForm.style.display = 'none';
            profileButton.textContent = 'LOG IN';
        }
    }

    profileButton.addEventListener('click', () => {
        profileSection.style.display = 'block';
        checkAuthentication();
    });

    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    showUpdateFormButton.addEventListener('click', () => {
        profileInfo.style.display = 'none';
        updateForm.style.display = 'block';
    });

    showDeleteConfirmLink.addEventListener('click', (e) => {
        e.preventDefault();
        deleteConfirm.style.display = 'block';
    });

    cancelDeleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        deleteConfirm.style.display = 'none';
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('userData'); // Clear user data from localStorage
        userData = null; // Clear user data
        profileSection.style.display = 'none';
        window.location.reload(); // Refresh the page
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();
            if (response.ok) {
                userData = data; // Store user data
                localStorage.setItem('userData', JSON.stringify(userData)); // Save user data to localStorage
                profileSection.style.display = 'none';
                window.location.reload(); // Refresh the page
                loginError.textContent = '';
                loginError.style.display = 'none';
            } else {
                loginError.textContent = data.message || 'Failed to log in. Please check your username and password.';
                loginError.style.display = 'block';
                console.error('Failed to log in:', data);
            }
        } catch (error) {
            loginError.textContent = 'Error logging in. Please try again later.';
            loginError.style.display = 'block';
            console.error('Error logging in:', error);
        }
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        try {
            const response = await fetch('http://localhost:3001/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();
            if (response.ok) {
                userData = data; // Store user data
                localStorage.setItem('userData', JSON.stringify(userData)); // Save user data to localStorage
                profileSection.style.display = 'none';
                window.location.reload(); // Refresh the page
                signupError.textContent = '';
                signupError.style.display = 'none';
            } else {
                signupError.textContent = data.message || 'Failed to sign up. Please check your details.';
                signupError.style.display = 'block';
                console.error('Failed to sign up:', data);
            }
        } catch (error) {
            signupError.textContent = 'Error signing up. Please try again later.';
            signupError.style.display = 'block';
            console.error('Error signing up:', error);
        }
    });

    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('update-username').value;
        const password = document.getElementById('update-password').value;

        try {
            const response = await fetch('http://localhost:3001/api/users/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();
            if (response.ok) {
                userData = data; // Update user data
                localStorage.setItem('userData', JSON.stringify(userData)); // Update user data in localStorage
                profileInfo.style.display = 'block';
                updateForm.style.display = 'none'; // Hide update form after successful update
                checkAuthentication();
                updateError.textContent = '';
                updateError.style.display = 'none';
            } else {
                if (data.message && data.message.includes('duplicate key error')) {
                    updateError.textContent = 'Username is already taken. Please choose a different one.';
                } else {
                    updateError.textContent = data.message || 'Failed to update profile. Please check your details.';
                }
                updateError.style.display = 'block';
                console.error('Failed to update profile:', data);
            }
        } catch (error) {
            updateError.textContent = 'Error updating profile. Please try again later.';
            updateError.style.display = 'block';
            console.error('Error updating profile:', error);
        }
    });

    confirmDeleteButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:3001/api/users/profile', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            });

            if (response.ok) {
                localStorage.removeItem('userData'); // Clear user data from localStorage
                userData = null; // Clear user data
                profileSection.style.display = 'none';
                window.location.reload(); // Refresh the page
            } else {
                console.error('Failed to delete account');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    });

    document.querySelectorAll('.login-close-button').forEach(button => {
        button.addEventListener('click', () => {
            profileSection.style.display = 'none';
        });
    });

    checkAuthentication(); // Check authentication status on page load
});
