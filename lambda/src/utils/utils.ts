// not used:
// const getPropsToFilter = (obj: any): string[] => {
//   return Object.keys(obj).filter(key => {
//     if (obj[key]) {
//       return key;
//     }
//   });
// };


// implement generics for these utility functions

// not used:
// const filterByKeys = (obj: any, filter: any[]) => {
//   return filter.reduce((acc, key) => ({
//     ...acc, [key]: obj[key]
//   }), {});

  // return Object.keys(obj)
  //   .filter(key => filter.includes(key))
  //   .reduce((acc, key) => ({
  //     ...acc,
  //     ...{[key]: obj[key]}
  //   }), {});
// };

// not used:
// https://medium.com/front-end-weekly/30-seconds-of-code-rename-many-object-keys-in-javascript-268f279c7bfa
// const renameKeys = (obj: any, keysMapping: Record<string, string>) => {
//   return Object.keys(obj)
//     .reduce((acc, key: string) => ({
//       ...acc,
//       ...{[keysMapping[key] || key]: obj[key]}
//     }), {});
// };

const sortObjectsByKeyNameAscending = <T>(objects: T[], key: keyof T): T[] => {
  return objects.sort((a: T, b: T): number => {
    const valueA = a[key];
    const valueB = b[key];
    let lowercaseA = '';
    let lowercaseB = '';

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      lowercaseA = valueA.toLowerCase();
      lowercaseB = valueB.toLowerCase();
    }

    if (lowercaseA <  lowercaseB) {
      return -1;
    }

    if (lowercaseA >  lowercaseB) {
      return 1;
    }

    return 0;
  });
};

export default {
  // getPropsToFilter,
  // filterByKeys,
  // renameKeys,
  sortObjectsByKeyNameAscending
}
