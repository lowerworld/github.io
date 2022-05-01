export namespace Site {
  export type Config = {
    html: {
      lang?: string;
      title: string;
      description?: string;
    };
    github: {
      url?: string;
    };
  };
}
