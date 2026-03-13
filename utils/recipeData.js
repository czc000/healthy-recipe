// 时令水果数据（按月）
export const seasonalFruits = {
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
export const healthyRecipes = {
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
    },
    {
      name: '蔬菜鸡蛋饼',
      ingredients: ['鸡蛋 2 个', '菠菜 50g', '胡萝卜 30g', '全麦面粉 30g', '时令水果 100g'],
      steps: ['蔬菜切碎', '与鸡蛋、面粉混合', '平底锅煎至两面金黄', '搭配时令水果'],
      calories: 360,
      protein: 20,
      carbs: 35,
      fat: 14,
      time: '20 分钟',
      tags: ['高蛋白', '维生素丰富']
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
    },
    {
      name: '荞麦面配鸡丝',
      ingredients: ['荞麦面 80g', '鸡胸肉 100g', '黄瓜 50g', '胡萝卜 30g', '时令水果 100g'],
      steps: ['荞麦面煮熟过凉水', '鸡胸肉煮熟撕成丝', '蔬菜切丝', '调制酱汁拌匀'],
      calories: 400,
      protein: 30,
      carbs: 52,
      fat: 8,
      time: '25 分钟',
      tags: ['低 GI', '清爽']
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
    },
    {
      name: '杂粮粥配小菜',
      ingredients: ['杂粮米 50g', '红豆 20g', '小米 20g', '凉拌蔬菜 100g', '时令水果 100g'],
      steps: ['杂粮提前浸泡', '煮至软糯', '搭配凉拌蔬菜'],
      calories: 280,
      protein: 10,
      carbs: 55,
      fat: 4,
      time: '40 分钟',
      tags: ['养胃', '高纤维', '低脂']
    }
  ]
};

// 获取当前月份
export function getCurrentMonth() {
  return new Date().getMonth() + 1;
}

// 获取时令水果
export function getSeasonalFruit() {
  const month = getCurrentMonth();
  return seasonalFruits[month];
}

// 获取今日食谱（根据日期选择，保证每天不同）
export function getDailyRecipes() {
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
export function calculateTotalNutrition(recipes) {
  return {
    calories: recipes.breakfast.calories + recipes.lunch.calories + recipes.dinner.calories,
    protein: recipes.breakfast.protein + recipes.lunch.protein + recipes.dinner.protein,
    carbs: recipes.breakfast.carbs + recipes.lunch.carbs + recipes.dinner.carbs,
    fat: recipes.breakfast.fat + recipes.lunch.fat + recipes.dinner.fat
  };
}

// 格式化日期
export function formatDate(date = new Date()) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  return date.toLocaleDateString('zh-CN', options);
}
