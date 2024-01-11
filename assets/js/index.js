// ===============
// Closure: START.
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
    layoutMain.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // Loop through.
    wordList.forEach((word) => {
      // Remove number.
      word.setAttribute(DATA_VISIBLE, false);
    });

    // Set later.
    let wordIndex = 0;

    // =======================
    // Helper: show next word.
    // =======================

    const showNextWord = () => {
      // Get word.
      const word = wordList[wordIndex];

      // Word exists?
      if (word) {
        // Set number.
        word.setAttribute(DATA_VISIBLE, true);

        // Focus.
        word.focus();
      }

      // Keep going?
      if (++wordIndex < wordList.length) {
        // Start timer.
        startTimer();
      }
    };

    // ====================
    // Helper: start timer.
    // ====================

    const startTimer = () => {
      // Clear timer.
      clearTimeout(timerForAnimation);

      // Await frame.
      window.requestAnimationFrame(() => {
        // Start timer.
        timerForAnimation = setTimeout(showNextWord, ANIMATION_DELAY);
      });
    };

    // ============
    // Start timer.
    // ============

    startTimer();
  };

  // =======================
  // Helper: add attributes.
  // =======================

  const addAttributes = () => {
    // Loop through.
    wordList.forEach((word, i) => {
      // Add tabindex.
      word.setAttribute('tabindex', -1);

      // Add number.
      word.setAttribute(DATA_NUMBER, i + 1);
    });
  };

  // =================
  // Helper: add year.
  // =================

  const addYear = () => {
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
    // Add attributes.
    addAttributes();

    // Add year.
    addYear();

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
// Closure: END.
// =============
