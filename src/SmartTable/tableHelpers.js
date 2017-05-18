const sortFunc = (a, b, key) => {
  if (typeof (a[key]) === 'number') {
    return a[key] - b[key];
  }

  const ax = [];
  const bx = [];

  a[key].replace(/(\d+)|(\D+)/g, (_, $1, $2) => { ax.push([$1 || Infinity, $2 || '']); });
  b[key].replace(/(\d+)|(\D+)/g, (_, $1, $2) => { bx.push([$1 || Infinity, $2 || '']); });

  while (ax.length && bx.length) {
    const an = ax.shift();
    const bn = bx.shift();
    const nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }

  return ax.length - bx.length;
}

//converts object  { a: 55, b: 55, c: { d: 55 } } to { a: 55, b: 55, d: 55 }
const processTableData = (data) => {
  if (data.constructor === Array) {
    return data.map(obj => {
      const newObj = {};

      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
          Object.keys(obj[key]).forEach(subKey => {
            newObj[subKey] = obj[key][subKey];
          });
        } else {
          newObj[key] = obj[key];
        }
      });

      return newObj;
    });
  }
  return [];
}

export { sortFunc, processTableData }