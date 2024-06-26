export const getFilePathSrc = (url) => {
  const regex = /<img src\s*=\s*["']([^"']+)["']/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
export const getFilePathSrcList = (urls) => {
  if (!Array.isArray(urls) || urls.length === 0) {
    return [];
  }

  const regex = /<img src\s*=\s*["']([^"']+)["']/;
  return urls.map((obj) => {
    if (obj && typeof obj.display_value === 'string') {
      const match = obj.display_value.match(regex);
      return { src: match ? match[1] : null };
    }
    return { src: null };
  });
};

export const fetchJsonConfig = async () => {
  const url =
    'https://raw.githubusercontent.com/vjbautista8/MINIMALISTIC_ZOHO_CREATOR_WIDGET_TEMPLATE/main/react_app/jsconfig.json';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching the JSON:', error);
    return null;
  }
};
export const getFirstNElements = (length, list) => list.slice(0, Math.min(length, list.length));
export const addConcatenatedKey = (list, keyList, newKey) =>
  list.map((obj) => ({
    ...obj,
    [newKey]: keyList
      .map((key) => (obj[key] !== null && obj[key] !== undefined ? obj[key] : ''))
      .join(' | '),
  }));

export const paginate = (list, page) => {
  const itemsPerPage = 20;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, list.length);
  return { paginateData: list.slice(startIndex, endIndex), allData: list };
};

export const toWholeNumber = (num) => Math.ceil(num);

export const sortByKey = (list, key, order = 'asc') =>
  [...list].sort((a, b) => {
    let valueA = a[key];
    let valueB = b[key];

    // Handle null or empty values
    if (valueA === null || valueA === undefined || valueA === '') {
      valueA = key === 'Image_Count' || key === 'Days_In_Stock' ? 0 : '';
    }
    if (valueB === null || valueB === undefined || valueB === '') {
      valueB = key === 'Image_Count' || key === 'Days_In_Stock' ? 0 : '';
    }

    // Convert specific keys to numbers
    if (key === 'Image_Count' || key === 'Days_In_Stock') {
      valueA = Number(valueA);
      valueB = Number(valueB);
    } else if (typeof valueA === 'string' && typeof valueB === 'string') {
      // Check if the strings can be converted to dates
      const dateA = Date.parse(valueA);
      const dateB = Date.parse(valueB);
      if (!Number.isNaN(dateA) && !Number.isNaN(dateB)) {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      } else {
        // Convert numeric strings to numbers for proper comparison
        const numA = parseFloat(valueA);
        const numB = parseFloat(valueB);
        if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
          valueA = numA;
          valueB = numB;
        }
      }
    }

    // Handle non-numeric, non-date strings for alphabetical sorting
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }

    // Compare based on the type of values
    if (valueA < valueB) {
      return order === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

export const sortByDateTimeKey = (list, key, order = 'asc') =>
  list.sort((a, b) => {
    const dateA = new Date(a[key]);
    const dateB = new Date(b[key]);

    if (dateA < dateB) {
      return order === 'asc' ? -1 : 1;
    }
    if (dateA > dateB) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

export const getDistinctValuesByKey = (list, key) => {
  const values = list.map((item) => {
    const value = item[key];
    return value === null || value === '' ? '-empty-' : value;
  });

  const distinctValues = [...new Set(values)];

  // Sort the distinct values
  distinctValues.sort((a, b) => {
    // Handle special case for '-empty-' to always be at the end
    if (a === '-empty-') return 1;
    if (b === '-empty-') return -1;

    // Default alphabetical or numerical sorting
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  return distinctValues;
};

export const getSortedValuesByKey = (list, key) => {
  if (!Array.isArray(list)) {
    if (list === null || list === '') {
      return '';
    }
    throw new Error('First parameter must be an array, null, or an empty string');
  }

  const values = list.map((item) => item[key]);

  // Sort the values
  values.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  // Join the values with separator '|'
  return values.join('-');
};

export const getObjectByLabel = (list, label) => list.find((item) => item.label === label);
export const getValueByLabel = (list, searchLabel) => {
  const foundItem = list.find(({ label }) => label === searchLabel);
  return foundItem ? foundItem.value : null;
};
export const getLabelByValue = (list, searchValue) => {
  const foundItem = list.find(({ value }) => value === searchValue);
  return foundItem ? foundItem.label : null;
};

export const updateObjectById = (list, id, updates) =>
  list.map((item) => (item.ID === id ? { ...item, ...updates } : item));
