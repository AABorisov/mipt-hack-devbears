declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export = classes;
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export = classes;
}

declare module '*.sass' {
  const classes: { readonly [key: string]: string };
  export = classes;
}

declare module '*.png' {
  const src: string;
  export default src;
}
