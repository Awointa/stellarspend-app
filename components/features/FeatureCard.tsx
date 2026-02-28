'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  index: number;
}

export default function FeatureCard({
  title,
  description,
  imageSrc,
  imageAlt,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-[#e8b84b]/30 transition-all duration-300">
        {/* Feature Image */}
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-[#e8b84b]/10 to-[#4aa9e8]/10">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFhMWEyZSIvPjwvc3ZnPg=="
          />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-[#7a8aaa] text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
