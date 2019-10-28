const parseURLquery = (searchStr) => {
  const array = searchStr
    .replace(/^\?/, '')
    .split('=')
    .join('&')
    .split('&');
  if (array.length === 1) return {};
  if (array.length < 2 && array.length % 2) return { error: 'unexpected format' };
  let obj = {};
  for (let i = 0; i < array.length; i += 2) {
    obj = { ...obj, [array[i]]: array[i + 1] };
  }
  return obj;
};
export default parseURLquery;
