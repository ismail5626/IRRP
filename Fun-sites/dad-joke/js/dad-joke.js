(() => {
    'use strict';

    /**
     * Joke Generator Module
     * Enhancements: Better API error handling, limited localStorage size, improved accessibility, and comments for clarity.
     */
    const JokeApp = (() => {
        // DOM Elements Cache
        const elements = {
            jokeText: document.getElementById('joke'),
            newJokeBtn: document.getElementById('new-joke-btn'),
            copyBtn: document.getElementById('copy-btn'),
            shareBtn: document.getElementById('share-btn'),
            loader: document.getElementById('loader'),
            themeSelector: document.getElementById('theme'),
            darkModeToggle: document.getElementById('dark-mode-toggle'),
            submitForm: document.getElementById('joke-submission-form'),
            userJokeInput: document.getElementById('user-joke'),
            statusMessage: document.getElementById('status-message')
        };

        // Configuration Constants
        const CONFIG = {
            API_ENDPOINTS: {
                dad: 'https://icanhazdadjoke.com/',
                tech: 'https://v2.jokeapi.dev/joke/Programming?type=single',
            },
            LOCAL_STORAGE_KEYS: {
                DARK_MODE: 'jokeAppDarkMode',
                JOKE_HISTORY: 'jokeHistory'
            },
            ERROR_MESSAGES: {
                NETWORK: 'Network error - please check your connection',
                API: 'Service unavailable - try again later',
                CLIPBOARD: 'Clipboard access denied - please copy manually',
                SUBMISSION: 'Joke must be between 10-500 characters'
            },
            JOKE_HISTORY_LIMIT: 10 // Limits the number of jokes saved in localStorage
        };

        // State Management
        let state = {
            currentJoke: null,
            isDarkMode: false,
            isLoading: false,
            jokeHistory: []
        };

        /** Initialize the application */
        function init() {
            validateDOMElements();
            setupEventListeners();
            restorePreferences();
            loadInitialJoke();
        }

        /** Validate required DOM elements exist */
        function validateDOMElements() {
            const requiredElements = [
                'jokeText', 'newJokeBtn', 'loader',
                'themeSelector', 'darkModeToggle'
            ];

            requiredElements.forEach(key => {
                if (!elements[key]) {
                    throw new Error(`Critical DOM element missing: ${key}`);
                }
            });
        }

        /** Set up application event listeners */
        function setupEventListeners() {
            // Button interactions
            elements.newJokeBtn.addEventListener('click', throttle(fetchJoke, 1000));
            elements.copyBtn.addEventListener('click', handleCopyJoke);
            elements.shareBtn.addEventListener('click', handleShareJoke);
            elements.darkModeToggle.addEventListener('click', toggleDarkMode);

            // Form submission
            elements.submitForm?.addEventListener('submit', handleJokeSubmission);

            // System events
            window.addEventListener('online', handleNetworkStatus);
            window.addEventListener('offline', handleNetworkStatus);
        }

        /** Fetch joke from API with improved error handling */
        async function fetchJoke() {
            if (state.isLoading) return;

            try {
                setLoadingState(true);
                const category = elements.themeSelector.value;
                const endpoint = CONFIG.API_ENDPOINTS[category];

                if (!endpoint) throw new Error('Invalid joke category');

                const response = await fetch(endpoint, {
                    headers: { Accept: 'application/json' }
                });

                if (!response.ok) throw new Error('API Error');

                const data = await response.json();
                const joke = data?.joke || `${data.setup} ${data.delivery}` || 'No joke found';

                updateJokeState(joke);
                updateStatusMessage('New joke loaded!', 'success');
            } catch (error) {
                handleFetchError(error);
            } finally {
                setLoadingState(false);
            }
        }

        /** Handle clipboard copy functionality */
        async function handleCopyJoke() {
            try {
                if (!state.currentJoke) throw new Error('No joke available to copy');
                await navigator.clipboard.writeText(state.currentJoke);
                updateStatusMessage('Copied to clipboard!', 'success');
            } catch (error) {
                updateStatusMessage(CONFIG.ERROR_MESSAGES.CLIPBOARD, 'error');
            }
        }

        /** Handle social sharing */
        function handleShareJoke() {
            if (!state.currentJoke) return;

            const shareUrl = new URL('https://twitter.com/intent/tweet');
            shareUrl.searchParams.set('text', `${state.currentJoke} 🤣`);

            window.open(
                shareUrl.toString(),
                'twitter-share',
                'width=550,height=235'
            );
        }

        /** Toggle dark mode */
        function toggleDarkMode() {
            state.isDarkMode = !state.isDarkMode;
            document.body.classList.toggle('dark-mode', state.isDarkMode);
            elements.darkModeToggle.setAttribute('aria-pressed', state.isDarkMode);
            localStorage.setItem(CONFIG.LOCAL_STORAGE_KEYS.DARK_MODE, state.isDarkMode);
        }


        /** Utility Functions */

        function updateJokeState(joke) {
            state.currentJoke = joke;
            elements.jokeText.textContent = joke;
            state.jokeHistory = [joke, ...state.jokeHistory.slice(0, CONFIG.JOKE_HISTORY_LIMIT - 1)];
            localStorage.setItem(CONFIG.LOCAL_STORAGE_KEYS.JOKE_HISTORY, JSON.stringify(state.jokeHistory));
        }

        function setLoadingState(isLoading) {
            state.isLoading = isLoading;
            elements.loader.classList.toggle('hidden', !isLoading);
            elements.newJokeBtn.disabled = isLoading;
        }

        function updateStatusMessage(message, type = 'info') {
            elements.statusMessage.textContent = message;
            elements.statusMessage.className = `status-message ${type}`;
            elements.statusMessage.hidden = false;

            setTimeout(() => {
                elements.statusMessage.hidden = true;
            }, 3000);
        }

        function handleFetchError(error) {
            console.error('Joke fetch error:', error);
            const message = navigator.onLine ?
                CONFIG.ERROR_MESSAGES.API :
                CONFIG.ERROR_MESSAGES.NETWORK;

            updateStatusMessage(message, 'error');
            elements.jokeText.textContent = state.jokeHistory[0] || '😞 No jokes available';
        }

        function validateJokeSubmission(joke) {
            return joke.length >= 10 && joke.length <= 500;
        }

        function restorePreferences() {
            const savedDarkMode = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEYS.DARK_MODE);

            state.isDarkMode = savedDarkMode === 'true';
            document.body.classList.toggle('dark-mode', state.isDarkMode);
            elements.darkModeToggle.setAttribute('aria-pressed', state.isDarkMode);

            const storedJokes = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEYS.JOKE_HISTORY);
            state.jokeHistory = storedJokes ? JSON.parse(storedJokes) : [];
        }

        function loadInitialJoke() {
            if (state.jokeHistory.length > 0) {
                elements.jokeText.textContent = state.jokeHistory[0];
            } else {
                fetchJoke();
            }
        }

        function handleNetworkStatus() {
            updateStatusMessage(
                navigator.onLine ?
                    'Back online!' :
                    'Network connection lost',
                navigator.onLine ? 'success' : 'error'
            );
        }

        function throttle(func, limit) {
            let lastFunc;
            let lastRan;

            return function () {
                const context = this;
                const args = arguments;

                if (!lastRan) {
                    func.apply(context, args);
                    lastRan = Date.now();
                } else {
                    clearTimeout(lastFunc);
                    lastFunc = setTimeout(() => {
                        if ((Date.now() - lastRan) >= limit) {
                            func.apply(context, args);
                            lastRan = Date.now();
                        }
                    }, limit - (Date.now() - lastRan));
                }
            };
        }

        return { init };
    })();

    // Initialize application after DOM load
    document.addEventListener('DOMContentLoaded', () => {
        JokeApp.init();
    });
})();
