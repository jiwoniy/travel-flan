export default function albumNormalize(arrayData) {
  if (Array.isArray(arrayData)) {
    const result = {};
    arrayData.forEach((data) => {
      result[data.id] = { userId: data.userId, title: data.title };
    });
    return result;
  }

  return {};
}
