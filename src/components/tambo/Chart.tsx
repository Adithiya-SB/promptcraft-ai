import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartProps {
    title?: string;
    chartType: 'line' | 'bar' | 'area';
    data: any[];
}

export const Chart: React.FC<ChartProps> = ({ title, chartType, data }) => {
    const renderChart = () => {
        const commonProps = {
            data,
            margin: { top: 5, right: 30, left: 20, bottom: 5 },
        };

        switch (chartType) {
            case 'line':
                return (
                    <LineChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                        <XAxis dataKey="name" className="text-slate-600 dark:text-slate-400" />
                        <YAxis className="text-slate-600 dark:text-slate-400" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} />
                        <Line type="monotone" dataKey="value2" stroke="#a855f7" strokeWidth={2} />
                    </LineChart>
                );

            case 'bar':
                return (
                    <BarChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                        <XAxis dataKey="name" className="text-slate-600 dark:text-slate-400" />
                        <YAxis className="text-slate-600 dark:text-slate-400" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <Legend />
                        <Bar dataKey="value" fill="#0ea5e9" />
                        <Bar dataKey="value2" fill="#a855f7" />
                    </BarChart>
                );

            case 'area':
                return (
                    <AreaChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                        <XAxis dataKey="name" className="text-slate-600 dark:text-slate-400" />
                        <YAxis className="text-slate-600 dark:text-slate-400" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="value" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="value2" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
                    </AreaChart>
                );
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 smooth-shadow-lg"
        >
            {title && (
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {title}
                </h3>
            )}
            <ResponsiveContainer width="100%" height={300}>
                {renderChart()}
            </ResponsiveContainer>
        </motion.div>
    );
};
