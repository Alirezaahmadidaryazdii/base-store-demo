
import type { User, UserRole } from "@/types/user";
import type { Order } from "@/types/order";

const USERS_KEY = "parna-users";
const ORDERS_KEY = "parna-admin-orders";

interface StoredUser extends User {
  password?: string;
}

export interface AdminUser extends User {
  isActive: boolean;
  orderCount: number;
  totalPurchase: number;
}

export interface CreateUserData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

export interface UpdateUserData {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
}

const getStoredUsers = (): StoredUser[] => {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const getStoredOrders = (): Order[] => {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getUserStats = (user: StoredUser, orders: Order[]) => {
  const userOrders = orders.filter(
    (order) =>
      order.customer.email?.toLowerCase() === user.email.toLowerCase()
  );

  return {
    orderCount: userOrders.length,
    totalPurchase: userOrders.reduce(
      (total, order) => total + order.total,
      0
    ),
  };
};

const toAdminUser = (
  user: StoredUser,
  orders: Order[]
): AdminUser => {
  const { password, ...safeUser } = user;

  return {
    ...safeUser,
    isActive: user.isActive ?? true,
    ...getUserStats(user, orders),
  };
};

export const userService = {
  getAll: (): AdminUser[] => {
    const users = getStoredUsers();
    const orders = getStoredOrders();

    return users.map((user) => toAdminUser(user, orders));
  },

  getById: (userId: string): AdminUser | null => {
    return userService.getAll().find((user) => user.id === userId) ?? null;
  },

  create: (data: CreateUserData): AdminUser => {
    const users = getStoredUsers();

    const email = data.email.trim().toLowerCase();

    if (users.some((user) => user.email.toLowerCase() === email)) {
      throw new Error("این ایمیل قبلاً ثبت شده است.");
    }

    const user: StoredUser = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email,
      phone: data.phone?.trim() || undefined,
      password: data.password,
      role: data.role,
      isActive: data.isActive,
      createdAt: new Date().toISOString(),
    };

    saveUsers([...users, user]);

    return toAdminUser(user, getStoredOrders());
  },

  update: (userId: string, data: UpdateUserData): AdminUser => {
    const users = getStoredUsers();

    const email = data.email.trim().toLowerCase();

    const emailExists = users.some(
      (user) => user.id !== userId && user.email.toLowerCase() === email
    );

    if (emailExists) {
      throw new Error("این ایمیل قبلاً برای کاربر دیگری ثبت شده است.");
    }

    const index = users.findIndex((user) => user.id === userId);

    if (index === -1) {
      throw new Error("کاربر پیدا نشد.");
    }

    const updatedUser: StoredUser = {
      ...users[index],
      name: data.name.trim(),
      email,
      phone: data.phone?.trim() || undefined,
      role: data.role,
      isActive: data.isActive,
    };

    const updatedUsers = [...users];
    updatedUsers[index] = updatedUser;

    saveUsers(updatedUsers);

    return toAdminUser(updatedUser, getStoredOrders());
  },

  delete: (userId: string): void => {
    const users = getStoredUsers();
    const user = users.find((item) => item.id === userId);

    if (!user) {
      throw new Error("کاربر پیدا نشد.");
    }

    if (user.role === "admin") {
      const activeAdmins = users.filter(
        (item) => item.role === "admin" && item.isActive !== false
      );

      if (user.isActive !== false && activeAdmins.length <= 1) {
        throw new Error("آخرین مدیر فعال سیستم قابل حذف نیست.");
      }
    }

    saveUsers(users.filter((item) => item.id !== userId));

    const currentUser = localStorage.getItem("parna-current-user");

    if (currentUser) {
      try {
        const parsedUser: User = JSON.parse(currentUser);

        if (parsedUser.id === userId) {
          localStorage.removeItem("parna-current-user");
        }
      } catch {
        localStorage.removeItem("parna-current-user");
      }
    }
  },

  updateStatus: (userId: string, isActive: boolean): void => {
    const users = getStoredUsers();
    const user = users.find((item) => item.id === userId);

    if (!user) {
      throw new Error("کاربر پیدا نشد.");
    }

    if (user.role === "admin" && !isActive) {
      const activeAdmins = users.filter(
        (item) => item.role === "admin" && item.isActive !== false
      );

      if (activeAdmins.length <= 1) {
        throw new Error("آخرین مدیر فعال سیستم قابل غیرفعال شدن نیست.");
      }
    }

    saveUsers(
      users.map((item) =>
        item.id === userId ? { ...item, isActive } : item
      )
    );
  },

  updateRole: (userId: string, role: UserRole): void => {
    const users = getStoredUsers();
    const user = users.find((item) => item.id === userId);

    if (!user) {
      throw new Error("کاربر پیدا نشد.");
    }

    if (user.role === "admin" && role === "customer") {
      const activeAdmins = users.filter(
        (item) => item.role === "admin" && item.isActive !== false
      );

      if (user.isActive !== false && activeAdmins.length <= 1) {
        throw new Error("نقش آخرین مدیر فعال سیستم قابل تغییر نیست.");
      }
    }

    saveUsers(
      users.map((item) =>
        item.id === userId ? { ...item, role } : item
      )
    );
  },

  getOrders: (userId: string): Order[] => {
    const user = getStoredUsers().find((item) => item.id === userId);

    if (!user) return [];

    return getStoredOrders().filter(
      (order) =>
        order.customer.email?.toLowerCase() === user.email.toLowerCase()
    );
  },
};
