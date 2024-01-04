module.exports = {
    // ... other webpack configuration
    resolve: {
      fallback: {
        "http": require.resolve("stream-http")
      }
    }
  };
  