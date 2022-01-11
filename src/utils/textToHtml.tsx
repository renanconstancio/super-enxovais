export const textToHtml = (html: string) => {
  let arr = html.split(/<br\s*\/?>|<p\/?>|<?\/p>/i);
  return arr.reduce((el: any, a: any, i: any): any => el.concat(a, <br key={i} />), []);
};
