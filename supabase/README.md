# Supabase 接入说明

当前网站已经有 Supabase 客户端和验证门，但还没有真实项目环境变量，所以线上状态是 `missing-env`。

## 需要的信息

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

如果 Supabase 项目仍使用旧命名，也可以用：

- `VITE_SUPABASE_ANON_KEY`

两种 key 只需要提供一种，优先使用 `VITE_SUPABASE_PUBLISHABLE_KEY`。

## Supabase 后台操作

1. 打开 Supabase 项目。
2. 进入 SQL Editor。
3. 执行 [`portfolio_health.sql`](./portfolio_health.sql)。
4. 确认 `public.portfolio_health` 表存在，并且 anon/authenticated 可以读取。

## 本地验证

在项目根目录创建 `.env.local`：

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

然后运行：

```bash
cmd /c npm run verify:supabase
cmd /c npm run build
```

验证成功时会看到：

```json
{
  "ready": true,
  "reason": "connected"
}
```

## Vercel 配置

当前 Vercel 项目环境变量为空。拿到真实值后执行：

```bash
cmd /c npx vercel env add VITE_SUPABASE_URL production
cmd /c npx vercel env add VITE_SUPABASE_PUBLISHABLE_KEY production
cmd /c npx vercel --prod --yes
```

部署后再次验证：

```bash
cmd /c npm run verify:supabase
node tmp\verify-product-orbit-separated.mjs https://portfolio-site-three-rose.vercel.app
```

浏览器验证里 `document.documentElement.dataset.supabase` 应该变为 `connected`。
