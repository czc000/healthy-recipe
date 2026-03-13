import React, { useState, useEffect } from 'react';

// 时令水果数据（按月）
const seasonalFruits = {
  1: { name: '柑橘', emoji: '🍊', color: 'from-orange-400 to-orange-500', benefits: '富含维生素 C，增强免疫力' },
  2: { name: '草莓', emoji: '🍓', color: 'from-pink-400 to-red-500', benefits: '抗氧化，美容养颜' },
  3: { name: '菠萝', emoji: '🍍', color: 'from-yellow-400 to-orange-400', benefits: '帮助消化，清热解暑' },
  4: { name: '芒果', emoji: '🥭', color: 'from-yellow-500 to-orange-500', benefits: '富含维生素 A，保护视力' },
  5: { name: '樱桃', emoji: '🍒', color: 'from-red-500 to-red-700', benefits: '补血益气，美容养颜' },
  6: { name: '西瓜', emoji: '🍉', color: 'from-green-500 to-green-700', benefits: '清热解暑，补充水分' },
  7: { name: '葡萄', emoji: '🍇', color: 'from-purple-500 to-purple-700', benefits: '抗氧化，保护心血管' },
  8: { name: '桃子', emoji: '🍑', color: 'from-pink-300 to-pink-500', benefits: '润肺止咳，美容养颜' },
  9: { name: '梨', emoji: '🍐', color: 'from-green-300 to-green-500', benefits: '润肺止咳，清热化痰' },
  10: { name: '苹果', emoji: '🍎', color: 'from-red-400 to-red-600', benefits: '增强记忆，降低胆固醇' },
  11: { name: '柿子', emoji: '🟠', color: 'from-orange-500 to-red-500', benefits: '润肺生津，清热止血' },
  12: { name: '柚子', emoji: '🍊', color: 'from-yellow-400 to-orange-400', benefits: '降血糖，美容养颜' }
};

// 健康食谱数据库
const healthyRecipes = {
  breakfast: [
    {
      name: '燕麦水果粥',
      ingredients: ['燕麦片 50g', '时令水果 100g', '牛奶 200ml', '蜂蜜 1 勺', '坚果 15g'],
      steps: ['燕麦片加入牛奶煮熟', '加入切好的时令水果', '淋上蜂蜜，撒上坚果'],
      calories: 350,
      protein: 12,
      carbs: 55,
      fat: 8,
      time: '10 分钟',
      tags: ['低脂', '高纤维', '快手']
    },
    {
      name: '全麦三明治',
      ingredients: ['全麦面包 2 片', '鸡蛋 1 个', '生菜 2 片', '番茄 1 个', '时令水果 100g'],
      steps: ['鸡蛋煎熟', '面包烤至微黄', '依次放入生菜、番茄、鸡蛋', '搭配时令水果'],
      calories: 380,
      protein: 18,
      carbs: 45,
      fat: 12,
      time: '15 分钟',
      tags: ['高蛋白', '均衡营养']
    },
    {
      name: '酸奶水果碗',
      ingredients: ['希腊酸奶 200g', '时令水果 150g', '格兰诺拉麦片 30g', '奇亚籽 1 勺'],
      steps: ['酸奶倒入碗中', '加入切好的时令水果', '撒上麦片和奇亚籽'],
      calories: 320,
      protein: 15,
      carbs: 42,
      fat: 10,
      time: '5 分钟',
      tags: ['益生菌', '抗氧化']
    }
  ],
  lunch: [
    {
      name: '藜麦蔬菜沙拉',
      ingredients: ['藜麦 80g', '鸡胸肉 100g', '混合蔬菜 150g', '时令水果 100g', '橄榄油 1 勺'],
      steps: ['藜麦煮熟晾凉', '鸡胸肉煎熟切块', '混合蔬菜铺底', '放入藜麦和鸡肉', '淋上橄榄油'],
      calories: 450,
      protein: 35,
      carbs: 48,
      fat: 12,
      time: '25 分钟',
      tags: ['低 GI', '高蛋白', '减脂']
    },
    {
      name: '清蒸鱼配时蔬',
      ingredients: ['鲈鱼 150g', '西兰花 100g', '胡萝卜 50g', '姜葱适量', '时令水果 100g'],
      steps: ['鱼处理干净', '放上姜葱蒸 10 分钟', '蔬菜焯水', '淋上蒸鱼豉油'],
      calories: 380,
      protein: 32,
      carbs: 25,
      fat: 15,
      time: '30 分钟',
      tags: ['低脂', '高蛋白', 'Omega-3']
    },
    {
      name: '糙米蔬菜炒饭',
      ingredients: ['糙米饭 150g', '鸡蛋 1 个', '混合蔬菜 150g', '虾仁 50g', '时令水果 100g'],
      steps: ['糙米饭提前煮好', '鸡蛋炒散', '加入蔬菜和虾仁翻炒', '放入米饭炒匀'],
      calories: 420,
      protein: 25,
      carbs: 55,
      fat: 10,
      time: '20 分钟',
      tags: ['高纤维', '均衡营养']
    }
  ],
  dinner: [
    {
      name: '烤蔬菜配豆腐',
      ingredients: ['嫩豆腐 150g', '混合蔬菜 200g', '橄榄油 1 勺', '香草适量', '时令水果 100g'],
      steps: ['豆腐切块', '蔬菜切块', '放入烤箱 200 度烤 20 分钟', '撒上香草'],
      calories: 320,
      protein: 18,
      carbs: 28,
      fat: 15,
      time: '30 分钟',
      tags: ['素食', '低卡', '高纤维']
    },
    {
      name: '番茄鸡蛋汤面',
      ingredients: ['全麦面条 60g', '番茄 2 个', '鸡蛋 1 个', '青菜 50g', '时令水果 100g'],
      steps: ['番茄炒出汁', '加水煮开', '下面条', '打入蛋花', '放入青菜'],
      calories: 350,
      protein: 16,
      carbs: 52,
      fat: 10,
      time: '20 分钟',
      tags: ['暖胃', '易消化']
    },
    {
      name: '蒸蛋配时蔬',
      ingredients: ['鸡蛋 2 个', '西兰花 100g', '胡萝卜 50g', '虾仁 50g', '时令水果 100g'],
      steps: ['鸡蛋打散加温水', '放入虾仁蒸 8 分钟', '蔬菜焯水', '淋上生抽'],
      calories: 300,
      protein: 22,
      carbs: 18,
      fat: 12,
      time: '25 分钟',
      tags: ['低卡', '高蛋白', '易消化']
    }
  ]
};

// 获取当前月份
function getCurrentMonth() {
  return new Date().getMonth() + 1;
}

// 获取时令水果
function getSeasonalFruit() {
  const month = getCurrentMonth();
  return seasonalFruits[month];
}

// 获取今日食谱
function getDailyRecipes() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  
  const breakfastIndex = dayOfYear % healthyRecipes.breakfast.length;
  const lunchIndex = (dayOfYear + 1) % healthyRecipes.lunch.length;
  const dinnerIndex = (dayOfYear + 2) % healthyRecipes.dinner.length;
  
  return {
    breakfast: healthyRecipes.breakfast[breakfastIndex],
    lunch: healthyRecipes.lunch[lunchIndex],
    dinner: healthyRecipes.dinner[dinnerIndex]
  };
}

// 计算总营养
function calculateTotalNutrition(recipes) {
  return {
    calories: recipes.breakfast.calories + recipes.lunch.calories + recipes.dinner.calories,
    protein: recipes.breakfast.protein + recipes.lunch.protein + recipes.dinner.protein,
    carbs: recipes.breakfast.carbs + recipes.lunch.carbs + recipes.dinner.carbs,
    fat: recipes.breakfast.fat + recipes.lunch.fat + recipes.dinner.fat
  };
}

// 格式化日期
function formatDate(date = new Date()) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  return date.toLocaleDateString('zh-CN', options);
}

// 餐食卡片组件
const MealCard = ({ type, recipe, fruit, emoji }) => {
  const typeColors = {
    breakfast: 'from-yellow-400 to-orange-400',
    lunch: 'from-green-400 to-emerald-500',
    dinner: 'from-purple-400 to-indigo-500'
  };

  const typeNames = {
    breakfast: '早餐',
    lunch: '午餐',
    dinner: '晚餐'
  };

  const typeTimes = {
    breakfast: '07:00 - 09:00',
    lunch: '12:00 - 13:00',
    dinner: '18:00 - 19:00'
  };

  return (
    <div className="meal-card card-gradient rounded-2xl p-6 shadow-xl">
      <div className={`bg-gradient-to-r ${typeColors[type]} rounded-xl p-4 mb-4 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{typeNames[type]}</h3>
            <p className="text-sm opacity-90">{typeTimes[type]}</p>
          </div>
          <div className="text-4xl">{emoji}</div>
        </div>
      </div>

      <h4 className="text-xl font-bold text-gray-800 mb-3">{recipe.name}</h4>

      <div className="flex flex-wrap gap-2 mb-4">
        {recipe.tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="text-center p-2 bg-red-50 rounded-lg">
          <div className="text-lg font-bold text-red-600">{recipe.calories}</div>
          <div className="text-xs text-gray-500">大卡</div>
        </div>
        <div className="text-center p-2 bg-blue-50 rounded-lg">
          <div className="text-lg font-bold text-blue-600">{recipe.protein}g</div>
          <div className="text-xs text-gray-500">蛋白质</div>
        </div>
        <div className="text-center p-2 bg-yellow-50 rounded-lg">
          <div className="text-lg font-bold text-yellow-600">{recipe.carbs}g</div>
          <div className="text-xs text-gray-500">碳水</div>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded-lg">
          <div className="text-lg font-bold text-purple-600">{recipe.fat}g</div>
          <div className="text-xs text-gray-500">脂肪</div>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
          <span className="mr-2">🛒</span>食材
        </h5>
        <ul className="grid grid-cols-2 gap-1 text-sm text-gray-600">
          {recipe.ingredients.map((item, i) => (
            <li key={i} className="flex items-center">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
          <span className="mr-2">👨‍🍳</span>做法
        </h5>
        <ol className="space-y-1 text-sm text-gray-600">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex">
              <span className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-xs flex items-center justify-center mr-2">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <span className="mr-1">⏱️</span>
            {recipe.time}
          </span>
          {fruit && (
            <span className="flex items-center text-green-600">
              <span className="mr-1">🍎</span>
              搭配{fruit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// 主应用组件
export default function App() {
  const [recipes, setRecipes] = useState(null);
  const [fruit, setFruit] = useState(null);
  const [totalNutrition, setTotalNutrition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRefresh, setShowRefresh] = useState(false);

  useEffect(() => {
    loadDailyRecipes();
  }, []);

  const loadDailyRecipes = () => {
    setLoading(true);
    setTimeout(() => {
      const dailyRecipes = getDailyRecipes();
      const seasonalFruit = getSeasonalFruit();
      const nutrition = calculateTotalNutrition(dailyRecipes);
      
      setRecipes(dailyRecipes);
      setFruit(seasonalFruit);
      setTotalNutrition(nutrition);
      setLoading(false);
    }, 800);
  };

  const handleRefresh = () => {
    setShowRefresh(true);
    setTimeout(() => {
      loadDailyRecipes();
      setShowRefresh(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4 pulse-animation">🍽️</div>
          <div className="text-2xl font-light">正在准备今日食谱...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg pb-12">
      <header className="bg-white/10 backdrop-blur-sm shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                🍽️ 时令健康食谱
              </h1>
              <p className="text-white/80 text-sm md:text-base">
                📅 {formatDate()}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className={`px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white font-medium transition-all duration-300 transform ${showRefresh ? 'rotate-180' : ''}`}
            >
              🔄 换一换
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className={`fruit-badge bg-gradient-to-r ${fruit.color} rounded-2xl p-6 shadow-2xl text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90 mb-1">🍂 本月时令水果</div>
              <div className="text-3xl font-bold mb-2">{fruit.emoji} {fruit.name}</div>
              <div className="text-sm opacity-90">💡 {fruit.benefits}</div>
            </div>
            <div className="text-7xl opacity-50">{fruit.emoji}</div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="card-gradient rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📊</span>今日营养总览
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
              <div className="text-3xl font-bold text-red-600 mb-1">{totalNutrition.calories}</div>
              <div className="text-sm text-gray-600">总热量 (大卡)</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-1">{totalNutrition.protein}g</div>
              <div className="text-sm text-gray-600">蛋白质</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
              <div className="text-3xl font-bold text-yellow-600 mb-1">{totalNutrition.carbs}g</div>
              <div className="text-sm text-gray-600">碳水化合物</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-1">{totalNutrition.fat}g</div>
              <div className="text-sm text-gray-600">脂肪</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid md:grid-cols-3 gap-6">
          {recipes && (
            <>
              <MealCard type="breakfast" recipe={recipes.breakfast} fruit={fruit.name} emoji="🌅" />
              <MealCard type="lunch" recipe={recipes.lunch} fruit={fruit.name} emoji="☀️" />
              <MealCard type="dinner" recipe={recipes.dinner} fruit={fruit.name} emoji="🌙" />
            </>
          )}
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-4 mt-12 text-center text-white/60 text-sm">
        <p>🌟 每日更新时令健康食谱，让健康成为一种习惯</p>
        <p className="mt-2">Made with ❤️ for healthy living</p>
      </footer>
    </div>
  );
}
