export const points = [
  { id: 1, angle: 0, active: false, name: 'Спорт'},
  { id: 2, angle: 60, active: false, name: 'Экономика' },
  { id: 3, angle: 120, active: false, name: 'Литература' },
  { id: 4, angle: 180, active: false, name: 'Медицина' },
  { id: 5, angle: 240, active: false, name: 'Кино' },
  { id: 6, angle: 300, active: true, name: 'Наука' },
];

export const notes = {
  'Спорт': sportNotes,
  'Кино': cinemaNotes,
  'Литература': literatureNotes,
  'Медицина': medicineNotes,
  'Наука': scienceNotes,
  'Экономика': economyNotes,
};