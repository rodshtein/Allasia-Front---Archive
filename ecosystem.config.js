module.exports = {
  apps: [
    {
      name: "Allasia_Front",
      cwd: "/var/www/allasia/front/",
      script: "yarn start",
      instances: 1,
      watch: false,
      watch_delay: 5000,
      ignore_watch : ["node_modules", ".git", "cypress", "src", ".github"],
      watch_options: {
        "followSymlinks": false
      },
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        PORT: 3000,
        NODE_ENV: "production",
      }
    }
  ]
};
