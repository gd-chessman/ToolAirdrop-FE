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
        <li v-for="topic in trendingTopics" :key="topic">
          <RouterLink :to="{ path: '/news', query: { tag: topic } }"
            :class="[route.query.tag === topic ? 'text-[#2563eb] font-bold' : 'text-white hover:text-[#2563eb]']"
            class="transition-colors">
            {{ topic }}
          </RouterLink>
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
          <RouterLink to="/news" @click="isMobileMenuOpen = false"
            class="block text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5">Tin tức</RouterLink>
        </li>
        <li v-for="topic in trendingTopics" :key="topic">
          <RouterLink :to="{ path: '/news', query: { tag: topic } }" @click="isMobileMenuOpen = false"
            :class="[route.query.tag === topic ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400']"
            class="block py-2 border-b border-white/5 transition-colors">
            {{ topic }}
          </RouterLink>
        </li>

      </ul>
    </div>
  </header>
</template>



<script setup>
import { defineEmits, ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SettingsService from '@/service/settings'
import { useNewsStore } from '@/stores/news'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const newsStore = useNewsStore()
const { trendingTopics } = storeToRefs(newsStore)

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

const route = useRoute()

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
  newsStore.fetchTrendingTopics()
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
  justify-content: space-start;
  gap: 10rem;
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
  text-transform: uppercase;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s;
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
