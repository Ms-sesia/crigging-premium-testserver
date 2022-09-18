module.exports = {
  apps: [
    {
      name: "criggingPre-api",
      script: "./build/server.js",
      instance: 4,
      exec_mode: "cluster",
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "criggingPre-prismaDB",
      script: "npm run studio",
      exec_mode: "fork",
      watch: false,
    },
  ],
};
