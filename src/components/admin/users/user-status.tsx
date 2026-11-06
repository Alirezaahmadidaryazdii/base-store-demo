
interface UserStatusProps {
  isActive: boolean;
}

export function UserStatus({ isActive }: UserStatusProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
        isActive
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          isActive ? "bg-green-600" : "bg-red-600"
        }`}
      />
      {isActive ? "فعال" : "غیرفعال"}
    </span>
  );
}
