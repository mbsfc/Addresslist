# 一个野生的地址生成器

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-15-000?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn/ui-%23000000.svg?style=flat&logo=vercel&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Zustand-000?logo=react&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Lucide_React-FACC15?logo=lucide&logoColor=black" alt="Lucide" />
  <img src="https://img.shields.io/badge/OpenStreetMap-7EBC6F?logo=openstreetmap&logoColor=white" alt="OpenStreetMap" />
  <img src="https://img.shields.io/badge/Faker_API-FF5722?logo=json&logoColor=white" alt="Faker API" />
</p>

## ✨ 功能特性

- 🏠 **真实地址生成**：集成 OpenStreetMap API，获取真实地理位置信息
- 🌎 **美国/加拿大支持**：覆盖美国 50 州和加拿大所有省/地区
- 👤 **完整个人信息**：姓名、性别、电话、邮箱、密码一应俱全
- 📍 **地图集成**：实时显示生成地址的地理位置
- 📋 **一键复制**：点击任意字段即可复制
- 🕰️ **历史记录**：自动保存最近 10 条生成记录，支持快速恢复
- 🎨 **现代化 UI**：采用 shadcn/ui 组件库，响应式设计
- ⚡ **SSR 支持**：服务端渲染，首屏加载快

---

## 🚀 部署方法（推荐 Cloudflare Pages）

### Cloudflare Pages 一键部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YeShengDe/AddressGeneratorFe)

### Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YeShengDe/AddressGeneratorFe)

---

## 🖼️ 截图

<div align="center" style="margin-bottom: 1.5em;">
  <img src="docs/pc.png" alt="PC界面" width="600" style="box-shadow:0 4px 24px rgba(0,0,0,0.15);border-radius:10px;" />
  <div style="margin: 0.5em 0 1.5em 0; color: #888; font-size: 15px;">（1）PC 页面</div>
</div>
<div align="center" style="margin-bottom: 1.5em;">
  <img src="docs/phone.png" alt="移动端界面" width="300" style="box-shadow:0 4px 24px rgba(0,0,0,0.15);border-radius:10px;" />
  <div style="margin: 0.5em 0 1.5em 0; color: #888; font-size: 15px;">（2）移动端页面</div>
</div>
<div align="center" style="margin-bottom: 1.5em;">
  <img src="docs/share.png" alt="分享界面" width="400" style="box-shadow:0 4px 24px rgba(0,0,0,0.15);border-radius:10px;" />
  <div style="margin: 0.5em 0 1.5em 0; color: #888; font-size: 15px;">（3）分享页面</div>
</div>

---

## 🛠️ 本地开发

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

---

## 🎯 使用说明

1. **生成地址**: 点击"生成新地址"按钮获取随机地址信息
2. **选择地区**: 从下拉菜单中选择美国州或加拿大省份
3. **复制信息**: 点击任意数据项即可复制到剪贴板
4. **查看地图**: 在地图面板中查看地址的实际位置
5. **历史记录**: 从历史面板中快速恢复之前生成的数据

---

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
