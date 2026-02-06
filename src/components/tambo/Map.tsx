import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface MapProps {
    title?: string;
    markers?: Array<{ lat: number; lng: number; label: string }>;
}

export const Map: React.FC<MapProps> = ({ title, markers = [] }) => {
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

            <div className="relative w-full h-64 bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden">
                {/* Placeholder map - in production, integrate with Google Maps or Mapbox */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <MapPin className="w-12 h-12 text-primary-500 mx-auto mb-2" />
                        <p className="text-slate-600 dark:text-slate-400">Map View</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                            {markers.length} markers
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
