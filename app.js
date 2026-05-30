const cosmetics = {
    outfits: ['Typical Gamer', 'Peely', 'Drift', 'Raven', 'Midas', 'Fishstick'],

    FavoriteOutfits: [
        'Paradigm (REALITY-659)',
        'Mina Park',
        'Breezabelle',
        'Bullseye',
        'UnderWorldDesDemona',
        'Arctic Adeline',
        'Selene',
        'Renegade Lynx',
        'Evie',
        'IMani',
        'Harlowe',
        'Helsie',
        'Kiara K.O.',
        'Mariposa',
        'Piper Pace',
        'Mae',
        'Haven',
        'Aura',
        'Wonder Onesie',
        'Birdie',
        'Malibu',
        'Arcane Jinx',
        'Iconic Kim Kardashian',
        'Ruby',
        'Carina',
        'Princess Lexa',
        'The Imagined',
        'Cat Holloway',
        'The Bride',
        'Yuki Yubari',
        'Focus',
        'Heartseeker Aphrodite',
        'Morgan Myst',
        'Lightrider',
        'SynthWave',
        'Chaos Double Agent',
        'Double Agent WildCard',
        'Double Agent Hush',
        'Siren',
        'Vanguard Zadie',
        'Apprentice Evie',
        'Karuta Harley Quinn',
        'Keisha Cross',
        'Valentina',
        'Joss',
        'Cassidy Quinn',
        'Yulejacket',
        'Explorer Emilie',
        'Felina',
        'Spectra Knight',
        'Prince Orin',
        'Rian',
        'Geralt Of Rivia',
        'Dusty',
        'The Ageless',
        'Lennox Rose',
        'Tectonic Komplex',
        'Prowler',
        'Erisa',
        'Krisabelle',
        'Splatterella',
        'Joy',
    ],

    backblings: ['Goldilocks', 'Dark Wings', 'Skelly Satchel'],

    pickaxes: ['Star Wand', 'Ice Breaker', 'Driver'],

    gliders: ['Mako', 'Palm Leaf', 'One Shot']
};

/* =========================
   THEMES
========================= */

const themes = [
    'theme-dark',
    'theme-light',
    'theme-fortnite',
    'theme-galaxy',
    'theme-neon'
];

let currentTheme = 0;

/* =========================
   RANDOMIZER
========================= */

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function reroll(cat, id) {
    if (!cosmetics[cat]) return;

    document.getElementById(id).textContent = random(cosmetics[cat]);
}

function generateLoadout() {
    reroll('FavoriteOutfits', 'favoriteOutfit');
    reroll('outfits', 'outfit');
    reroll('backblings', 'backbling');
    reroll('pickaxes', 'pickaxe');
    reroll('gliders', 'glider');
}

/* =========================
   SAVE LOADOUTS
========================= */

function saveLoadout() {

    const loadout = [
        document.getElementById('favoriteOutfit').textContent,
        document.getElementById('outfit').textContent,
        document.getElementById('backbling').textContent,
        document.getElementById('pickaxe').textContent,
        document.getElementById('glider').textContent
    ].join(' | ');

    const li = document.createElement('li');
    li.textContent = loadout;

    document.getElementById('favorites').appendChild(li);

    localStorage.setItem(
        'favorites',
        document.getElementById('favorites').innerHTML
    );
}

/* =========================
   THEME SWITCHER
========================= */

function changeTheme() {

    document.body.classList.remove(...themes);

    currentTheme = (currentTheme + 1) % themes.length;

    const newTheme = themes[currentTheme];

    document.body.classList.add(newTheme);

    localStorage.setItem('theme', newTheme);
}

/* =========================
   SEARCH
========================= */

function searchCosmetics() {

    const query = document.getElementById('search')
        .value
        .toLowerCase()
        .trim();

    if (!query) return;

    const allItems = [
        ...cosmetics.outfits,
        ...cosmetics.FavoriteOutfits,
        ...cosmetics.backblings,
        ...cosmetics.pickaxes,
        ...cosmetics.gliders
    ];

    const results = allItems.filter(item =>
        item.toLowerCase().includes(query)
    );

    alert(
        results.length
            ? "Found Cosmetics:\n\n" + results.join("\n")
            : "No cosmetics found."
    );
}

/* =========================
   PAGE LOAD
========================= */

window.onload = () => {

    document.getElementById('favorites').innerHTML =
        localStorage.getItem('favorites') || '';

    const savedTheme = localStorage.getItem('theme') || 'theme-dark';

    document.body.classList.remove(...themes);
    document.body.classList.add(savedTheme);

    currentTheme = themes.indexOf(savedTheme);
    if (currentTheme < 0) currentTheme = 0;

    generateLoadout();

    document.getElementById('search').addEventListener('keydown', e => {
        if (e.key === 'Enter') searchCosmetics();
    });
};