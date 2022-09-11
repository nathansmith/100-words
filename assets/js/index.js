// ===============
// START: closure.
// ===============

(() => {
    // ==========
    // Constants.
    // ==========

    const ANIMATION_DELAY = 300;
    const CLICK = 'click';

    const DATA_ACTION = 'data-hw-action';
    const DATA_NUMBER = 'data-hw-number';
    const DATA_VISIBLE = 'data-hw-is-visible';
    const DATA_YEAR = 'data-hw-year-start'

    // ==========
    // Set later.
    // ==========

    let timerForAnimation;

    // =============
    // Get elements.
    // =============

    const buttonReveal = document.querySelector(`[${DATA_ACTION}="reveal"]`);
    const buttonStart = document.querySelector(`[${DATA_ACTION}="start"]`);
    const layoutMain = document.querySelector('.hw-layout__main');
    const wordList = document.querySelectorAll('.hw-word');
    const yearSpan = document.querySelector(`[${DATA_YEAR}]`);

    // ==============
    // Event: reveal.
    // ==============

    const handleClickReveal = () => {
        // Clear timer.
        clearTimeout(timerForAnimation);

        // Loop through.
        wordList.forEach((word) => {
            // Hide.
            word.setAttribute(DATA_VISIBLE, false);

            // Show.
            word.setAttribute(DATA_VISIBLE, true);
        });
    };

    // =============
    // Event: start.
    // =============

    const handleClickStart = () => {
        // Clear timer.
        clearTimeout(timerForAnimation);

        // Scroll.
        layoutMain.scrollTo(0, 0);

        // Loop through.
        wordList.forEach((word) => {
            // Remove number.
            word.removeAttribute(DATA_VISIBLE);
        });

        // Set later.
        let i = 0;

        // Helper: recursion.
        const iterator = () => {
            // Get word.
            const word = wordList[i];

            // Word exists?
            if (word) {
                // Set number.
                word.setAttribute(DATA_VISIBLE, true);

                // Focus.
                word.focus();

            }

            // Keep going?
            if (i++ < wordList.length) {
                // Start timer.
                timerForAnimation = setTimeout(iterator, ANIMATION_DELAY);
            }
        };

        // Begin.
        timerForAnimation = setTimeout(iterator, ANIMATION_DELAY);
    };

    // =======================
    // Helper: insert numbers.
    // =======================

    const insertNumbers = () => {
        // Loop through.
        wordList.forEach((word, i) => {
            // Remove number.
            word.removeAttribute(DATA_NUMBER);

            // Insert number.
            word.setAttribute(DATA_NUMBER, i + 1);
        });
    };

    // ====================
    // Helper: insert year.
    // ====================

    const insertYear = () => {
        // Get current year.
        const yearCurrent = new Date().getFullYear();

        // Get start year.
        let yearStart = yearSpan.getAttribute(DATA_YEAR);
        yearStart = parseFloat(yearStart);

        // Get duration.
        const duration = yearCurrent - yearStart;

        // Set text.
        yearSpan.textContent = duration;
    };

    // ===================
    // Helper: add events.
    // ===================

    const addEvents = () => {
        // Prevent doubles.
        removeEvents();

        // Add events.
        buttonReveal.addEventListener(CLICK, handleClickReveal);
        buttonStart.addEventListener(CLICK, handleClickStart);
    };

    // ======================
    // Helper: remove events.
    // ======================

    const removeEvents = () => {
        // Remove events.
        buttonReveal.removeEventListener(CLICK, handleClickReveal);
        buttonStart.removeEventListener(CLICK, handleClickStart);
    };

    // =================
    // Lifecycle: mount.
    // =================

    const onMount = () => {
        // Insert numbers.
        insertNumbers();

        // Insert year.
        insertYear();

        // Add events.
        addEvents();

        // Start.
        handleClickStart();
    };

    // ========
    // Kickoff.
    // ========

    onMount();
})();

// =============
// END: closure.
// =============
