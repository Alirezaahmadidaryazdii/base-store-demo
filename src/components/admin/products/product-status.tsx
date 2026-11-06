"use client";

interface ProductStatusProps {
  isActive: boolean;
  onChange: (value: boolean) => void;
}

export function ProductStatus({
  isActive,
  onChange,
}: ProductStatusProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!isActive)}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition ${
        isActive
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isActive ? "bg-green-600" : "bg-gray-400"
        }`}
      />
      {isActive ? "فعال" : "غیرفعال"}
    </button>
  );
}