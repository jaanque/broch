
type asciifyCallback = (err: Error, asciified: string | string[]) => void;

declare module 'asciify-image' {
  function asciify(
    image: string,
    options: { fit: string; width: number },
    callback: asciifyCallback
  ): void;
  export = asciify;
}
