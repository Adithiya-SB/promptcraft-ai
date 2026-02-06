import React from 'react';
import { motion } from 'framer-motion';

interface TableProps {
    title?: string;
    columns: string[];
    data: Record<string, any>[];
    searchable?: boolean;
    sortable?: boolean;
}

export const Table: React.FC<TableProps> = ({
    title,
    columns,
    data,
    searchable,
    sortable,
}) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [sortColumn, setSortColumn] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

    const filteredData = React.useMemo(() => {
        if (!searchTerm) return data;
        return data.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [data, searchTerm]);

    const sortedData = React.useMemo(() => {
        if (!sortColumn) return filteredData;
        return [...filteredData].sort((a, b) => {
            const aVal = a[sortColumn];
            const bVal = b[sortColumn];
            const modifier = sortDirection === 'asc' ? 1 : -1;
            return aVal > bVal ? modifier : -modifier;
        });
    }, [filteredData, sortColumn, sortDirection]);

    const handleSort = (column: string) => {
        if (!sortable) return;
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
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

            {searchable && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                            {columns.map((column) => (
                                <th
                                    key={column}
                                    onClick={() => handleSort(column.toLowerCase())}
                                    className={`px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 ${sortable ? 'cursor-pointer hover:text-primary-500' : ''
                                        }`}
                                >
                                    {column}
                                    {sortColumn === column.toLowerCase() && (
                                        <span className="ml-2">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, idx) => (
                            <motion.tr
                                key={idx}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column}
                                        className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400"
                                    >
                                        {row[column.toLowerCase()]}
                                    </td>
                                ))}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};
