
import type { User, RegisterData, LoginData } from "@/types/user";

const USERS_KEY = "parna-users";
const CURRENT_USER_KEY = "parna-current-user";

interface StoredUser extends User {
  password: string;
}

const getUsers = (): StoredUser[] => {
  if (typeof window === "undefined") return [];

  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const removePassword = (user: StoredUser): User => {
  const { password, ...safeUser } = user;
  return safeUser;
};

export const authService = {
  register: (data: RegisterData): User => {
    const users = getUsers();

    const email = data.email.trim().toLowerCase();

    const exists = users.some((user) => user.email === email);

    if (exists) {
      throw new Error("این ایمیل قبلاً ثبت‌نام کرده است.");
    }

    const user: StoredUser = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email,
      role: "customer",
      isActive: true,
      createdAt: new Date().toISOString(),
      password: data.password,
    };

    saveUsers([...users, user]);

    const safeUser = removePassword(user);

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

    return safeUser;
  },

  login: (data: LoginData): User => {
    const users = getUsers();

    const user = users.find(
      (item) =>
        item.email === data.email.trim().toLowerCase() &&
        item.password === data.password
    );

    if (!user) {
      throw new Error("ایمیل یا رمز عبور اشتباه است.");
    }

    if (user.isActive === false) {
      throw new Error("حساب کاربری شما غیرفعال شده است.");
    }

    const safeUser = removePassword(user);

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

    return safeUser;
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;

    try {
      const user = localStorage.getItem(CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  updateProfile: (
    userId: string,
    data: { name: string; email: string }
  ): User => {
    const users = getUsers();

    const email = data.email.trim().toLowerCase();

    const emailExists = users.some(
      (user) => user.id !== userId && user.email === email
    );

    if (emailExists) {
      throw new Error("این ایمیل قبلاً استفاده شده است.");
    }

    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            name: data.name.trim(),
            email,
          }
        : user
    );

    const updatedUser = updatedUsers.find((user) => user.id === userId);

    if (!updatedUser) {
      throw new Error("کاربر پیدا نشد.");
    }

    saveUsers(updatedUsers);

    const safeUser = removePassword(updatedUser);

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

    return safeUser;
  },
};
