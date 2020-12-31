// not used:
// const getPropsToFilter = (obj: any): string[] => {
//   return Object.keys(obj).filter(key => {
//     if (obj[key]) {
//       return key;
//     }
//   });
// };


// implement generics for these utility functions

const filterByKeys = (obj: any, filter: any[]) => {
  return filter.reduce((acc, key) => ({
    ...acc, [key]: obj[key]
  }), {});

  // return Object.keys(obj)
  //   .filter(key => filter.includes(key))
  //   .reduce((acc, key) => ({
  //     ...acc,
  //     ...{[key]: obj[key]}
  //   }), {});
};

// https://medium.com/front-end-weekly/30-seconds-of-code-rename-many-object-keys-in-javascript-268f279c7bfa
const renameKeys = (obj: any, keysMapping: Record<string, string>) => {
  return Object.keys(obj)
    .reduce((acc, key: string) => ({
      ...acc,
      ...{[keysMapping[key] || key]: obj[key]}
    }), {});
};

const sortObjectsByKey = (arrObjs: any[], key: string) => {
  return arrObjs.sort((a, b) => {
    let valueA = a[key].toLowerCase();
    let valueB = b[key].toLowerCase();
    if (valueA < valueB) {
      return -1;
    }

    if (valueA > valueB) {
      return 1;
    }

    return 0;
  });
};

export default {
  // getPropsToFilter,
  filterByKeys,
  renameKeys,
  sortObjectsByKey
}
