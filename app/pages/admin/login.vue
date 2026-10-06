<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { login } = useAdminApi();
const { saveToken, isAuthenticated, profile } = useAdminAuth();

const form = reactive({ identifier: "", password: "" });
const state = ref<"idle" | "sending" | "error">("idle");
const error = ref("");

async function submit() {
  error.value = "";
  state.value = "sending";
  try {
    const result = await login(form.identifier.trim(), form.password);
    saveToken(result.token, result.user);
    await navigateTo("/admin");
  } catch (err) {
    const e = err as {
      statusCode?: number;
      data?: { error?: string; message?: string };
      message?: string;
    };
    state.value = "error";
    error.value =
      e.statusCode === 401
        ? "Email/telepon atau password salah."
        : e.data?.error ||
          e.data?.message ||
          e.message ||
          "Gagal login. Backend belum bisa dihubungi.";
  }
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-slate-50 dark:bg-brand-950"
  >
    <div
      class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-brand-900/40"
    >
      <div class="flex items-center gap-3">
        <span
          class="grid h-11 w-11 place-items-center rounded-lg bg-brand-700 font-display text-sm font-black text-white"
        >
          LL
        </span>
        <div>
          <h1 class="text-lg">Login CMS</h1>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Panel admin Lobunta Lubricants
          </p>
        </div>
      </div>

      <p
        v-if="isAuthenticated"
        class="mt-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
      >
        Sudah login sebagai {{ profile?.email }}.
        <NuxtLink to="/admin" class="font-semibold underline"
          >Buka dashboard</NuxtLink
        >
      </p>

      <form v-else class="mt-6 space-y-4" @submit.prevent="submit">
        <label class="block">
          <span class="mb-1.5 block text-sm font-medium"
            >Email atau Telepon</span
          >
          <input
            v-model="form.identifier"
            type="text"
            required
            class="field"
            autocomplete="username"
            placeholder="admin@lobuntalubricants.com atau 08xxxxxxxxxx"
          />
        </label>
        <label class="block">
          <span class="mb-1.5 block text-sm font-medium">Password</span>
          <input
            v-model="form.password"
            type="password"
            required
            class="field"
            autocomplete="current-password"
          />
        </label>

        <div class="flex justify-end">
          <NuxtLink
            to="/admin/forgot-password"
            class="text-sm text-brand-700 hover:underline dark:text-brand-300"
          >
            Lupa password?
          </NuxtLink>
        </div>

        <button
          type="submit"
          class="btn-primary w-full"
          :disabled="state === 'sending'"
        >
          {{ state === "sending" ? "Memproses..." : "Login" }}
        </button>

        <p
          v-if="error"
          class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300"
          role="alert"
        >
          {{ error }}
        </p>
      </form>
    </div>

    <p class="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
      Endpoint yang dipakai:
      <code class="font-mono">POST /api/v1/admin/auth/login</code>
    </p>
  </div>
</template>
