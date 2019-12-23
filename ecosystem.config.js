module.exports = {
  apps: [
    {
      name: "gifts",
      script: "./bin/www",
      watch: true,
      watch_delay: 1000,
      ignore_watch: ["node_modules", ".idea"],
      watch_options: {
        "followSymlinks": false
      },
      env: {
        "PORT": 3033,
        "NODE_ENV": "production"
      }
    }
  ]
};