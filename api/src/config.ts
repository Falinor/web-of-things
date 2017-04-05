export interface Config {
  env: string;
}

export const config: Config = {
  env: process.env.NODE_ENV || 'development',
};
