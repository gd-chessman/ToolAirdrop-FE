<script setup>
import { useRouter } from 'vue-router'
import Header from './components/pages/Header.vue'
import { onMounted, ref, watch } from 'vue'
import FormLogin from './components/FormLogin.vue'
import FormRegister from './components/FormRegister.vue'
import FormForgotPassword from './components/FormForgotPassword.vue'

const router = useRouter()
const isAdminPath = ref(false)

watch(() => router.currentRoute.value.path, (newPath) => {
  console.log('Route changed to:', newPath)
  if (newPath.startsWith('/admin')) {
    isAdminPath.value = true
  } else {
    isAdminPath.value = false
  }
})


import SettingsService from './service/settings'

onMounted(async () => {
  console.log('Current Path:', router.currentRoute.value.path)
  console.log('isAdminPath:', isAdminPath.value)

  try {
    const res = await SettingsService.get()
    if (res.success && res.data && res.data.pageTitle) {
      document.title = res.data.pageTitle
    }
  } catch (error) {
    console.error("Failed to fetch settings for title", error)
  }
})

let isShowFormLogin = ref(false);
let isShowFormRegister = ref(false);
let isShowFormForgotPassword = ref(false);

const handleNavigate = (page) => {

}

const handleSearch = () => {
  console.log('Search clicked')
  // Add search functionality
}

const handleToggleTheme = () => {
  console.log('Theme toggle clicked')
  // Add theme toggle functionality
}

const handleUser = () => {
  console.log('User clicked')
  // Add user menu functionality
}

const handleLogin = () => {
  console.log('Login clicked')
  isShowFormLogin.value = !isShowFormLogin.value
}

const openRegister = () => {
  isShowFormLogin.value = false;
  isShowFormRegister.value = true;
}

const openLogin = () => {
  isShowFormRegister.value = false;
  isShowFormForgotPassword.value = false;
  isShowFormLogin.value = true;
}

const openForgot = () => {
  isShowFormLogin.value = false;
  isShowFormForgotPassword.value = true;
}
</script>

<template>
  <div>
    <FormLogin v-if="!isAdminPath" v-model="isShowFormLogin" @switch-to-register="openRegister"
      @switch-to-forgot="openForgot" />
    <FormRegister v-if="!isAdminPath" v-model="isShowFormRegister" @switch-to-login="openLogin" />
    <FormForgotPassword v-if="!isAdminPath" v-model="isShowFormForgotPassword" @switch-to-login="openLogin" />

    <!-- Main Header -->
    <Header v-if="!isAdminPath" @navigate="handleNavigate" @search="handleSearch" @toggle-theme="handleToggleTheme"
      @user="handleUser" @login="handleLogin" :isShowFormLogin="isShowFormLogin" />
    <!-- Router View -->
    <RouterView />
  </div>

</template>

<style>
/* Remove default margins */
body {
  margin: 0;
  padding: 0;
}
</style>
