module.exports = {
  apps: [
    {
      name: "tibet-travel-english",       // 你的项目名称
      script: ".output/server/index.mjs", // TanStack Start 的生产构建入口
      instances: 1,                       // 或者 'max' 利用多核
      exec_mode: "cluster",               // 开启集群模式
      env: {
        NODE_ENV: "production",
        PORT: 3000,                       // 确保这里的端口与 Caddy 反向代理的一致
      },
    },
  ],
};