module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    const node = {
      ...(config.node || {}),
      fs: 'empty'
    }

    return {
      ...config,
      node
    }
  }
}
