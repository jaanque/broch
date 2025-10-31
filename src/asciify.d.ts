
type asciifyCallback = (err: Error, asciified: string | string[]) => void;

interface AsciifyOptions {
  fit: 'box' | 'original' | 'none';
  width?: number;
  height?: number;
  color?: boolean;
}

declare module 'asciify-image' {
  function asciify(
    image: string,
    options: AsciifyOptions,
    callback: asciifyCallback
  ): void;
  export = asciify;
}
