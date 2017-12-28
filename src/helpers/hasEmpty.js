export default function hasEmpty(...values) {
  if (values.length > 1) {
    return values.some(v => hasEmpty(v));
  }

  const value = values[0];
  const type = typeof value;

  switch (type) {
    case 'string':
      return value === '';
    case 'object':
      if (value === null) {
        return true;
      }

      if (value instanceof Array) {
        return value.length === 0;
      }

      return Object.keys(value).length === 0;
    case 'undefined':
      return true;
    default:
      throw new Error(`unsupported type '${type}' passed`);
  }
}
