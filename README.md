# 地址生成器 - Address Generator

一个基于 Next.js 的真实地址生成器，支持美国和加拿大，生成包含个人信息和地理位置的真实地址数据。

## ✨ 功能特性

- 🏠 **真实地址生成**：集成 OpenStreetMap API，获取真实地理位置信息
- 🌎 **美国/加拿大支持**：覆盖美国 50 州和加拿大所有省/地区
- 👤 **完整个人信息**：姓名、性别、电话、邮箱、密码一应俱全
- 📍 **地图集成**：实时显示生成地址的地理位置
- 📋 **一键复制**：点击任意字段即可复制
- 🕰️ **历史记录**：自动保存最近 10 条生成记录，支持快速恢复
- 🎨 **现代化 UI**：采用 shadcn/ui 组件库，响应式设计
- ⚡ **SSR 支持**：服务端渲染，首屏加载快

## 🛠️ 技术栈

- **框架**：Next.js 15 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **UI 组件**：shadcn/ui
- **状态管理**：Zustand
- **图标**：Lucide React
- **数据源**：OpenStreetMap API、FakerAPI

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高
- pnpm（推荐）或 npm/yarn

### 安装依赖

```bash
pnpm install
# 或
npm install
# yarn install
```

### 启动开发服务器

```bash
pnpm dev
# 或
npm run dev
# yarn dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 📁 项目结构

```
├── src/
│   ├── app/
│   │   ├── (main)/                    # 主页面组
│   │   │   ├── _components/           # 页面组件
│   │   │   │   └── address-generator.tsx
│   │   │   ├── _type.d.ts            # 类型定义
│   │   │   └── page.tsx              # 主页面 (SSR)
│   │   ├── api/                      # API路由
│   │   │   ├── generate/             # 地址生成API
│   │   │   └── states/               # 州/省列表API
│   │   ├── globals.css               # 全局样式
│   │   └── layout.tsx                # 根布局
│   ├── components/
│   │   └── ui/                       # shadcn/ui 组件
│   ├── lib/
│   │   └── utils.ts                  # 工具函数
│   └── types/                        # 全局类型定义
├── public/                           # 静态资源
├── .env.local                        # 环境变量
└── README.md
```

## 🔧 API 端点

### `GET /api/generate`

生成新的地址信息。

**查询参数:**

- `state` (可选): 指定州/省代码 (如: CA, NY, ON)

**响应示例:**

```json
{
  "name": "John Smith",
  "gender": "Male",
  "phone": "(555) 123-4567",
  "email": "john.smith@example.com",
  "password": "SecurePass123!",
  "address": "123 Main St, Los Angeles, CA 90210, United States",
  "city": "Los Angeles",
  "state": "CA",
  "zip": "90210",
  "country": "US"
}
```

### `GET /api/states`

获取所有支持的州/省列表。

**响应示例:**

```json
[
  {
    "full": "加利福尼亚州",
    "abbr": "CA",
    "country": "US",
    "en": "California"
  }
]
```

## 🎯 使用说明

1. **生成地址**: 点击"生成新地址"按钮获取随机地址信息
2. **选择地区**: 从下拉菜单中选择美国州或加拿大省份
3. **复制信息**: 点击任意数据项即可复制到剪贴板
4. **查看地图**: 在地图面板中查看地址的实际位置
5. **历史记录**: 从历史面板中快速恢复之前生成的数据

## 🌐 部署

### Vercel (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YeShengDe/AddressGeneratorFe)

### Cloudflare Pages

[![Deploy to Cloudflare Pages](https://deploy.cloudflare.com/button)](https://deploy.cloudflare.com/?repository=https://github.com/YeShengDe/AddressGeneratorFe)

。

### 其他平台

项目支持部署到任何支持 Next.js 的平台:

- Netlify
- Railway
- Render
- Docker

## 📝 环境变量

创建 `.env.local` 文件:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

生产环境记得更新为实际域名。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT License](LICENSE)

## 🙏 致谢

- [OpenStreetMap](https://www.openstreetmap.org/) - 地理数据API
- [FakerAPI](https://fakerapi.it/) - 用户数据生成
- [shadcn/ui](https://ui.shadcn.com/) - UI组件库
- [Lucide](https://lucide.dev/) - 图标库

---

**注意**: 生成的地址信息仅供测试和开发使用，请勿用于实际业务或非法用途。
