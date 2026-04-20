// ─── STADIUMSENSE · CENTRAL VENUE DATA ───────────────────────────────────────

export const VENUE = {
  name: 'Wankhede Stadium',
  city: 'Mumbai',
  capacity: 33108,
  currentAttendees: 28420,
  match: {
    title: 'IPL 2025 · Match 42',
    team1: { name: 'MI', full: 'Mumbai Indians', score: '186/4', overs: '18.2', color: '#005EB8' },
    team2: { name: 'CSK', full: 'Chennai Super Kings', score: '142/6', overs: '16.0', color: '#FDB913' },
    status: 'LIVE',
    inning: 2,
    halftimeIn: 18,
  }
};

export const ZONES = [
  { id: 'north',  name: 'North Stand',   gate: '1, 2',  crowd: 92, capacity: 8200,  wait: 14, x:28, y:2,  w:44, h:20, recommended: false },
  { id: 'south',  name: 'South Stand',   gate: '3',     crowd: 64, capacity: 7800,  wait: 5,  x:28, y:78, w:44, h:20, recommended: false },
  { id: 'east',   name: 'East Block',    gate: '4, 5',  crowd: 38, capacity: 6500,  wait: 2,  x:78, y:24, w:20, h:52, recommended: true  },
  { id: 'west',   name: 'West VIP',      gate: '6',     crowd: 51, capacity: 5200,  wait: 4,  x:2,  y:24, w:20, h:52, recommended: false },
  { id: 'upper',  name: 'Upper Tier',    gate: '2, 4',  crowd: 77, capacity: 5408,  wait: 8,  x:0,  y:0,  w:0,  h:0,  recommended: false },
];

export const FACILITIES = {
  food: [
    { id: 'fc1', name: 'Food Court 1',   location: 'Near Gate 2', wait: 16, capacity: 88, open: true,  section: 'North' },
    { id: 'fc2', name: 'Food Court 2',   location: 'Near Gate 5', wait: 3,  capacity: 28, open: true,  section: 'East'  },
    { id: 'sb1', name: 'Snack Bar A',    location: 'West Block',  wait: 9,  capacity: 62, open: true,  section: 'West'  },
    { id: 'sb2', name: 'Snack Bar B',    location: 'South Exit',  wait: 11, capacity: 71, open: true,  section: 'South' },
    { id: 'kf1', name: 'KFC Outlet',     location: 'Gate 3 Mall', wait: 7,  capacity: 55, open: true,  section: 'South' },
    { id: 'dm1', name: "Domino's Kiosk", location: 'Gate 5 Plaza',wait: 4,  capacity: 35, open: true,  section: 'East'  },
  ],
  restrooms: [
    { id: 'rA', name: 'Block A Washroom', location: 'North Stand Row 1', wait: 9,  capacity: 80, open: true  },
    { id: 'rC', name: 'Block C Washroom', location: 'East Block Row 3',  wait: 1,  capacity: 15, open: true  },
    { id: 'rE', name: 'Block E Washroom', location: 'West VIP Level 2',  wait: 6,  capacity: 58, open: true  },
    { id: 'rG', name: 'Block G Washroom', location: 'South Stand Row 2', wait: 4,  capacity: 42, open: true  },
  ],
  parking: [
    { id: 'p1', name: 'Parking P1', slots: 0,   total: 400, distance: '2 min walk',  status: 'FULL'      },
    { id: 'p2', name: 'Parking P2', slots: 120, total: 600, distance: '8 min walk',  status: 'AVAILABLE' },
    { id: 'p3', name: 'Parking P3', slots: 340, total: 500, distance: '15 min walk', status: 'AVAILABLE' },
    { id: 'ps', name: 'Shuttle Bus', slots: 999, total: 999,distance: '20 min ride', status: 'RUNNING'   },
  ],
  merchandise: [
    { id: 'm1', name: 'Official Store',  location: 'Gate 1 Level 1', wait: 12, capacity: 74, open: true  },
    { id: 'm2', name: 'MI Fan Zone',     location: 'Gate 2 Plaza',   wait: 8,  capacity: 61, open: true  },
    { id: 'm3', name: 'Pop-up Stand',    location: 'Gate 5 Exit',    wait: 3,  capacity: 30, open: true  },
  ],
};

export const CROWD_HISTORY = [
  { time: '15:00', crowd: 18, entry: 420  },
  { time: '16:00', crowd: 34, entry: 1820 },
  { time: '17:00', crowd: 52, entry: 3200 },
  { time: '17:30', crowd: 68, entry: 4100 },
  { time: '18:00', crowd: 79, entry: 3800 },
  { time: '18:30', crowd: 88, entry: 2200 },
  { time: '19:00', crowd: 86, entry: 800  },
  { time: '19:30', crowd: 82, entry: 310  },
  { time: '20:00', crowd: 80, entry: 140  },
];

export const HALFTIME_FORECAST = [
  { label: '-15m', food: 6,  restroom: 3  },
  { label: '-10m', food: 8,  restroom: 4  },
  { label: '-5m',  food: 12, restroom: 6  },
  { label: 'HT',   food: 24, restroom: 14 },
  { label: '+5m',  food: 20, restroom: 11 },
  { label: '+10m', food: 13, restroom: 7  },
  { label: '+15m', food: 8,  restroom: 4  },
];

export const FOOD_MENU = [
  { id: 1, name: 'Vada Pav',        price: 60,  emoji: '🍔', category: 'Snacks',  popular: true  },
  { id: 2, name: 'Pav Bhaji',       price: 120, emoji: '🍲', category: 'Meals',   popular: true  },
  { id: 3, name: 'Cold Coffee',     price: 80,  emoji: '☕', category: 'Drinks',  popular: false },
  { id: 4, name: 'Pepsi 500ml',     price: 60,  emoji: '🥤', category: 'Drinks',  popular: true  },
  { id: 5, name: 'Popcorn (Large)', price: 150, emoji: '🍿', category: 'Snacks',  popular: true  },
  { id: 6, name: 'Chicken Burger',  price: 220, emoji: '🍗', category: 'Meals',   popular: false },
  { id: 7, name: 'Masala Chips',    price: 90,  emoji: '🥔', category: 'Snacks',  popular: false },
  { id: 8, name: 'Water 1L',        price: 30,  emoji: '💧', category: 'Drinks',  popular: false },
  { id: 9, name: 'Ice Cream',       price: 100, emoji: '🍦', category: 'Dessert', popular: true  },
  { id:10, name: 'Nachos',          price: 130, emoji: '🌮', category: 'Snacks',  popular: false },
];

export const SEAT_SECTIONS = [
  { section: 'A1-A20',  zone: 'North Stand', gate: '1', row: 'A', color: '#ff4444' },
  { section: 'B1-B25',  zone: 'North Stand', gate: '2', row: 'B', color: '#ff6b6b' },
  { section: 'C1-C30',  zone: 'East Block',  gate: '4', row: 'C', color: '#00e676' },
  { section: 'D1-D30',  zone: 'East Block',  gate: '5', row: 'D', color: '#00c853' },
  { section: 'E1-E20',  zone: 'South Stand', gate: '3', row: 'E', color: '#ffd600' },
  { section: 'F1-F15',  zone: 'West VIP',    gate: '6', row: 'F', color: '#a259ff' },
];
