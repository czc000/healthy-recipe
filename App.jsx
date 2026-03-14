import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
const getDailyRecipes = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  return useMemo(() => ({
    breakfast: recipes.breakfast[dayOfYear % recipes.breakfast.length],
    lunch: recipes.lunch[(dayOfYear + 1) % recipes.lunch.length],
    dinner: recipes.dinner[(dayOfYear + 2) % recipes.dinner.length]
  }), [dayOfYear]);
};

// 获取时令水果
const getSeasonalFruit = () => seasonalFruits[new Date().getMonth() + 1];

// 格式化日期
const formatDate = () => new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });

// 餐食卡片组件
const MealCard = React.memo(({ type, recipe, onClick }) => {
  const colors = {
    breakfast: { bg: 'from-amber-400 to-orange-500', icon: '🌅', label: '早餐', accent: 'border-amber-500' },
    lunch: { bg: 'from-emerald-400 to-green-500', icon: '☀️', label: '午餐', accent: 'border-emerald-500' },
    dinner: { bg: 'from-indigo-400 to-purple-500', icon: '🌙', label: '晚餐', accent: 'border-indigo-500' }
  };
  const c = colors[type];

  return (
    <div 
      onClick={onClick} 
      className={`meal-card bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${c.accent} border-t-4`}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick()}
      aria-label={`查看${c.label}${recipe.name}详情`}
    >
      <div className={`bg-gradient-to-r ${c.bg} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{c.icon} {c.label}</h3>
            <p className="text-sm opacity-90 mt-1">点击查看详情</p>
          </div>
          <span className="text-5xl">{c.icon}</span>
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-xl font-bold text-gray-800 mb-3">{recipe.name}</h4>
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="flex items-center text-orange-600">
            <span className="mr-1">🔥</span> {recipe.calories}大卡
          </span>
          <span className="flex items-center text-blue-600">
            <span className="mr-1">⏱️</span> {recipe.time}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

// 详情弹窗组件
const Modal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" role="dialog" aria-modal="true">
      <div 
        onClick={e => e.stopPropagation()} 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
      >
        <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-indigo-500 p-8 text-white">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="关闭"
          >
            ✕
          </button>
          <h2 className="text-3xl font-bold">{recipe.name}</h2>
          <div className="flex items-center gap-6 mt-4 text-sm">
            <span className="flex items-center">
              <span className="mr-2 text-xl">🔥</span> {recipe.calories}大卡
            </span>
            <span className="flex items-center">
              <span className="mr-2 text-xl">⏱️</span> {recipe.time}
            </span>
          </div>
        </div>
        
        <div className="p-8">
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
              <span className="mr-3 text-2xl">🛒</span> 食材准备
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
              <span className="mr-3 text-2xl">👨‍🍳</span> 烹饪步骤
            </h3>
            <ol className="space-y-4">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-full text-sm font-bold flex items-center justify-center mr-4 shadow-lg">
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

// 主应用组件
function App() {
  const [recipes, setRecipes] = useState(null);
  const [fruit, setFruit] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    setRecipes(getDailyRecipes());
    setFruit(getSeasonalFruit());
  }, []);

  const handleMealClick = useCallback((meal) => setSelectedMeal(meal), []);
  const handleCloseModal = useCallback(() => setSelectedMeal(null), []);

  if (!recipes || !fruit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-7xl mb-6 animate-bounce">🍽️</div>
          <div className="text-2xl font-light">正在准备今日食谱...</div>
          <div className="mt-4 w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  const totalCalories = recipes.breakfast.calories + recipes.lunch.calories + recipes.dinner.calories;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-purple-600 pb-16">
      {/* 头部 */}
      <header className="bg-white/10 backdrop-blur-lg shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">🍽️ 时令健康食谱</h1>
              <p className="text-white/90 text-lg">{formatDate()}</p>
            </div>
            <div className={`px-6 py-3 bg-gradient-to-r ${fruit.color} rounded-full text-white text-base font-semibold shadow-lg animate-float`}>
              {fruit.emoji} 时令：{fruit.name}
            </div>
          </div>
        </div>
      </header>

      {/* 营养总览 */}
      <section className="max-w-6xl mx-auto px-6 mt-8">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📊 今日营养总览</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
              <div className="text-4xl font-bold text-orange-600 mb-2">{totalCalories}</div>
              <div className="text-sm text-gray-600">总热量 (大卡)</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
              <div className="text-sm text-gray-600">营养餐食</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-4xl font-bold text-green-600 mb-2">均衡</div>
              <div className="text-sm text-gray-600">营养搭配</div>
            </div>
          </div>
        </div>
      </section>

      {/* 三餐卡片 */}
      <section className="max-w-6xl mx-auto px-6 mt-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">🍴 今日三餐</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <MealCard type="breakfast" recipe={recipes.breakfast} onClick={() => handleMealClick(recipes.breakfast)} />
          <MealCard type="lunch" recipe={recipes.lunch} onClick={() => handleMealClick(recipes.lunch)} />
          <MealCard type="dinner" recipe={recipes.dinner} onClick={() => handleMealClick(recipes.dinner)} />
        </div>
      </section>

      {/* 弹窗 */}
      {selectedMeal && <Modal recipe={selectedMeal} onClose={handleCloseModal} />}

      {/* 页脚 */}
      <footer className="max-w-6xl mx-auto px-6 mt-16 text-center text-white/80 text-lg">
        <p>🌟 每日更新时令健康食谱，让健康成为一种习惯</p>
      </footer>
    </div>
  );
}

// 渲染
const root = createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
