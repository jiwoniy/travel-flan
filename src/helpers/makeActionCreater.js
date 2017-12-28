export default function makeActionCreator(type, ...argNames) {
  return function actionCreator(...args) {
    const payload = {};
    argNames.forEach((arg, index) => {
      payload[arg] = args[index];
    });
    return { type, payload };
  };
}
