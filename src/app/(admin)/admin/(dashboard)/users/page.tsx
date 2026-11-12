
"use client";

import { useEffect, useMemo, useState } from "react";
import { UserPlus, Users, ShieldCheck, UserRound, UserX, AlertCircle } from "lucide-react";

import type { Order } from "@/types/order";
import type {
  AdminUser,
  CreateUserData,
  UpdateUserData,
} from "@/services/user.service";

import { userService } from "@/services/user.service";
import { storeConfig } from "@/config/store.config";

import { UsersTable } from "@/components/admin/users/users-table";
import { UserFilters } from "@/components/admin/users/user-filters";
import { UserForm } from "@/components/admin/users/user-form";
import { UserDetailsModal } from "@/components/admin/users/user-details-modal";
import { Modal } from "@/components/ui/modal";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{title}</span>
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-2xl font-bold">
        {new Intl.NumberFormat(storeConfig.locale).format(value)}
      </p>

      <p className="mt-1 text-xs text-muted">{description}</p>
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");

  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);

  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const refreshUsers = () => {
    setUsers(userService.getAll());
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !normalizedSearch ||
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch) ||
        user.phone?.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        status === "all" ||
        (status === "active" && user.isActive) ||
        (status === "inactive" && !user.isActive);

      const matchesRole = role === "all" || user.role === role;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, search, status, role]);

  const activeUsers = users.filter((user) => user.isActive).length;
  const inactiveUsers = users.length - activeUsers;
  const admins = users.filter((user) => user.role === "admin").length;
  const customers = users.filter((user) => user.role === "customer").length;

  const openCreateForm = () => {
    setError("");
    setSuccess("");
    setEditingUser(null);
    setFormOpen(true);
  };

  const openEditForm = (user: AdminUser) => {
    setError("");
    setSuccess("");
    setSelectedUser(null);
    setEditingUser(user);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingUser(null);
  };

  const handleFormSubmit = (
    data: CreateUserData | UpdateUserData
  ) => {
    try {
      setError("");
      setSuccess("");

      if ("password" in data) {
        userService.create(data);
        setSuccess("کاربر جدید با موفقیت اضافه شد.");
      } else {
        if (
          editingUser?.role === "admin" &&
          editingUser.isActive &&
          (data.role !== "admin" || !data.isActive)
        ) {
          const activeAdmins = users.filter(
            (user) => user.role === "admin" && user.isActive
          );

          if (activeAdmins.length <= 1) {
            throw new Error(
              "آخرین مدیر فعال سیستم قابل غیرفعال شدن یا تغییر نقش نیست."
            );
          }
        }

        userService.update(editingUser!.id, data);
        setSuccess("اطلاعات کاربر با موفقیت ویرایش شد.");
      }

      refreshUsers();
      handleFormClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "عملیات با خطا مواجه شد."
      );
    }
  };

  const handleView = (user: AdminUser) => {
    setError("");
    setSelectedUser(user);
    setSelectedOrders(userService.getOrders(user.id));
  };

  const handleToggleStatus = (user: AdminUser) => {
    try {
      setError("");
      setSuccess("");

      userService.updateStatus(user.id, !user.isActive);
      refreshUsers();

      if (selectedUser?.id === user.id) {
        setSelectedUser(userService.getById(user.id));
      }

      setSuccess(
        user.isActive
          ? "حساب کاربر غیرفعال شد."
          : "حساب کاربر فعال شد."
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "تغییر وضعیت انجام نشد."
      );
    }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    try {
      setError("");
      setSuccess("");

      userService.delete(deleteTarget.id);

      if (selectedUser?.id === deleteTarget.id) {
        setSelectedUser(null);
        setSelectedOrders([]);
      }

      setDeleteTarget(null);
      refreshUsers();
      setSuccess("کاربر با موفقیت حذف شد.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "حذف کاربر انجام نشد."
      );
    }
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold">مدیریت کاربران</h1>
          <p className="mt-1 text-sm text-muted">
            مدیریت حساب‌ها، نقش‌ها و سوابق خرید کاربران فروشگاه
          </p>
        </div>

        
<div className="flex flex-wrap items-center justify-between gap-4">
  <div>
    <h1 className="text-xl font-bold sm:text-2xl">
      مدیریت کاربران
    </h1>
    <p className="mt-1 text-sm text-muted">
      مدیریت حساب‌ها، نقش‌ها و سوابق خرید کاربران فروشگاه
    </p>
  </div>

  <button
    type="button"
    onClick={openCreateForm}
    className="hidden h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-hover lg:inline-flex"
  >
    <UserPlus size={18} />
    افزودن کاربر
  </button>

  <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border/10 bg-background/95 p-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
    <button
      type="button"
      onClick={openCreateForm}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-hover active:scale-[0.98]"
    >
      <UserPlus size={19} />
      افزودن کاربر جدید
    </button>
  </div>
</div>

      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle size={18} />
          {error}
          <button
            type="button"
            onClick={() => setError("")}
            className="mr-auto text-xs underline"
          >
            بستن
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
          <button
            type="button"
            onClick={() => setSuccess("")}
            className="text-xs underline"
          >
            بستن
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="همه کاربران"
          value={users.length}
          icon={<Users size={20} />}
          description="تعداد کل حساب‌های ثبت‌شده"
        />

        <StatCard
          title="مشتریان"
          value={customers}
          icon={<UserRound size={20} />}
          description="حساب‌های مشتریان فروشگاه"
        />

        <StatCard
          title="مدیران"
          value={admins}
          icon={<ShieldCheck size={20} />}
          description="حساب‌های دارای دسترسی مدیریت"
        />

        <StatCard
          title="حساب‌های غیرفعال"
          value={inactiveUsers}
          icon={<UserX size={20} />}
          description={`${activeUsers} حساب فعال`}
        />
      </div>

      <UserFilters
        search={search}
        status={status}
        role={role}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onRoleChange={setRole}
      />

      <div className="flex items-center justify-between">
        <h2 className="font-semibold">فهرست کاربران</h2>
        <span className="text-sm text-muted">
          {filteredUsers.length} کاربر از {users.length}
        </span>
      </div>

      <UsersTable
        users={filteredUsers}
        onView={handleView}
        onEdit={openEditForm}
        onDelete={setDeleteTarget}
        onToggleStatus={handleToggleStatus}
      />

      <UserForm
        open={formOpen}
        user={editingUser}
        users={users}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />

      <UserDetailsModal
        open={Boolean(selectedUser)}
        user={selectedUser}
        orders={selectedOrders}
        onClose={() => {
          setSelectedUser(null);
          setSelectedOrders([]);
        }}
        onEdit={openEditForm}
      />

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="حذف کاربر"
        description="این عملیات قابل بازگشت نیست."
        size="sm"
      >
        {deleteTarget && (
          <div className="space-y-5">
            <p className="text-sm leading-7 text-muted">
              آیا از حذف حساب کاربری{" "}
              <span className="font-semibold text-foreground">
                {deleteTarget.name}
              </span>{" "}
              مطمئن هستید؟
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="h-10 rounded-lg border border-border px-5 text-sm transition hover:bg-background"
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="h-10 rounded-lg bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                حذف کاربر
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
