const getObjKey = (col) => {
  const getKey = Object.keys(col[0].amount);
  const key = getKey[0];
  const fund = col[0].amount[key];
  return { key, fund };
}

module.exports = getObjKey;
