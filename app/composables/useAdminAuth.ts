/**
 * Auth admin.
 *
 * Token JWT disimpan di cookie supaya tetap ada setelah refresh. Backend yang
 * meng-issue token lewat POST /api/v1/admin/auth/login.
 *
 * CATATAN: proteksi route /admin belum diaktifkan. Middleware guard sengaja
 * ditunda sampai backend auth benar-benar ada, supaya panel tetap bisa dibuka
 * untuk memeriksa dan menguji tampilan data. Saat backend siap, tambahkan
 * middleware yang mengarahkan pathname /admin (kecuali /admin/login) ke
 * /admin/login bila token kosong.
 */

export interface AdminUser {
  id: number
  email: string
  name: string
  role: 'superadmin' | 'editor'
}

const TOKEN_KEY = 'lkr_admin_token'
const USER_KEY = 'lkr_admin_user'

export function useAdminAuth() {
  const token = useCookie<string | null>(TOKEN_KEY, {
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12
  })
  const user = useCookie<string | null>(USER_KEY, {
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12
  })

  const profile = computed<AdminUser | null>(() => {
    if (!user.value) return null
    try {
      return JSON.parse(user.value) as AdminUser
    } catch {
      return null
    }
  })

  const isAuthenticated = computed(() => Boolean(token.value))

  function saveToken(nextToken: string, nextUser: AdminUser) {
    token.value = nextToken
    user.value = JSON.stringify(nextUser)
  }

  function clear() {
    token.value = null
    user.value = null
  }

  return {
    token,
    profile,
    isAuthenticated,
    saveToken,
    clear,
    logout: clear
  }
}