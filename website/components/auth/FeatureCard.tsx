"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{
        y: -8,
        transition: {
            duration: 0.25,
        },
        }}
        className="group flex items-start gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-2xl">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-3xl transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          {description}
        </p>
      </div>
    </motion.div>
  );
}