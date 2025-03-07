import { CheckIcon } from '@heroicons/react/24/outline';

interface FeatureListProps {
  features: string[];
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600/10">
            <CheckIcon className="h-4 w-4 text-red-600" />
          </div>
          <span className="text-neutral-400">{feature}</span>
        </li>
      ))}
    </ul>
  );
} 