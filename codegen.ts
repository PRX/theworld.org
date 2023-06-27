import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://the-world-wp.lndo.site/graphql',
  generates: {
    'interfaces/api/generated.ts': {
      plugins: ['typescript']
    }
  }
};

export default config;
