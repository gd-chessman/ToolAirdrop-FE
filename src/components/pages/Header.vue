<template>
  <header>
    <nav class="navbar">
      <div class="nav_logo">
        <img :src="siteSettings.logoUrl || '/src/assets/logocipher43.png'"
          style="width: 40px; height: 40px; border-radius: 8px;" alt="Logo">
        <RouterLink to="/" class="title_brand">{{ siteSettings.siteName }}</RouterLink>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="md:hidden text-white p-2">
        <i :class="isMobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-xl"></i>
      </button>

      <!-- Desktop Menu -->
      <ul class="nav_menu hidden md:flex">
        <li>
          <RouterLink to="/">Trang chủ</RouterLink>
        </li>
        <li>
          <RouterLink to="/opportunities">Airdrops</RouterLink>
        </li>
        <li>
          <RouterLink to="/tool">Công cụ</RouterLink>
        </li>
        <li>
          <RouterLink to="/news">Tin tức</RouterLink>
        </li>
        <li>
          <RouterLink to="/pricing">Bảng giá</RouterLink>
        </li>
      </ul>

      <ul class="nav_func flex items-center gap-4">
        <li class="hidden sm:block">
          <i class="pi pi-search text-white"></i>
        </li>
        <!-- <li class="hidden sm:block">
          <i class="pi pi-moon text-white"></i>
        </li> -->
        <li v-if="!authStore.user">
          <button class="btn_log px-4 py-2 bg-blue-600 rounded-lg text-white font-bold text-sm"
            @click="handleLogin">Đăng nhập / Đăng ký</button>
        </li>
        <li v-else class="relative" ref="menuRef">
          <button @click="toggleUserMenu" class="flex items-center gap-2 focus:outline-none group">
            <div class="w-9 h-9 rounded-full flex items-center justify-center transition-all bg-cyan-500/10 border"
              :class="isAdminOrPremium ? 'border-amber-400/50 bg-amber-400/10' : 'border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50'">
              <span :class="isAdminOrPremium ? 'text-amber-400' : 'text-cyan-400'" class="font-bold"
                v-if="authStore.user.username || authStore.user.firstName">
                {{ (authStore.user.username || authStore.user.firstName).charAt(0).toUpperCase() }}
              </span>
              <i v-else class="pi pi-user text-cyan-400"></i>
            </div>
          </button>

          <!-- Dropdown Menu -->
          <div v-show="showUserMenu"
            class="absolute right-0 mt-3 w-64 bg-[#0f172a] border border-white/10 rounded-2xl shadow-xl py-2 z-50 overflow-hidden ring-1 ring-white/5"
            style="top: 100%;">
            <div class="px-4 py-3 border-b border-white/5 bg-white/5">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold text-white truncate max-w-[120px]">{{ authStore.user.username ||
                  authStore.user.firstName }}</p>
                <span v-if="isAdminOrPremium"
                  class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/20">
                  {{ authStore.user.role === 'admin' ? 'Admin' : 'Premium' }}
                </span>
                <span v-else
                  class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-700 text-slate-400 border border-slate-600">
                  Basic
                </span>
              </div>
              <p class="text-xs text-slate-400 truncate">{{ authStore.user.email }}</p>
            </div>

            <div class="py-1">
              <RouterLink to="/watchlist"
                class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-cyan-400 transition-colors"
                @click="showUserMenu = false">
                <i class="pi pi-bookmark text-cyan-500/70"></i> Theo dõi
              </RouterLink>
            </div>

            <div class="border-t border-white/5 pt-1">
              <button @click="handleLogout"
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors text-left">
                <i class="pi pi-sign-out"></i> Đăng xuất
              </button>
            </div>
          </div>
        </li>
      </ul>
    </nav>

    <!-- Mobile Navigation Menu -->
    <div v-show="isMobileMenuOpen"
      class="md:hidden bg-[#0f172a] border-t border-white/10 absolute w-full left-0 animate-fade-in-down z-40">
      <ul class="flex flex-col p-4 space-y-4">
        <li>
          <RouterLink to="/" @click="isMobileMenuOpen = false"
            class="block text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5">Trang chủ</RouterLink>
        </li>
        <li>
          <RouterLink to="/opportunities" @click="isMobileMenuOpen = false"
            class="block text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5">Cơ hội</RouterLink>
        </li>
        <li>
          <RouterLink to="/tool" @click="isMobileMenuOpen = false"
            class="block text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5">Công cụ</RouterLink>
        </li>
        <li>
          <RouterLink to="/news" @click="isMobileMenuOpen = false"
            class="block text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5">Tin tức</RouterLink>
        </li>
        <li>
          <RouterLink to="/pricing" @click="isMobileMenuOpen = false"
            class="block text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5">Bảng giá</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>



<script setup>
import { defineEmits, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SettingsService from '@/service/settings'
import { computed } from 'vue'

const authStore = useAuthStore()
const emit = defineEmits(['navigate', 'search', 'toggle-theme', 'user', 'login'])

const isAdminOrPremium = computed(() => {
  return authStore.user?.role === 'admin' || authStore.user?.accountType === 'premium'
})

// Site Settings
const siteSettings = ref({
  siteName: 'Cipher 43 Lab',
  logoUrl: '',
  socialLinks: {}
})

// ... (keep emit functions) ...
const navigate = (page) => {
  emit('navigate', page)
}

const handleSearch = () => {
  emit('search')
}

const toggleTheme = () => {
  emit('toggle-theme')
}

const handleUser = () => {
  emit('user')
}

const handleLogin = () => {
  emit('login')
}

const handleLogout = () => {
  showUserMenu.value = false
  authStore.logout()
}

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// User Menu Dropdown Logic
const showUserMenu = ref(false)
const menuRef = ref(null)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const closeUserMenu = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

const fetchSettings = async () => {
  try {
    const res = await SettingsService.get()
    if (res.success && res.data) {
      if (res.data.siteName) siteSettings.value.siteName = res.data.siteName
      if (res.data.logoUrl) siteSettings.value.logoUrl = res.data.logoUrl
      if (res.data.pageTitle) document.title = res.data.pageTitle
    }
  } catch (error) {
    console.error("Failed to fetch header settings", error)
  }
}

onMounted(() => {
  document.addEventListener('click', closeUserMenu)
  fetchSettings()
})


onUnmounted(() => {
  document.removeEventListener('click', closeUserMenu)
})
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 100%;
}

.nav_logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title_brand {
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.title_brand:hover {
  color: #3b82f6;
}

.nav_menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav_menu li a {
  color: #a0b0d7;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s;
}

.nav_menu li a:hover,
.nav_menu li a.router-link-active {
  color: #3b82f6;
}

.nav_func {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.nav_func li {
  cursor: pointer;
}

.nav_func img {
  width: 20px;
  height: 20px;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.nav_func img:hover {
  opacity: 1;
}

.btn_log {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn_log:hover {
  background-color: #2563eb;
}

/* Responsive */
@media (max-width: 768px) {
  .nav_menu {
    display: none;
  }

  .navbar {
    padding: 1rem;
  }

  .nav_func {
    gap: 0.5rem;
  }

  .btn_log {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.3s ease-out forwards;
}
</style>
