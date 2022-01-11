export const getTree = (arr: any, p = 'parent_id') =>
  arr.reduce((o: any, n: any) => {
    if (!o[n.id]) o[n.id] = {};
    if (!o[n[p]]) o[n[p]] = {};
    if (!o[n[p]].children) o[n[p]].children = [];
    if (o[n.id].children) n.children = o[n.id].children;
    o[n[p]].children.push(n);
    o[n.id] = n;
    return o;
  }, {});
