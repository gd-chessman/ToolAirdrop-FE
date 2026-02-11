<template>
  <header class="header shadow-lg">
    <div class="header-inner">
      <!-- Logo -->
      <RouterLink to="/" class="logo">
        <img :src="siteSettings.logoUrl || '/src/assets/logocipher43.png'" alt="Logo" class="logo-img" />
        <span class="logo-text">{{ siteSettings.siteName }}</span>
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="nav-desktop">
        <template v-for="topic in visibleTopics" :key="topic">
          <RouterLink
            :to="{ path: '/news', query: { tag: topic } }"
            class="nav-link nav-link--tag"
            :class="{ 'nav-link--active': route.path === '/news' && route.query.tag === topic }"
          >
            {{ topic }}
          </RouterLink>
        </template>
        <!-- Dropdown Xem thêm (chỉ topic từ thứ 6 trở đi) -->
        <div v-if="remainingTopics.length > 0" ref="topicsDropdownRef" class="nav-more-wrap">
          <button type="button" class="nav-link nav-link--more" :class="{ 'nav-link--active': showTopicsDropdown }"
            @click.stop="showTopicsDropdown = !showTopicsDropdown" aria-haspopup="true" :aria-expanded="showTopicsDropdown">
            More
            <i class="pi pi-chevron-down nav-more-chevron" :class="{ 'nav-more-chevron--open': showTopicsDropdown }"></i>
          </button>
          <Transition name="dropdown">
            <div v-show="showTopicsDropdown" class="nav-dropdown">
              <div class="nav-dropdown-inner">
                <RouterLink
                  v-for="topic in remainingTopics"
                  :key="topic"
                  :to="{ path: '/news', query: { tag: topic } }"
                  class="nav-dropdown-link"
                  :class="{ 'nav-dropdown-link--active': route.query.tag === topic }"
                  @click="showTopicsDropdown = false"
                >
                  {{ topic }}
                </RouterLink>
              </div>
            </div>
          </Transition>
        </div>
      </nav>

      <!-- Mobile Menu Toggle -->
      <button type="button" @click="toggleMobileMenu" class="menu-toggle" aria-label="Menu">
        <i :class="isMobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'" class="menu-toggle-icon"></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-show="isMobileMenuOpen" class="nav-mobile">
        <div class="nav-mobile-inner">
          <div v-if="trendingTopics.length" class="nav-mobile-section">
            <RouterLink
              v-for="topic in trendingTopics.slice(0, 5)"
              :key="topic"
              :to="{ path: '/news', query: { tag: topic } }"
              @click="isMobileMenuOpen = false"
              class="nav-mobile-link"
              :class="{ 'nav-mobile-link--active': route.query.tag === topic }"
            >
              <i class="pi pi-bolt text-amber-500/80 mr-3 text-xs"></i> {{ topic }}
            </RouterLink>
          </div>
        </div>
      </div>
    </Transition>
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

const visibleTopics = computed(() => trendingTopics.value.slice(0, 5))
const remainingTopics = computed(() => trendingTopics.value.slice(5))
const showTopicsDropdown = ref(false)
const topicsDropdownRef = ref(null)

const closeTopicsDropdown = (event) => {
  if (topicsDropdownRef.value && !topicsDropdownRef.value.contains(event.target)) {
    showTopicsDropdown.value = false
  }
}

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
  document.addEventListener('click', closeTopicsDropdown)
  fetchSettings()
  newsStore.fetchTrendingTopics()
})

onUnmounted(() => {
  document.removeEventListener('click', closeUserMenu)
  document.removeEventListener('click', closeTopicsDropdown)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  background-color: #5827ae;
  -webkit-backdrop-filter: blur(12px);
}

.header-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .header-inner {
    padding: 0 1.5rem;
    height: 4.5rem;
  }
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: -0.02em;
  transition: color 0.2s;
}

.logo:hover {
  color: rgb(34 211 238);
}

.logo-img {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.logo-text {
  white-space: nowrap;
}

/* Desktop nav */
.nav-desktop {
  display: none;
  align-items: center;
  gap: 0.25rem;
}

@media (min-width: 768px) {
  .nav-desktop {
    display: flex;
  }
}

.nav-link {
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  transition: color 0.2s, background-color 0.2s;
}

.nav-link:hover {
  color: rgb(34 211 238);
  background-color: rgba(34, 211, 238, 0.1);
}

.nav-link--active {
  color: rgb(34 211 238);
  background-color: rgba(34, 211, 238, 0.1);
}

.nav-link--tag {
  font-size: 0.8125rem;
  text-transform: capitalize;
}

/* Xem thêm dropdown */
.nav-more-wrap {
  position: relative;
}

.nav-link--more {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
}

.nav-more-chevron {
  font-size: 0.65rem;
  transition: transform 0.2s ease;
}

.nav-more-chevron--open {
  transform: rotate(180deg);
}

.nav-dropdown {
  position: absolute;
  top: calc(100% + 0.25rem);
  right: 0;
  min-width: 13rem;
  max-height: 20rem;
  overflow-y: auto;
  background: #5827ae;
  backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  z-index: 60;
}

.nav-dropdown-inner {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
}

.nav-dropdown-link {
  display: block;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  text-transform: capitalize;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: color 0.2s, background-color 0.2s;
}

.nav-dropdown-link:hover {
  color: rgb(34 211 238);
  background-color: rgba(34, 211, 238, 0.08);
}

.nav-dropdown-link--active {
  color: rgb(34 211 238);
  background-color: rgba(34, 211, 238, 0.12);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Mobile toggle */
.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  color: #fff;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }
}

.menu-toggle-icon {
  font-size: 1.25rem;
}

/* Mobile menu */
.nav-mobile {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #5827ae;
  backdrop-filter: blur(16px);
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-mobile-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0rem 0.5rem;
}

.nav-mobile-section {
  padding: 0;
}

.nav-mobile-section:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.nav-mobile-label {
  display: block;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(100 116 139);
  margin-bottom: 0.5rem;
  padding-left: 0.25rem;
}

.nav-mobile-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 0.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: rgb(203 213 225);
  text-decoration: none;
  transition: color 0.2s, background-color 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-mobile-link:hover {
  color: rgb(34 211 238);
  background-color: rgba(34, 211, 238, 0.08);
}

.nav-mobile-link--active {
  color: rgb(34 211 238);
  background-color: rgba(34, 211, 238, 0.12);
}

/* Mobile menu transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
