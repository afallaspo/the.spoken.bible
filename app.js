/**
 * Bible App - Core Logic
 * Handles data fetching, state management, and UI updates
 */

const BIBLE_API_BASE = 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/es_rvr.json';

const BOOK_NAMES = {
    "gn": "Génesis", "ex": "Éxodo", "lv": "Levítico", "nm": "Números", "dt": "Deuteronomio",
    "js": "Josué", "jud": "Jueces", "rt": "Rut", "1sm": "1 Samuel", "2sm": "2 Samuel",
    "1kgs": "1 Reyes", "2kgs": "2 Reyes", "1ch": "1 Crónicas", "2ch": "2 Crónicas",
    "ezr": "Esdras", "ne": "Nehemías", "et": "Ester", "job": "Job", "ps": "Salmos",
    "prv": "Proverbios", "ec": "Eclesiastés", "so": "Cantares", "is": "Isaías",
    "jr": "Jeremías", "lm": "Lamentaciones", "ez": "Ezequiel", "dn": "Daniel",
    "ho": "Oseas", "jl": "Joel", "am": "Amós", "ob": "Abdías", "jn": "Jonás",
    "mi": "Miqueas", "na": "Nahúm", "hk": "Habacuc", "zp": "Sofonías", "hg": "Hageo",
    "zc": "Zacarías", "ml": "Malaquías", "mt": "Mateo", "mk": "Marcos", "lk": "Lucas",
    "jo": "Juan", "act": "Hechos", "rm": "Romanos", "1co": "1 Corintios", "2co": "2 Corintios",
    "gl": "Gálatas", "eph": "Efesios", "ph": "Filipenses", "cl": "Colosenses",
    "1ts": "1 Tesalonicenses", "2ts": "2 Tesalonicenses", "1tm": "1 Timoteo",
    "2tm": "2 Timoteo", "tt": "Tito", "phm": "Filemón", "hb": "Hebreos", "jm": "Santiago",
    "1pe": "1 Pedro", "2pe": "2 Pedro", "1jo": "1 Juan", "2jo": "2 Juan", "3jo": "3 Juan",
    "jd": "Judas", "re": "Apocalipsis"
};

function getBookName(book) {
    return BOOK_NAMES[book.abbrev] || book.name || book.abbrev;
}

// Application State
const state = {
    bibleData: null,
    currentBook: null,
    currentChapter: 1,
    searchResults: [],
    theme: localStorage.getItem('theme') || 'light',
    isSidebarOpen: false,
    isSidebarPinned: localStorage.getItem('sidebarPinned') === 'true',
    navView: 'books', // 'books', 'chapters', 'verses'
    navSelectedBook: null,
    navSelectedChapter: null
};

// DOM Elements
const elements = {
    booksList: document.getElementById('books-list'),
    versesContainer: document.getElementById('verses-container'),
    chapterTitle: document.getElementById('chapter-title'),
    breadcrumb: document.getElementById('bread-crumb'),
    readerContainer: document.getElementById('reader-container'),
    initialState: document.getElementById('initial-state'),
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    menuToggle: document.getElementById('menu-toggle'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebar-overlay'),
    closeSidebar: document.getElementById('close-sidebar'),
    pinSidebar: document.getElementById('pin-sidebar'),
    mainContent: document.getElementById('main-content'),
    globalSearch: document.getElementById('global-search'),
    searchMobileTrigger: document.getElementById('search-mobile-trigger'),
    searchModal: document.getElementById('search-modal'),
    modalSearchInput: document.getElementById('modal-search-input'),
    searchResultsContainer: document.getElementById('search-results'),
    closeSearch: document.getElementById('close-search')
};

// --- Initialization ---

async function init() {
    setupTheme();
    setupEventListeners();
    setupPinState();
    await fetchBibleData();
    renderBooks();

    // Check for deep links or restore last view
    const lastBook = localStorage.getItem('lastBook');
    const lastChapter = parseInt(localStorage.getItem('lastChapter'));

    if (lastBook) {
        navigateTo(lastBook, lastChapter || 1);
    }
}

// --- Data Fetching ---

async function fetchBibleData() {
    try {
        const response = await fetch(BIBLE_API_BASE);
        state.bibleData = await response.json();
        console.log('Bible data loaded:', state.bibleData.length, 'books');
    } catch (error) {
        console.error('Error loading Bible data:', error);
        elements.booksList.innerHTML = '<p class="p-4 text-red-500 text-sm">Error al cargar datos. Reintente más tarde.</p>';
    }
}

// --- Navigation & Rendering ---

function renderBooks() {
    if (!state.bibleData) return;

    if (state.navView === 'books') {
        elements.booksList.innerHTML = state.bibleData.map((book, index) => {
            const name = getBookName(book);
            return `
                <button class="book-item w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${state.currentBook === book.abbrev ? 'active' : ''}" 
                        onclick="navSelectBook('${book.abbrev}')">
                    <span class="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-400">
                        ${index + 1}
                    </span>
                    ${name}
                </button>
            `;
        }).join('');
    } else if (state.navView === 'chapters') {
        const book = state.bibleData.find(b => b.abbrev === state.navSelectedBook);
        if (!book) return;

        const bookName = getBookName(book);
        let html = `
            <div class="px-2 pb-4 border-b border-gray-100 dark:border-gray-900 mb-4">
                <button onclick="navGoBack()" class="flex items-center gap-2 text-sm text-gray-500 hover:text-gemini-accent transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Volver a Libros
                </button>
                <div class="mt-2 font-semibold text-lg">${bookName}</div>
                <div class="text-xs text-gray-500">Selecciona un capítulo</div>
            </div>
            <div class="grid grid-cols-5 gap-2 px-2">
        `;

        book.chapters.forEach((_, index) => {
            const isActive = (state.currentBook === state.navSelectedBook && state.currentChapter === (index + 1)) ? 'active' : '';
            html += `
                <button class="nav-grid-item ${isActive} aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all hover:bg-gemini-accent hover:text-white dark:hover:bg-gemini-accent dark:hover:text-white"
                        onclick="navSelectChapter(${index + 1})">
                    ${index + 1}
                </button>
            `;
        });

        html += `</div>`;
        elements.booksList.innerHTML = html;

    } else if (state.navView === 'verses') {
        const book = state.bibleData.find(b => b.abbrev === state.navSelectedBook);
        if (!book) return;

        const chapter = book.chapters[state.navSelectedChapter - 1];
        if (!chapter) return;

        const bookName = getBookName(book);
        let html = `
            <div class="px-2 pb-4 border-b border-gray-100 dark:border-gray-900 mb-4">
                <button onclick="navGoBack()" class="flex items-center gap-2 text-sm text-gray-500 hover:text-gemini-accent transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Volver a Capítulos
                </button>
                <div class="mt-2 font-semibold text-lg">${bookName} ${state.navSelectedChapter}</div>
                <div class="text-xs text-gray-500">Selecciona un versículo</div>
            </div>
            <div class="grid grid-cols-5 gap-2 px-2">
        `;

        chapter.forEach((_, index) => {
            html += `
                <button class="nav-grid-item aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all hover:bg-gemini-accent hover:text-white dark:hover:bg-gemini-accent dark:hover:text-white"
                        onclick="navSelectVerse(${index + 1})">
                    ${index + 1}
                </button>
            `;
        });

        html += `</div>`;
        elements.booksList.innerHTML = html;
    }

    // Scroll active element into view
    setTimeout(() => {
        const activeEl = elements.booksList.querySelector('.active');
        if (activeEl) {
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 50);
}

function navSelectBook(abbrev) {
    state.navSelectedBook = abbrev;
    state.navView = 'chapters';
    renderBooks();
}

function navSelectChapter(chapterNum) {
    state.navSelectedChapter = chapterNum;
    state.navView = 'verses';
    renderBooks();
}

function navSelectVerse(verseNum) {
    navigateTo(state.navSelectedBook, state.navSelectedChapter, verseNum);
}

function navGoBack() {
    if (state.navView === 'verses') {
        state.navView = 'chapters';
    } else if (state.navView === 'chapters') {
        state.navView = 'books';
    }
    renderBooks();
}

function navigateTo(abbrev, chapterNum, verseNum = null) {
    const book = state.bibleData.find(b => b.abbrev === abbrev);
    if (!book) return;

    state.currentBook = abbrev;
    state.currentChapter = chapterNum;

    if (state.isSidebarPinned) {
        state.navView = verseNum ? 'verses' : 'chapters';
        state.navSelectedBook = abbrev;
        state.navSelectedChapter = chapterNum;
    } else {
        // Reset sidebar view logically (so it opens to books next time)
        state.navView = 'books';
        state.navSelectedBook = null;
        state.navSelectedChapter = null;
    }

    // Save to local storage
    localStorage.setItem('lastBook', abbrev);
    localStorage.setItem('lastChapter', chapterNum);

    renderChapter(book, chapterNum);
    renderBooks();
    closeSidebar();

    // Hide initial state
    elements.initialState.classList.add('hidden');
    elements.readerContainer.classList.remove('opacity-0', 'translate-y-4');

    if (verseNum) {
        // Scroll to specific verse
        setTimeout(() => {
            const verseEl = document.getElementById(`verse-${verseNum}`);
            if (verseEl) {
                const yOffset = -80; // Account for fixed header
                const y = verseEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });

                // Add highlight effect
                verseEl.classList.add('verse-highlight');
                setTimeout(() => {
                    verseEl.classList.remove('verse-highlight');
                }, 2500);
            }
        }, 100); // small delay to ensure DOM is updated
    } else {
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function renderChapter(book, chapterNum) {
    const chapterIndex = chapterNum - 1;
    const chapters = book.chapters;

    if (!chapters[chapterIndex]) return;

    const verses = chapters[chapterIndex];

    const bookName = getBookName(book);
    elements.breadcrumb.textContent = `${bookName} • Capítulo ${chapterNum}`;
    elements.chapterTitle.textContent = `${bookName} ${chapterNum}`;

    elements.versesContainer.innerHTML = verses.map((verse, index) => `
        <div id="verse-${index + 1}" class="verse-block group">
            <span class="verse-num">${index + 1}</span>
            <span class="verse-text">${verse}</span>
        </div>
    `).join('');

    // Add navigation buttons at the bottom
    renderChapterNav(book, chapterNum);
}

function renderChapterNav(book, chapterNum) {
    const totalChapters = book.chapters.length;
    let navHtml = '<div class="flex justify-between items-center pt-16 pb-12 border-t dark:border-gray-800 mt-12">';

    if (chapterNum > 1) {
        navHtml += `
            <button onclick="navigateTo('${book.abbrev}', ${chapterNum - 1})" class="flex items-center gap-2 text-sm text-gray-500 hover:text-gemini-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Anterior
            </button>
        `;
    } else {
        navHtml += '<div></div>';
    }

    // Chapter indicator/selector (Simplified for now)
    navHtml += `<span class="text-xs font-semibold text-gray-400">${chapterNum} / ${totalChapters}</span>`;

    if (chapterNum < totalChapters) {
        navHtml += `
            <button onclick="navigateTo('${book.abbrev}', ${chapterNum + 1})" class="flex items-center gap-2 text-sm text-gray-500 hover:text-gemini-accent transition-colors text-right">
                Siguiente
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
        `;
    } else {
        navHtml += '<div></div>';
    }

    navHtml += '</div>';
    elements.versesContainer.insertAdjacentHTML('beforeend', navHtml);
}

// --- Search Logic ---

function performSearch(query) {
    if (!query || query.length < 3) return;

    const results = [];
    const lowerQuery = query.toLowerCase();

    // Basic search across all books
    state.bibleData.forEach(book => {
        book.chapters.forEach((chapter, cIndex) => {
            chapter.forEach((verse, vIndex) => {
                if (verse.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        book: getBookName(book),
                        abbrev: book.abbrev,
                        chapter: cIndex + 1,
                        verseNum: vIndex + 1,
                        text: verse
                    });
                }
            });
        });
    });

    renderSearchResults(results, query);
}

function renderSearchResults(results, query) {
    elements.searchResultsContainer.innerHTML = `
        <div class="mb-4 text-sm text-gray-500">
            ${results.length} resultados para "${query}"
        </div>
        ${results.map(res => `
            <div class="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 cursor-pointer hover:border-gemini-accent transition-all"
                 onclick="closeSearchModal(); navigateTo('${res.abbrev}', ${res.chapter})">
                <div class="text-xs font-bold text-gemini-accent mb-1 uppercase tracking-wider">
                    ${res.book} ${res.chapter}:${res.verseNum}
                </div>
                <div class="text-sm leading-relaxed">
                    ${highlightText(res.text, query)}
                </div>
            </div>
        `).join('')}
    `;

    if (results.length === 0) {
        elements.searchResultsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center pt-20 text-center">
                <p class="text-gray-500">No se encontraron resultados para "${query}"</p>
            </div>
        `;
    }
}

function highlightText(text, query) {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map(part =>
        part.toLowerCase() === query.toLowerCase()
            ? `<mark class="bg-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-200 rounded px-1">${part}</mark>`
            : part
    ).join('');
}

// --- UI Utilities ---

function setupTheme() {
    if (state.theme === 'dark' || (!state.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        state.theme = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        state.theme = 'light';
    }
    updateThemeIcon();
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    setupTheme();
}

function updateThemeIcon() {
    elements.themeIcon.innerHTML = state.theme === 'light'
        ? '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>'
        : '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>';
}

function setupPinState() {
    if (state.isSidebarPinned && window.innerWidth >= 768) {
        elements.pinSidebar.classList.add('pinned');
        elements.sidebar.classList.remove('-translate-x-full');
        elements.mainContent.classList.add('sidebar-pinned-margin');
        state.isSidebarOpen = true;
    }
}

function togglePinSidebar() {
    state.isSidebarPinned = !state.isSidebarPinned;
    localStorage.setItem('sidebarPinned', state.isSidebarPinned);

    if (state.isSidebarPinned) {
        elements.pinSidebar.classList.add('pinned');
        elements.mainContent.classList.add('sidebar-pinned-margin');
        elements.sidebarOverlay.classList.add('hidden');
        if (!state.isSidebarOpen) {
            state.isSidebarOpen = true;
            elements.sidebar.classList.remove('-translate-x-full');
        }
    } else {
        elements.pinSidebar.classList.remove('pinned');
        elements.mainContent.classList.remove('sidebar-pinned-margin');
        if (state.isSidebarOpen) {
            elements.sidebarOverlay.classList.remove('hidden');
        }
    }
}

function toggleSidebar() {
    if (state.isSidebarPinned && window.innerWidth >= 768) {
        togglePinSidebar();
        return;
    }

    state.isSidebarOpen = !state.isSidebarOpen;
    if (state.isSidebarOpen) {
        elements.sidebar.classList.remove('-translate-x-full');
        if (!state.isSidebarPinned || window.innerWidth < 768) {
            elements.sidebarOverlay.classList.remove('hidden');
        }
    } else {
        closeSidebar();
    }
}

function closeSidebar() {
    if (state.isSidebarPinned && window.innerWidth >= 768) return;

    state.isSidebarOpen = false;
    elements.sidebar.classList.add('-translate-x-full');
    elements.sidebarOverlay.classList.add('hidden');
}

function openSearchModal() {
    elements.searchModal.classList.remove('hidden');
    elements.modalSearchInput.focus();
}

function closeSearchModal() {
    elements.searchModal.classList.add('hidden');
}

// --- Event Listeners ---

function setupEventListeners() {
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.menuToggle.addEventListener('click', toggleSidebar);
    elements.sidebarOverlay.addEventListener('click', closeSidebar);
    elements.closeSidebar.addEventListener('click', closeSidebar);
    if (elements.pinSidebar) {
        elements.pinSidebar.addEventListener('click', togglePinSidebar);
    }

    // Search related
    elements.globalSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            openSearchModal();
            elements.modalSearchInput.value = e.target.value;
            performSearch(e.target.value);
        }
    });

    elements.searchMobileTrigger.addEventListener('click', openSearchModal);
    elements.closeSearch.addEventListener('click', closeSearchModal);

    elements.modalSearchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length >= 3) {
            performSearch(query);
        }
    });
}

// Global expose for onclick handlers
window.navigateTo = navigateTo;
window.closeSearchModal = closeSearchModal;
window.navSelectBook = navSelectBook;
window.navSelectChapter = navSelectChapter;
window.navSelectVerse = navSelectVerse;
window.navGoBack = navGoBack;

// Run it
document.addEventListener('DOMContentLoaded', init);
