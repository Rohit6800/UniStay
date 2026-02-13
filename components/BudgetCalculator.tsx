
import React, { useState } from 'react';
import { Wallet, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const BudgetCalculator: React.FC = () => {
  const [income, setIncome] = useState<number>(15000);
  const [expenses, setExpenses] = useState<number>(5000);

  const surplus = Math.max(0, income - expenses);
  const suggestedRent = Math.floor(surplus * 0.4); // Suggest 40% of surplus
  
  const data = [
    { name: 'Living Expenses', value: expenses, color: '#f43f5e' },
    { name: 'Suggested Rent', value: suggestedRent, color: '#3b82f6' },
    { name: 'Savings/Other', value: Math.max(0, surplus - suggestedRent), color: '#10b981' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Wallet className="text-blue-600" />
        <h2 className="text-xl font-bold text-slate-800">Affordability Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Monthly Budget (Pocket Money/Income)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400">₹</span>
              <input 
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Essential Expenses (Food, Travel, etc.)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400">₹</span>
              <input 
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-sm text-blue-700 mb-1 flex items-center gap-1 font-medium">
              <Info size={14} /> Recommended Rent Range
            </p>
            <p className="text-2xl font-bold text-blue-800">
              ₹{(suggestedRent * 0.8).toFixed(0)} - ₹{(suggestedRent * 1.2).toFixed(0)}
            </p>
            <p className="text-xs text-blue-600 mt-2">Based on a healthy 40% allocation of your post-expense surplus.</p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 text-xs font-medium text-slate-500">
            {data.map((d, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;
