declare namespace NodeJS {
  interface ProcessEnv {
    readonly TOKEN: string;
    readonly CHANNEL_ID: string;
  }
}
