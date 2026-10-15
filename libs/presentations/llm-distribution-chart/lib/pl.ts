export default {
  moduleType: 'locale',
  name: 'pl',
  dictionary: {
    Autoscale: 'Skala automatyczna',
    'Compare data on hover': 'Porównaj dane po najechaniu myszą', // components/modebar/buttons.js:167
    'Double-click on legend to isolate one trace':
      'Kliknij dwukrotnie na legendzie aby wyświetlić dane pojedynczo', // components/legend/handle_click.js:90
    'Double-click to zoom back out': 'Kliknij dwukrotnie aby oddalić się', // plots/cartesian/dragbox.js:299
    Pan: 'Przesunięcie', // components/modebar/buttons.js:94
    'Produced with Plotly.js': 'Stworzone w Plotly.js', // components/modebar/modebar.js:256
    Reset: 'Reset', // components/modebar/buttons.js:432
    'Reset axes': 'Zresetuj osie', // components/modebar/buttons.js:148
    'Reset view': 'Zresetuj widok', // components/modebar/buttons.js:583
    'Reset views': 'Zresetuj widoki', // components/modebar/buttons.js:529
    'Show closest data on hover': 'Pokaż najbliższe dane po najechaniu myszą', // components/modebar/buttons.js:157
    Zoom: 'Powiększanie', // components/modebar/buttons.js:85
    'Zoom in': 'Powiększ', // components/modebar/buttons.js:121
    'Zoom out': 'Pomniejsz', // components/modebar/buttons.js:130
    trace: 'dane', // plots/plots.js:439
    'Toggle show closest data on hover':
      'Włącz/wyłącz pokazywanie najbliższych danych po najechaniu myszą', // components/modebar/buttons.js:353
  },
  format: {
    days: [
      'Niedziela',
      'Poniedziałek',
      'Wtorek',
      'Środa',
      'Czwartek',
      'Piątek',
      'Sobota',
    ],
    shortDays: ['Nie', 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'So'],
    months: [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecień',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Październik',
      'Listopad',
      'Grudzień',
    ],
    shortMonths: [
      'Sty',
      'Lu',
      'Mar',
      'Kw',
      'Maj',
      'Cze',
      'Lip',
      'Sie',
      'Wrz',
      'Pa',
      'Lis',
      'Gru',
    ],
    date: '%d.%m.%Y',
  },
};
