module.exports = {
  apps: [
    {
      name: "criggingPre-api",
      script: "./build/server.js",
      instance: 4,
      // exec_interpreter: "node",
      exec_mode: "cluster",
      watch: true,
      // watch_delay: 500,
      ignore_watch: [
        "node_modules",
        "data",
        "prisma",
        ".git",
        ".gitignore",
        "build",
        "src",
        "package-lock.json",
        "package.json",
      ],
      // env: {
      //   NODE_ENV: "development",
      // },
      // env_production: {
      //   NODE_ENV: "production",
      // },
    },
    {
      name: "criggingPre-prismaDB",
      script: "npm run studio",
      exec_mode: "fork",
      watch: false,
    },
  ],
  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
