# EdgeOne Pages 一域名低成本上线清单

## 目标

用一个自定义域名上线作品集，优先用低成本或免费路径测试香港和深圳无 VPN 访问。

首选方案：

- 平台：Tencent EdgeOne Pages
- 区域：Global availability zone excluding Chinese mainland / 全球可用区不含中国大陆
- 域名：必须绑定自己的自定义域名
- ICP：这一首选测试路径暂不需要 ICP

这个清单不能替代真实验证。只有香港和深圳无 VPN 都通过，目标才算完成。

## 为什么不能用预览域名

EdgeOne Pages 的项目域名和部署域名不是最终面试链接。

- 不含中国大陆区域时，非中国大陆网络可直接访问项目/部署域名。
- 中国大陆网络访问项目/部署域名可能返回 401。
- 因此必须绑定自定义域名，才能建立稳定访问入口。

## 上传前准备

在本地项目目录运行：

```powershell
cmd /c npm run package:china
```

上传前再验证 release 包完整性：

```powershell
cmd /c npm run verify:release -- --latest
```

确认最新 release 包生成，例如：

```text
release\portfolio-site-china-YYYYMMDD-HHMMSS.zip
```

真正上传时只上传 release 文件夹里的 `dist\` 内容，不上传父级 release 文件夹。

## EdgeOne Pages 设置

### 1. 创建项目

在 EdgeOne Pages 控制台创建新项目。

建议填写：

- Project name: `portfolio-site`
- Framework preset: static site / Vite static output
- Build command: 如果控制台要求构建，填 `npm run build`
- Output directory: `dist`
- 如果走手动上传，直接使用 release 包中的 `dist\`

### 2. 选择区域

选择：

```text
Global availability zone excluding Chinese mainland
```

不要选：

```text
Chinese mainland availability zone
Global availability zone including Chinese mainland
```

原因：

- 上面两个区域绑定自定义域名需要 ICP。
- 当前目标是先低成本/少成本测试，不先走 ICP。

### 3. 绑定自定义域名

进入 Domain Name Management / 域名管理。

添加自己的域名，例如：

```text
portfolio.example.com
```

建议优先用子域名，不直接用裸域名：

```text
portfolio.your-domain.com
```

原因：

- 子域名 CNAME 更容易配置。
- 后续如果要迁移到 COS/OSS 或 ICP + 内地 CDN，同一个子域名也能继续保留。

### 4. 做域名所有权验证

EdgeOne 会给一个验证记录。

把它填入 `domain_dns_template.md`：

```text
Ownership verification record
Type:
Name / Host:
Value:
TTL:
```

然后去你的 DNS 服务商添加这条记录。

### 5. 配置生产 CNAME

EdgeOne 会给一个 CNAME 目标。

把它填入 `domain_dns_template.md`：

```text
Production CNAME record
Type: CNAME
Name / Host:
Value:
TTL:
```

在 DNS 服务商添加 CNAME。

如果你使用的是 `portfolio.example.com`：

- Host / Name 通常填 `portfolio`
- Type 填 `CNAME`
- Value 填 EdgeOne 提供的目标

### 6. 开启 HTTPS

等待 EdgeOne 证书签发完成。

必须满足：

- `https://你的域名` 能打开
- HTTP 最终应该跳到 HTTPS 或至少 HTTPS 可用
- 证书不能报错

## 自动验证

DNS 和 HTTPS 生效后，在本地运行：

```powershell
cmd /c npm run verify:domain -- https://你的域名 --report release/domain-check.json --markdown release/domain-check.md
```

然后运行：

```powershell
cmd /c npm run verify:url -- https://你的域名 --repeat 5 --interval 2000 --report release/live-domain-check.json --markdown release/live-domain-check.md
```

两个命令都必须通过。

## 人工实测

在 `deployment_verification_log.md` 记录：

- 香港网络，无 VPN，打开结果
- 深圳/内地网络，无 VPN，重复打开结果
- 网络环境或 ISP
- 首屏大概加载时间
- 截图或录屏证据

深圳测试必须重复打开，不只打开一次。

## 最终门禁

复制模板：

```powershell
cmd /c npm run generate:evidence -- --url https://你的域名 --output deployment_evidence.json
```

把真实域名、报告路径、香港/深圳证据填进去，然后运行：

```powershell
cmd /c npm run verify:launch-goal -- --evidence deployment_evidence.json
```

这个命令通过后，才可以说这个部署目标完成。

## 失败时怎么判断

### `verify:domain` 失败

优先检查：

- DNS CNAME 是否填错
- HTTPS 证书是否签发完成
- 域名是否还在解析传播中
- 是否误用了 EdgeOne 项目/部署预览域名

### `verify:url` 失败

优先检查：

- `dist\` 是否上传完整
- `index.html` 是否在根目录
- `/assets/*` 是否能访问
- `/hero-ribbon-loop.mp4` 是否能访问
- SPA fallback 是否配置好

### 香港通过，深圳失败

不要继续反复调预览域名。按顺序切换：

1. 继续同一个域名，尝试香港 COS/OSS 静态托管。
2. 如果深圳稳定性必须保证，准备 ICP + 内地静态托管/CDN。

## 官方依据

- EdgeOne Pages Add Custom Domain: https://pages.edgeone.ai/document/custom-domain
- EdgeOne Pages Domain Management Overview: https://pages.edgeone.ai/document/domain-overview
