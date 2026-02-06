import React from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

interface FormField {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    rows?: number;
    options?: string[];
}

interface FormProps {
    title?: string;
    fields: FormField[];
    submitText?: string;
    onSubmit?: (data: Record<string, any>) => void;
}

export const Form: React.FC<FormProps> = ({
    title,
    fields,
    submitText = 'Submit',
    onSubmit,
}) => {
    const [formData, setFormData] = React.useState<Record<string, any>>({});

    const handleChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        // Show simulated success message
        toast.success(`Form submitted successfully!`, {
            style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
            },
            icon: '🚀',
        });

        onSubmit?.(formData);
    };

    const renderField = (field: FormField) => {
        const baseClasses = "w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white";

        switch (field.type) {
            case 'textarea':
                return (
                    <textarea
                        name={field.name}
                        rows={field.rows || 3}
                        required={field.required}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className={baseClasses}
                    />
                );

            case 'select':
                return (
                    <select
                        name={field.name}
                        required={field.required}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className={baseClasses}
                    >
                        <option value="">Select...</option>
                        {field.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );

            default:
                return (
                    <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className={baseClasses}
                    />
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
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                    {title}
                </h3>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {renderField(field)}
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-lg linear-btn-primary text-white font-semibold hover:opacity-90 transition-opacity"
                >
                    {submitText}
                </button>
            </form>
        </motion.div>
    );
};
