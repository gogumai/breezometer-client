export default () => new Promise((resolve, reject) => {
  setTimeout(() => resolve({ location: 'Montevideo', aq: Math.floor((Math.random() * 10) + 1) }), 1000);
});
