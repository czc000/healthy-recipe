import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// 时令水果数据
const seasonalFruits = {
  1: { name: '柑橘', emoji: '🍊', color: 'from-orange-400 to-orange-500' },
  2: { name: '草莓', emoji: '🍓', color: 'from-pink-400 to-red-500' },
  3: { name: '菠萝', emoji: '🍍', color: 'from-yellow-400 to-orange-400' },
  4: { name: '芒果', emoji: '🥭', color: 'from-yellow-500 to-orange-500' },
  5: { name: '樱桃', emoji: '🍒', color: 'from-red-500 to-red-700' },
  6: { name: '西瓜', emoji: '🍉', color: 'from-green-500 to-green-700' },
  7: { name: '葡萄', emoji: '🍇', color: 'from-purple-500 to-purple-700' },
  8: { name: '桃子', emoji: '🍑', color: 'from-pink-300 to-pink-500' },
  9: { name: '梨', emoji: '🍐', color: 'from-green-300 to-green-500' },
  10: { name: '苹果', emoji: '🍎', color: 'from-red-400 to-red-600' },
  11: { name: '柿子', emoji: '🟠', color: 'from-orange-500 to-red-500' },
  12: { name: '柚子', emoji: '🍊', color: 'from-yellow-400 to-orange-400' }
};

// 食谱数据
const recipes = {
  breakfast: [
    { id: 1, name: '燕麦水果粥', calories: 350, time: '10 分钟', tags: ['低脂', '高纤维'], ingredients: ['燕麦片 50g', '时令水果 100g', '牛奶 200ml', '蜂蜜 1 勺', '坚果 15g'], steps: ['燕麦片加入牛奶煮熟', '加入切好的时令水果', '淋上蜂蜜，撒上坚果'] },
    { id: 2, name: '全麦三明治', calories: 380, time: '15 分钟', tags: ['高蛋白'], ingredients: ['全麦面包 2 片', '鸡蛋 1 个', '生菜 2 片', '番茄 1 个', '时令水果 100g'], steps: ['鸡蛋煎熟', '面包烤至微黄', '依次放入生菜、番茄、鸡蛋', '搭配时令水果'] },
    { id: 3, name: '酸奶水果碗', calories: 320, time: '5 分钟', tags: ['益生菌'], ingredients: ['希腊酸奶 200g', '时令水果 150g', '格兰诺拉麦片 30g', '奇亚籽 1 勺'], steps: ['酸奶倒入碗中', '加入切好的时令水果', '撒上麦片和奇亚籽'] }
  ],
  lunch: [
    { id: 1, name: '藜麦蔬菜沙拉', calories: 450, time: '25 分钟', tags: ['低 GI', '高蛋白'], ingredients: ['藜麦 80g', '鸡胸肉 100g', '混合蔬菜 150g', '时令水果 100g', '橄榄油 1 勺'], steps: ['藜麦煮熟晾凉', '鸡胸肉煎熟切块', '混合蔬菜铺底', '放入藜麦和鸡肉', '淋上橄榄油'] },
    { id: 2, name: '清蒸鱼配时蔬', calories: 380, time: '30 分钟', tags: ['低脂', 'Omega-3'], ingredients: ['鲈鱼 150g', '西兰花 100g', '胡萝卜 50g', '姜葱适量', '时令水果 100g'], steps: ['鱼处理干净', '放上姜葱蒸 10 分钟', '蔬菜焯水', '淋上蒸鱼豉油'] },
    { id: 3, name: '糙米蔬菜炒饭', calories: 420, time: '20 分钟', tags: ['高纤维'], ingredients: ['糙米饭 150g', '鸡蛋 1 个', '混合蔬菜 150g', '虾仁 50g', '时令水果 100g'], steps: ['糙米饭提前煮好', '鸡蛋炒散', '加入蔬菜和虾仁翻炒', '放入米饭炒匀'] }
  ],
  dinner: [
    { id: 1, name: '烤蔬菜配豆腐', calories: 320, time: '30 分钟', tags: ['素食', '低卡'], ingredients: ['嫩豆腐 150g', '混合蔬菜 200g', '橄榄油 1 勺', '香草适量', '时令水果 100g'], steps: ['豆腐切块', '蔬菜切块', '放入烤箱 200 度烤 20 分钟', '撒上香草'] },
    { id: 2, name: '番茄鸡蛋汤面', calories: 350, time: '20 分钟', tags: ['暖胃'], ingredients: ['全麦面条 60g', '番茄 2 个', '鸡蛋 1 个', '青菜 50g', '时令水果 100g'], steps: ['番茄炒出汁', '加水煮开', '下面条', '打入蛋花', '放入青菜'] },
    { id: 3, name: '蒸蛋配时蔬', calories: 300, time: '25 分钟', tags: ['低卡', '高蛋白'], ingredients: ['鸡蛋 2 个', '西兰花 100g', '胡萝卜 50g', '虾仁 50g', '时令水果 100g'], steps: ['鸡蛋打散加温水', '放入虾仁蒸 8 分钟', '蔬菜焯水', '淋上生抽'] }
  ]
};

// 获取今日食谱
function getDailyRecipes() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  return {
    breakfast: recipes.breakfast[dayOfYear % recipes.breakfast.length],
    lunch: recipes.lunch[(dayOfYear + 1) % recipes.lunch.length],
    dinner: recipes.dinner[(dayOfYear + 2) % recipes.dinner.length]
  };
}

// 获取时令水果
function getSeasonalFruit() {
  return seasonalFruits[new Date().getMonth() + 1];
}

// 格式化日期
function formatDate() {
  return new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
}

// 餐食卡片组件
const MealCard = ({ type, recipe, onClick }) => {
  const colors = {
    breakfast: { bg: 'from-yellow-400 to-orange-400', icon: '🌅', label: '早餐' },
    lunch: { bg: 'from-green-400 to-emerald-500', icon: '☀️', label: '午餐' },
    dinner: { bg: 'from-purple-400 to-indigo-500', icon: '🌙', label: '晚餐' }
  };
  const c = colors[type];

  return (
    <div onClick={onClick} className="meal-card bg-white rounded-2xl overflow-hidden shadow-xl">
      <div className={`bg-gradient-to-r ${c.bg} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{c.icon} {c.label}</h3>
          <span className="text-3xl">{c.icon}</span>
        </div>
      </div>
      <div className="p-5">
        <h4 className="text-lg font-bold text-gray-800 mb-2">{recipe.name}</h4>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>🔥 {recipe.calories}大卡</span>
          <span>⏱️ {recipe.time}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {recipe.tags.map((tag, i) => (
            <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          点击查看详情 👆
        </div>
      </div>
    </div>
  );
};

// 详情弹窗组件
const Modal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div onClick={onClose} className="modal-overlay fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div onClick={e => e.stopPropagation()} className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white">
          <h2 className="text-2xl font-bold">{recipe.name}</h2>
          <div className="flex items-center gap-4 mt-2 text-sm opacity-90">
            <span>🔥 {recipe.calories}大卡</span>
            <span>⏱️ {recipe.time}</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">🛒</span> 食材
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">👨‍🍳</span> 做法
            </h3>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex">
                  <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-full text-xs flex items-center justify-center mr-3">
                    {i + 1}
                  </span>
                  <span className="text-gray-600 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

// 主应用
function App() {
  const [recipes, setRecipes] = useState(null);
  const [fruit, setFruit] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    setRecipes(getDailyRecipes());
    setFruit(getSeasonalFruit());
  }, []);

  if (!recipes || !fruit) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4 animate-bounce">🍽️</div>
          <div className="text-xl">正在准备今日食谱...</div>
        </div>
      </div>
    );
  }

  const totalCalories = recipes.breakfast.calories + recipes.lunch.calories + recipes.dinner.calories;

  return (
    <div className="min-h-screen pb-12">
      {/* 头部 */}
      <header className="bg-white/10 backdrop-blur-sm shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">🍽️ 时令健康食谱</h1>
              <p className="text-white/80 text-sm">{formatDate()}</p>
            </div>
            <div className={`px-4 py-2 bg-gradient-to-r ${fruit.color} rounded-full text-white text-sm font-medium animate-float`}>
              {fruit.emoji} {fruit.name}
            </div>
          </div>
        </div>
      </header>

      {/* 营养总览 */}
      <section className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalCalories}</div>
              <div className="text-xs text-gray-500">总热量</div>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-xs text-gray-500">餐</div>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">均衡</div>
              <div className="text-xs text-gray-500">营养</div>
            </div>
          </div>
        </div>
      </section>

      {/* 三餐卡片 */}
      <section className="max-w-4xl mx-auto px-4 mt-6">
        <div className="grid gap-4">
          <MealCard type="breakfast" recipe={recipes.breakfast} onClick={() => setSelectedMeal(recipes.breakfast)} />
          <MealCard type="lunch" recipe={recipes.lunch} onClick={() => setSelectedMeal(recipes.lunch)} />
          <MealCard type="dinner" recipe={recipes.dinner} onClick={() => setSelectedMeal(recipes.dinner)} />
        </div>
      </section>

      {/* 弹窗 */}
      {selectedMeal && <Modal recipe={selectedMeal} onClose={() => setSelectedMeal(null)} />}

      {/* 页脚 */}
      <footer className="max-w-4xl mx-auto px-4 mt-12 text-center text-white/60 text-sm">
        <p>🌟 每日更新，让健康成为一种习惯</p>
      </footer>
    </div>
  );
}

// 渲染
const root = createRoot(document.getElementById('root'));
root.render(<App />);
