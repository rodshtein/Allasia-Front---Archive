module.exports = {
  apps: [
    {
      name: "Public App",
      cwd: "/var/www/Front/",
      script: "npm run start",
      instances: 1,
      watch: false,
      watch_delay: 5000,
      ignore_watch : ["node_modules", "src", "dist"],
      watch_options: {
        "followSymlinks": false
      },
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        PORT: 3000,
        DATABASE_URL: "mongodb://localhost/allasia",
        NODE_ENV: "production",
      }
    }
  ]
};