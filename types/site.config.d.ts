export namespace Site {
  export type Config = {
    html: {
      lang?: string;
      title: string;
      description?: string;
    };
    github: {
      url?: string;
      gist: {
        login: string;
        fileNameFilter?: RegExp | null;
        private: boolean;
      };
    };
  };
}
