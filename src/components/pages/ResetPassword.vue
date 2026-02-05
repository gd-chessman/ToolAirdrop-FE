<template>
    <div class="min-h-screen bg-[#020617] flex flex-col items-center justify-center px-4">
        <div class="w-full max-w-md bg-[#0F172A] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h1 class="text-2xl font-bold text-white mb-2 text-center">Đặt lại mật khẩu mới</h1>
            <p class="text-slate-400 text-center mb-8 text-sm">Vui lòng nhập mật khẩu mới của bạn bên dưới.</p>

            <div v-if="success" class="text-center space-y-4">
                <div class="text-green-400 font-medium">Mật khẩu đã được đặt lại thành công!</div>
                <button @click="router.push('/')"
                    class="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all">
                    Đi tới Đăng nhập
                </button>
            </div>

            <div v-else class="space-y-4">
                <div>
                    <label class="block text-slate-300 text-sm mb-1">Mật khẩu mới</label>
                    <input type="password" v-model="password"
                        class="w-full bg-[#1E293B] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all">
                </div>
                <div>
                    <label class="block text-slate-300 text-sm mb-1">Xác nhận mật khẩu</label>
                    <input type="password" v-model="confirmPassword"
                        class="w-full bg-[#1E293B] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all">
                </div>

                <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>

                <button @click="handleReset" :disabled="loading"
                    class="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                    <span v-if="loading" class="animate-spin">⌛</span> Đặt lại mật khẩu
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const success = ref(false);
const error = ref('');

async function handleReset() {
    error.value = '';
    if (!password.value || !confirmPassword.value) {
        error.value = 'Vui lòng điền vào tất cả các trường';
        return;
    }
    if (password.value.length < 6) {
        error.value = 'Mật khẩu phải có ít nhất 6 ký tự';
        return;
    }
    if (password.value !== confirmPassword.value) {
        error.value = 'Mật khẩu không khớp';
        return;
    }

    const token = route.params.token;
    if (!token) {
        error.value = 'Token không hợp lệ';
        return;
    }

    loading.value = true;
    try {
        await authStore.resetPassword(token, password.value);
        success.value = true;
    } catch (err) {
        console.error(err);
        error.value = err.message || 'Đặt lại thất bại';
    } finally {
        loading.value = false;
    }
}
</script>
