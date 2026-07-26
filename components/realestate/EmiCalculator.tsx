'use client';

import React, { useState } from 'react';
import { Calculator, IndianRupee, PieChart, Calendar, Percent } from 'lucide-react';

interface EmiCalculatorProps {
  lang: 'en' | 'mr';
}

export default function EmiCalculator({ lang }: EmiCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // 50 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% default
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years default

  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / (12 * 100);
  const tenureMonths = tenureYears * 12;

  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatRupees = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="emi-calculator" className="my-16 max-w-5xl mx-auto px-4">
      <div className="bg-slate-900/60 border border-emerald-500/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Title */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold">
            <Calculator size={20} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'mr' ? 'होम लोन EMI कॅल्क्युलेटर' : 'Interactive Home Loan EMI Calculator'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'mr' ? 'तुमच्या मासिक हप्त्याचा आणि व्याजाचा अंदाज लावा' : 'Calculate your estimated monthly installment & total interest'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders Input Side */}
          <div className="lg:col-span-7 space-y-6">
            {/* Loan Amount Slider */}
            <div>
              <div className="flex justify-between items-center mb-2 text-xs font-semibold">
                <span className="text-slate-300 flex items-center gap-1">
                  <IndianRupee size={14} className="text-emerald-400" />
                  {lang === 'mr' ? 'कर्ज रक्कम (Loan Amount)' : 'Loan Amount'}
                </span>
                <span className="text-emerald-400 font-bold text-sm bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  {formatRupees(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={50000000}
                step={500000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>₹10 Lakhs</span>
                <span>₹5 Crores</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className="flex justify-between items-center mb-2 text-xs font-semibold">
                <span className="text-slate-300 flex items-center gap-1">
                  <Percent size={14} className="text-amber-400" />
                  {lang === 'mr' ? 'व्याजदर (Interest Rate % p.a.)' : 'Interest Rate (% p.a.)'}
                </span>
                <span className="text-amber-400 font-bold text-sm bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min={6.5}
                max={14.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>6.5%</span>
                <span>14.0%</span>
              </div>
            </div>

            {/* Loan Tenure Slider */}
            <div>
              <div className="flex justify-between items-center mb-2 text-xs font-semibold">
                <span className="text-slate-300 flex items-center gap-1">
                  <Calendar size={14} className="text-emerald-400" />
                  {lang === 'mr' ? 'कालावधी (Tenure in Years)' : 'Tenure (Years)'}
                </span>
                <span className="text-emerald-400 font-bold text-sm bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  {tenureYears} {lang === 'mr' ? 'वर्षे' : 'Years'}
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>3 Years</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-6 space-y-4 text-center">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                {lang === 'mr' ? 'अंदाजे मासिक हप्ता (Monthly EMI)' : 'Estimated Monthly EMI'}
              </p>
              <h3 className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                {formatRupees(emi)}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <p className="text-[11px] text-slate-400 mb-0.5">{lang === 'mr' ? 'एकूण व्याज' : 'Total Interest'}</p>
                <p className="font-bold text-amber-300">{formatRupees(totalInterest)}</p>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <p className="text-[11px] text-slate-400 mb-0.5">{lang === 'mr' ? 'एकूण देय रक्कम' : 'Total Payable'}</p>
                <p className="font-bold text-slate-200">{formatRupees(totalPayment)}</p>
              </div>
            </div>

            <p className="text-[10px] text-slate-500">
              *Calculated based on standard reducing balance home loan interest calculations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
