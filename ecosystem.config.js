module.exports = {
  apps: [
    {
      name: "api",
      script: "./api/dist/shared/infra/http/app.js",
      cwd: "./api",
      watch: true,
      env: {
        NODE_ENV: "production",
        POSTGRES_HOST: "127.0.0.1",
        POSTGRES_PORT: 5432,
        POSTGRES_USERNAME: "postgres",
        POSTGRES_PASSWORD: "rubeusintegration",
        POSTGRES_DATABASE: "rubeusintegration",
      },
    },
    {
      name: "frontend",
      script: "npm",
      args: "run start",
      cwd: "./frontend",
    },
  ],
};
