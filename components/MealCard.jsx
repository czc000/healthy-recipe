import React from 'react';

export const MealCard = ({ type, recipe, fruit, emoji }) => {
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
      {/* 头部 */}
      <div className={`bg-gradient-to-r ${typeColors[type]} rounded-xl p-4 mb-4 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{typeNames[type]}</h3>
            <p className="text-sm opacity-90">{typeTimes[type]}</p>
          </div>
          <div className="text-4xl">{emoji}</div>
        </div>
      </div>

      {/* 菜名 */}
      <h4 className="text-xl font-bold text-gray-800 mb-3">{recipe.name}</h4>

      {/* 营养标签 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {recipe.tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>

      {/* 营养信息 */}
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

      {/* 食材 */}
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

      {/* 步骤 */}
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

      {/* 时间 */}
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
