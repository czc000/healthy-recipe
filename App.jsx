import React, { useState, useEffect } from 'react';
import { getSeasonalFruit, getDailyRecipes, calculateTotalNutrition, formatDate } from '../utils/recipeData.js';
import { MealCard } from './MealCard.jsx';

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
      {/* 头部 */}
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

      {/* 时令水果卡片 */}
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

      {/* 总营养概览 */}
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
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">✅</span>
              营养均衡，符合健康饮食标准
            </div>
          </div>
        </div>
      </section>

      {/* 三餐卡片 */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid md:grid-cols-3 gap-6">
          {recipes && (
            <>
              <MealCard
                type="breakfast"
                recipe={recipes.breakfast}
                fruit={fruit.name}
                emoji="🌅"
              />
              <MealCard
                type="lunch"
                recipe={recipes.lunch}
                fruit={fruit.name}
                emoji="☀️"
              />
              <MealCard
                type="dinner"
                recipe={recipes.dinner}
                fruit={fruit.name}
                emoji="🌙"
              />
            </>
          )}
        </div>
      </section>

      {/* 健康提示 */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="card-gradient rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">💡</span>健康小贴士
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">💧</div>
              <div>
                <div className="font-semibold text-gray-700">多喝水</div>
                <div className="text-sm text-gray-600">每天 1500-2000ml，促进新陈代谢</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🚶</div>
              <div>
                <div className="font-semibold text-gray-700">适量运动</div>
                <div className="text-sm text-gray-600">每天 30 分钟，保持活力</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">😴</div>
              <div>
                <div className="font-semibold text-gray-700">充足睡眠</div>
                <div className="text-sm text-gray-600">每晚 7-8 小时，恢复体力</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="max-w-6xl mx-auto px-4 mt-12 text-center text-white/60 text-sm">
        <p>🌟 每日更新时令健康食谱，让健康成为一种习惯</p>
        <p className="mt-2">Made with ❤️ for healthy living</p>
      </footer>
    </div>
  );
}
