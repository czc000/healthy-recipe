import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// ============================================================================
// 数据层
// ============================================================================

// 时令水果 - 按旬划分（每 10 天换一种），更符合实际成熟期
const seasonalFruits = {
  // 1 月：冬季水果
  1: [
    { name: '柑橘', emoji: '🍊', color: 'from-orange-400 to-orange-500' },
    { name: '草莓', emoji: '🍓', color: 'from-pink-400 to-red-500' },
    { name: '甘蔗', emoji: '🎋', color: 'from-green-400 to-green-600' }
  ],
  // 2 月：冬春交替
  2: [
    { name: '草莓', emoji: '🍓', color: 'from-pink-400 to-red-500' },
    { name: '圣女果', emoji: '🍅', color: 'from-red-400 to-red-600' },
    { name: '枇杷', emoji: '🟡', color: 'from-yellow-300 to-yellow-500' }
  ],
  // 3 月：春季水果
  3: [
    { name: '菠萝', emoji: '🍍', color: 'from-yellow-400 to-orange-400' },
    { name: '桑葚', emoji: '🟣', color: 'from-purple-500 to-purple-700' },
    { name: '樱桃', emoji: '🍒', color: 'from-red-500 to-red-700' }
  ],
  // 4 月：春末
  4: [
    { name: '芒果', emoji: '🥭', color: 'from-yellow-500 to-orange-500' },
    { name: '山竹', emoji: '🟣', color: 'from-purple-600 to-purple-800' },
    { name: '莲雾', emoji: '🔴', color: 'from-red-400 to-pink-500' }
  ],
  // 5 月：初夏
  5: [
    { name: '樱桃', emoji: '🍒', color: 'from-red-500 to-red-700' },
    { name: '荔枝', emoji: '🔴', color: 'from-red-500 to-red-600' },
    { name: '杨梅', emoji: '🟣', color: 'from-purple-600 to-red-700' }
  ],
  // 6 月：盛夏
  6: [
    { name: '西瓜', emoji: '🍉', color: 'from-green-500 to-green-700' },
    { name: '水蜜桃', emoji: '🍑', color: 'from-pink-300 to-pink-500' },
    { name: '蓝莓', emoji: '🫐', color: 'from-blue-500 to-blue-700' }
  ],
  // 7 月：酷暑
  7: [
    { name: '葡萄', emoji: '🍇', color: 'from-purple-500 to-purple-700' },
    { name: '火龙果', emoji: '🐉', color: 'from-pink-500 to-red-500' },
    { name: '哈密瓜', emoji: '🍈', color: 'from-green-300 to-green-500' }
  ],
  // 8 月：夏末
  8: [
    { name: '桃子', emoji: '🍑', color: 'from-pink-300 to-pink-500' },
    { name: '李子', emoji: '🟣', color: 'from-purple-400 to-purple-600' },
    { name: '龙眼', emoji: '🟤', color: 'from-yellow-600 to-orange-600' }
  ],
  // 9 月：初秋
  9: [
    { name: '梨', emoji: '🍐', color: 'from-green-300 to-green-500' },
    { name: '石榴', emoji: '🔴', color: 'from-red-500 to-red-700' },
    { name: '猕猴桃', emoji: '🥝', color: 'from-green-500 to-green-700' }
  ],
  // 10 月：深秋
  10: [
    { name: '苹果', emoji: '🍎', color: 'from-red-400 to-red-600' },
    { name: '柿子', emoji: '🟠', color: 'from-orange-500 to-red-500' },
    { name: '冬枣', emoji: '🟢', color: 'from-green-400 to-yellow-500' }
  ],
  // 11 月：秋冬
  11: [
    { name: '柚子', emoji: '🍊', color: 'from-yellow-400 to-orange-400' },
    { name: '橙子', emoji: '🍊', color: 'from-orange-400 to-orange-600' },
    { name: '山楂', emoji: '🔴', color: 'from-red-500 to-red-700' }
  ],
  // 12 月：寒冬
  12: [
    { name: '柑橘', emoji: '🍊', color: 'from-orange-400 to-orange-500' },
    { name: '甘蔗', emoji: '🎋', color: 'from-green-400 to-green-600' },
    { name: '草莓', emoji: '🍓', color: 'from-pink-400 to-red-500' }
  ]
};

// 菜品数据 - 使用 SVG 图标和精美配色
const recipes = {
  breakfast: [
    { 
      id: 1, 
      name: '燕麦水果粥', 
      calories: 350, 
      time: '10 分钟', 
      tags: ['低脂', '高纤维'], 
      icon: 'bowl',
      gradient: 'from-amber-400 via-orange-400 to-red-400',
      accentColor: '#f59e0b',
      ingredients: ['燕麦片 50g', '时令水果 100g', '牛奶 200ml', '蜂蜜 1 勺', '坚果 15g'], 
      steps: ['燕麦片加入牛奶煮熟', '加入切好的时令水果', '淋上蜂蜜，撒上坚果'] 
    },
    { 
      id: 2, 
      name: '全麦三明治', 
      calories: 380, 
      time: '15 分钟', 
      tags: ['高蛋白'], 
      icon: 'sandwich',
      gradient: 'from-yellow-300 via-amber-400 to-orange-400',
      accentColor: '#eab308',
      ingredients: ['全麦面包 2 片', '鸡蛋 1 个', '生菜 2 片', '番茄 1 个', '时令水果 100g'], 
      steps: ['鸡蛋煎熟', '面包烤至微黄', '依次放入生菜、番茄、鸡蛋', '搭配时令水果'] 
    },
    { 
      id: 3, 
      name: '酸奶水果碗', 
      calories: 320, 
      time: '5 分钟', 
      tags: ['益生菌'], 
      icon: 'yogurt',
      gradient: 'from-blue-300 via-indigo-400 to-purple-400',
      accentColor: '#6366f1',
      ingredients: ['希腊酸奶 200g', '时令水果 150g', '格兰诺拉麦片 30g', '奇亚籽 1 勺'], 
      steps: ['酸奶倒入碗中', '加入切好的时令水果', '撒上麦片和奇亚籽'] 
    }
  ],
  lunch: [
    { 
      id: 1, 
      name: '藜麦蔬菜沙拉', 
      calories: 450, 
      time: '25 分钟', 
      tags: ['低 GI', '高蛋白'], 
      icon: 'salad',
      gradient: 'from-green-400 via-emerald-400 to-teal-400',
      accentColor: '#10b981',
      ingredients: ['藜麦 80g', '鸡胸肉 100g', '混合蔬菜 150g', '时令水果 100g', '橄榄油 1 勺'], 
      steps: ['藜麦煮熟晾凉', '鸡胸肉煎熟切块', '混合蔬菜铺底', '放入藜麦和鸡肉', '淋上橄榄油'] 
    },
    { 
      id: 2, 
      name: '清蒸鱼配时蔬', 
      calories: 380, 
      time: '30 分钟', 
      tags: ['低脂', 'Omega-3'], 
      icon: 'fish',
      gradient: 'from-cyan-400 via-blue-400 to-indigo-400',
      accentColor: '#06b6d4',
      ingredients: ['鲈鱼 150g', '西兰花 100g', '胡萝卜 50g', '姜葱适量', '时令水果 100g'], 
      steps: ['鱼处理干净', '放上姜葱蒸 10 分钟', '蔬菜焯水', '淋上蒸鱼豉油'] 
    },
    { 
      id: 3, 
      name: '糙米蔬菜炒饭', 
      calories: 420, 
      time: '20 分钟', 
      tags: ['高纤维'], 
      icon: 'rice',
      gradient: 'from-orange-400 via-red-400 to-pink-400',
      accentColor: '#f97316',
      ingredients: ['糙米饭 150g', '鸡蛋 1 个', '混合蔬菜 150g', '虾仁 50g', '时令水果 100g'], 
      steps: ['糙米饭提前煮好', '鸡蛋炒散', '加入蔬菜和虾仁翻炒', '放入米饭炒匀'] 
    }
  ],
  dinner: [
    { 
      id: 1, 
      name: '烤蔬菜配豆腐', 
      calories: 320, 
      time: '30 分钟', 
      tags: ['素食', '低卡'], 
      icon: 'vegetable',
      gradient: 'from-lime-400 via-green-400 to-emerald-400',
      accentColor: '#84cc16',
      ingredients: ['嫩豆腐 150g', '混合蔬菜 200g', '橄榄油 1 勺', '香草适量', '时令水果 100g'], 
      steps: ['豆腐切块', '蔬菜切块', '放入烤箱 200 度烤 20 分钟', '撒上香草'] 
    },
    { 
      id: 2, 
      name: '番茄鸡蛋汤面', 
      calories: 350, 
      time: '20 分钟', 
      tags: ['暖胃'], 
      icon: 'noodles',
      gradient: 'from-red-400 via-rose-400 to-pink-400',
      accentColor: '#e11d48',
      ingredients: ['全麦面条 60g', '番茄 2 个', '鸡蛋 1 个', '青菜 50g', '时令水果 100g'], 
      steps: ['番茄炒出汁', '加水煮开', '下面条', '打入蛋花', '放入青菜'] 
    },
    { 
      id: 3, 
      name: '蒸蛋配时蔬', 
      calories: 300, 
      time: '25 分钟', 
      tags: ['低卡', '高蛋白'], 
      icon: 'egg',
      gradient: 'from-yellow-300 via-amber-300 to-orange-300',
      accentColor: '#fbbf24',
      ingredients: ['鸡蛋 2 个', '西兰花 100g', '胡萝卜 50g', '虾仁 50g', '时令水果 100g'], 
      steps: ['鸡蛋打散加温水', '放入虾仁蒸 8 分钟', '蔬菜焯水', '淋上生抽'] 
    }
  ]
};

// ============================================================================
// SVG 美食图标
// ============================================================================

const FoodIcons = {
  bowl: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="35" rx="35" ry="12" fill="white" fillOpacity="0.9"/>
      <path d="M15 35C15 35 20 75 50 75C80 75 85 35 85 35" fill="white" fillOpacity="0.9"/>
      <ellipse cx="50" cy="35" rx="25" ry="8" fill="#f59e0b" fillOpacity="0.6"/>
      <circle cx="40" cy="32" r="4" fill="#ef4444" fillOpacity="0.8"/>
      <circle cx="55" cy="30" r="3" fill="#22c55e" fillOpacity="0.8"/>
      <circle cx="48" cy="38" r="3" fill="#eab308" fillOpacity="0.8"/>
    </svg>
  ),
  sandwich: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 45L50 25L80 45L80 65L20 65L20 45Z" fill="#fbbf24" fillOpacity="0.9"/>
      <path d="M20 55L50 35L80 55" stroke="#d97706" strokeWidth="2" fill="none"/>
      <ellipse cx="50" cy="50" rx="30" ry="8" fill="#22c55e" fillOpacity="0.8"/>
      <ellipse cx="50" cy="55" rx="30" ry="8" fill="#ef4444" fillOpacity="0.8"/>
      <path d="M20 65L50 85L80 65" fill="#f59e0b" fillOpacity="0.9"/>
    </svg>
  ),
  yogurt: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="30" rx="30" ry="10" fill="white" fillOpacity="0.9"/>
      <path d="M20 30L25 70C25 75 35 80 50 80C65 80 75 75 75 70L80 30" fill="white" fillOpacity="0.9"/>
      <ellipse cx="50" cy="30" rx="22" ry="7" fill="#6366f1" fillOpacity="0.6"/>
      <circle cx="42" cy="28" r="3" fill="#ec4899" fillOpacity="0.9"/>
      <circle cx="55" cy="26" r="2" fill="#8b5cf6" fillOpacity="0.9"/>
      <circle cx="50" cy="32" r="2" fill="#06b6d4" fillOpacity="0.9"/>
    </svg>
  ),
  salad: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="40" rx="35" ry="12" fill="white" fillOpacity="0.9"/>
      <path d="M15 40C15 40 20 75 50 75C80 75 85 40 85 40" fill="white" fillOpacity="0.9"/>
      <circle cx="35" cy="38" r="8" fill="#22c55e" fillOpacity="0.8"/>
      <circle cx="50" cy="35" r="7" fill="#10b981" fillOpacity="0.8"/>
      <circle cx="65" cy="38" r="8" fill="#14b8a6" fillOpacity="0.8"/>
      <circle cx="42" cy="45" r="5" fill="#ef4444" fillOpacity="0.8"/>
      <circle cx="58" cy="45" r="5" fill="#f59e0b" fillOpacity="0.8"/>
    </svg>
  ),
  fish: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="50" rx="30" ry="18" fill="white" fillOpacity="0.9"/>
      <path d="M80 50L95 35L95 65L80 50Z" fill="white" fillOpacity="0.9"/>
      <circle cx="40" cy="45" r="4" fill="#1e3a5f" fillOpacity="0.8"/>
      <path d="M55 50Q65 55 75 50" stroke="#f97316" strokeWidth="2" fill="none"/>
      <path d="M30 50Q40 45 50 50Q60 55 70 50" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.5"/>
    </svg>
  ),
  rice: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="40" rx="32" ry="10" fill="white" fillOpacity="0.9"/>
      <path d="M18 40C18 40 22 70 50 70C78 70 82 40 82 40" fill="white" fillOpacity="0.9"/>
      <circle cx="38" cy="38" r="3" fill="#f59e0b" fillOpacity="0.8"/>
      <circle cx="50" cy="35" r="3" fill="#22c55e" fillOpacity="0.8"/>
      <circle cx="62" cy="38" r="3" fill="#ef4444" fillOpacity="0.8"/>
      <circle cx="44" cy="45" r="3" fill="#eab308" fillOpacity="0.8"/>
      <circle cx="56" cy="45" r="3" fill="#f97316" fillOpacity="0.8"/>
    </svg>
  ),
  vegetable: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="45" r="12" fill="#22c55e" fillOpacity="0.8"/>
      <circle cx="50" cy="40" r="10" fill="#10b981" fillOpacity="0.8"/>
      <circle cx="65" cy="45" r="12" fill="#14b8a6" fillOpacity="0.8"/>
      <circle cx="42" cy="55" r="10" fill="#84cc16" fillOpacity="0.8"/>
      <circle cx="58" cy="55" r="10" fill="#22c55e" fillOpacity="0.8"/>
      <path d="M35 35L35 25" stroke="#166534" strokeWidth="3" strokeLinecap="round"/>
      <path d="M50 30L50 20" stroke="#166534" strokeWidth="3" strokeLinecap="round"/>
      <path d="M65 35L65 25" stroke="#166534" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  noodles: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="45" rx="35" ry="12" fill="white" fillOpacity="0.9"/>
      <path d="M15 45C15 45 20 75 50 75C80 75 85 45 85 45" fill="white" fillOpacity="0.9"/>
      <path d="M25 45Q35 55 45 45Q55 35 65 45Q75 55 85 45" stroke="#fbbf24" strokeWidth="3" fill="none"/>
      <path d="M25 52Q35 62 45 52Q55 42 65 52Q75 62 85 52" stroke="#fbbf24" strokeWidth="3" fill="none"/>
      <circle cx="40" cy="40" r="4" fill="#ef4444" fillOpacity="0.8"/>
      <circle cx="60" cy="40" r="4" fill="#22c55e" fillOpacity="0.8"/>
    </svg>
  ),
  egg: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="55" rx="28" ry="32" fill="white" fillOpacity="0.9"/>
      <ellipse cx="50" cy="50" rx="22" ry="25" fill="#fbbf24" fillOpacity="0.8"/>
      <ellipse cx="42" cy="45" rx="8" ry="10" fill="#fcd34d" fillOpacity="0.6"/>
      <circle cx="35" cy="60" r="5" fill="#22c55e" fillOpacity="0.8"/>
      <circle cx="65" cy="58" r="4" fill="#f97316" fillOpacity="0.8"/>
    </svg>
  )
};

// ============================================================================
// 工具函数
// ============================================================================

const getDailyRecipes = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  return {
    breakfast: recipes.breakfast[dayOfYear % recipes.breakfast.length],
    lunch: recipes.lunch[(dayOfYear + 1) % recipes.lunch.length],
    dinner: recipes.dinner[(dayOfYear + 2) % recipes.dinner.length]
  };
};

// 获取当季水果 - 每日轮换（在当季范围内随机但可预测）
const getSeasonalFruit = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();
  
  // 计算今天是今年的第几天
  const startOfYear = new Date(year, 0, 0);
  const dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));
  
  const fruits = seasonalFruits[month];
  
  // 使用 dayOfYear 确保每天轮换但可预测（不用随机数）
  // 在当月水果范围内循环选择
  return fruits[dayOfYear % fruits.length];
};

const formatDate = () => new Date().toLocaleDateString('zh-CN', { 
  month: 'long', 
  day: 'numeric', 
  weekday: 'long' 
});

// ============================================================================
// 可复用组件
// ============================================================================

// 营养信息标签
const NutritionBadge = ({ calories, time }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="flex items-center text-orange-600 font-medium">
      <span className="mr-1.5">🔥</span> {calories}大卡
    </span>
    <span className="flex items-center text-blue-600 font-medium">
      <span className="mr-1.5">⏱️</span> {time}
    </span>
  </div>
);

// 时令水果标签
const SeasonalFruitBadge = ({ fruit }) => (
  <div 
    className={`px-5 py-2.5 bg-gradient-to-r ${fruit.color} rounded-full text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow`}
    role="status"
  >
    <span className="mr-2">{fruit.emoji}</span> 时令：{fruit.name}
  </div>
);

// 菜品插图区域 - 使用 SVG 图标 + 精美渐变
const DishArtwork = ({ icon, gradient, name }) => (
  <div className={`h-48 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden group`}>
    {/* 装饰性背景元素 */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full blur-xl"></div>
      <div className="absolute bottom-8 right-8 w-24 h-24 bg-white rounded-full blur-2xl"></div>
    </div>
    
    {/* 网格装饰 */}
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
    
    {/* SVG 图标 */}
    <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
      <svg className="w-32 h-32 drop-shadow-2xl" viewBox="0 0 100 100">
        {FoodIcons[icon]}
      </svg>
    </div>
    
    {/* 底部渐变遮罩 */}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
  </div>
);

// 餐食卡片组件
const MealCard = React.memo(({ type, recipe, onClick }) => {
  const colors = {
    breakfast: { bg: 'from-amber-400 to-orange-500', icon: '🌅', label: '早餐' },
    lunch: { bg: 'from-emerald-400 to-green-500', icon: '☀️', label: '午餐' },
    dinner: { bg: 'from-indigo-400 to-purple-500', icon: '🌙', label: '晚餐' }
  };
  const c = colors[type];

  return (
    <div 
      onClick={onClick} 
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      role="button"
      tabIndex={0}
      className="meal-card bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
      aria-label={`查看${c.label}：${recipe.name}`}
    >
      {/* 菜品插图区域 - 渐变背景延伸到顶部 */}
      <div className={`relative bg-gradient-to-r ${c.bg}`}>
        <DishArtwork icon={recipe.icon} gradient={recipe.gradient} name={recipe.name} />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-gray-700 shadow-lg">
            {c.icon} {c.label}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h4 className="text-lg font-bold text-gray-800 mb-3 line-clamp-1">{recipe.name}</h4>
        <NutritionBadge calories={recipe.calories} time={recipe.time} />
        <div className="flex flex-wrap gap-2 mt-4">
          {recipe.tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-2.5 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

MealCard.displayName = 'MealCard';

// 详情弹窗组件
const Modal = ({ recipe, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.classList.add('modal-open');
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  useEffect(() => {
    const modalContent = document.querySelector('[role="dialog"]');
    if (modalContent) {
      modalContent.focus();
    }
  }, []);

  if (!recipe) return null;

  return (
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black/60 modal-overlay z-50 flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        onClick={e => e.stopPropagation()} 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
        role="document"
      >
        {/* 菜品大图区域 */}
        <div className="relative rounded-t-3xl overflow-hidden">
          <DishArtwork icon={recipe.icon} gradient={recipe.gradient} name={recipe.name} />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg text-xl"
            aria-label="关闭详情"
          >
            ✕
          </button>
        </div>
        
        {/* 信息区 */}
        <div className="p-6 sm:p-8">
          {/* 标题和营养信息 */}
          <div className="mb-6">
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">{recipe.name}</h2>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center text-orange-600 font-medium">
                <span className="mr-2 text-xl">🔥</span> {recipe.calories}大卡
              </span>
              <span className="flex items-center text-blue-600 font-medium">
                <span className="mr-2 text-xl">⏱️</span> {recipe.time}
              </span>
            </div>
          </div>

          {/* 食材准备 */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
              <span className="mr-3 text-2xl">🛒</span> 食材准备
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" role="list">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 烹饪步骤 */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
              <span className="mr-3 text-2xl">👨‍🍳</span> 烹饪步骤
            </h3>
            <ol className="space-y-4" role="list">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex">
                  <span 
                    className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-full text-sm font-bold flex items-center justify-center mr-4 shadow-lg"
                    aria-label={`步骤 ${i + 1}`}
                  >
                    {i + 1}
                  </span>
                  <span className="text-gray-700 pt-1.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 主应用组件
// ============================================================================

function App() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  
  const dailyData = useMemo(() => ({
    recipes: getDailyRecipes(),
    fruit: getSeasonalFruit()
  }), []);
  
  const { recipes, fruit } = dailyData;

  const handleMealClick = useCallback((meal) => setSelectedMeal(meal), []);
  const handleCloseModal = useCallback(() => setSelectedMeal(null), []);

  const totalCalories = recipes.breakfast.calories + recipes.lunch.calories + recipes.dinner.calories;

  return (
    <div className="min-h-screen pb-16">
      {/* 头部 */}
      <header className="bg-white/10 backdrop-blur-lg shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                🍽️ 时令健康食谱
              </h1>
              <p className="text-white/90 text-base sm:text-lg">{formatDate()}</p>
            </div>
            <SeasonalFruitBadge fruit={fruit} />
          </div>
        </div>
      </header>

      {/* 主要内容区 */}
      <main id="main-content">
        {/* 营养总览 */}
        <section className="max-w-6xl mx-auto px-6 mt-8 sm:mt-12" aria-label="今日营养总览">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
              📊 今日营养总览
            </h2>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
                <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">
                  {totalCalories}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">总热量 (大卡)</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">3</div>
                <div className="text-xs sm:text-sm text-gray-600">营养餐食</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">均衡</div>
                <div className="text-xs sm:text-sm text-gray-600">营养搭配</div>
              </div>
            </div>
          </div>
        </section>

        {/* 三餐卡片 */}
        <section className="max-w-6xl mx-auto px-6 mt-8 sm:mt-12" aria-label="今日三餐">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            🍴 今日三餐
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MealCard 
              type="breakfast" 
              recipe={recipes.breakfast} 
              onClick={() => handleMealClick(recipes.breakfast)} 
            />
            <MealCard 
              type="lunch" 
              recipe={recipes.lunch} 
              onClick={() => handleMealClick(recipes.lunch)} 
            />
            <MealCard 
              type="dinner" 
              recipe={recipes.dinner} 
              onClick={() => handleMealClick(recipes.dinner)} 
            />
          </div>
        </section>
      </main>

      {/* 弹窗 */}
      {selectedMeal && <Modal recipe={selectedMeal} onClose={handleCloseModal} />}

      {/* 页脚 */}
      <footer className="max-w-6xl mx-auto px-6 mt-12 sm:mt-16 text-center text-white/80 text-base sm:text-lg">
        <p>🌟 每日更新时令健康食谱，让健康成为一种习惯</p>
      </footer>
    </div>
  );
}

// ============================================================================
// 应用入口
// ============================================================================

const root = createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
