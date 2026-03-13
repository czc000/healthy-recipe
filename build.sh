#!/bin/bash
# 构建脚本

set -e

cd "$(dirname "$0")"

echo "当前目录：$(pwd)"
echo "正在检查文件..."
ls -la index.jsx || (echo "错误：找不到 index.jsx" && exit 1)

mkdir -p dist

echo "正在编译 React..."

npx --yes esbuild index.jsx \
  --bundle \
  --format=esm \
  --outfile=dist/index.js \
  --jsx=automatic \
  --target=es2022 \
  --loader:.jsx=jsx \
  --loader:.js=jsx \
  --minify

if [ $? -eq 0 ]; then
    echo "✅ 编译成功！"
    ls -lh dist/index.js
    echo "构建完成！"
else
    echo "❌ 编译失败"
    exit 1
fi
