<template>
    <div class="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-center px-4">
        <div v-if="loading" class="space-y-4">
            <div class="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto">
            </div>
            <h2 class="text-2xl font-bold text-white">Đang xác thực email...</h2>
        </div>

        <div v-else-if="success" class="space-y-6 max-w-md">
            <div
                class="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h2 class="text-3xl font-bold text-white">Email đã xác thực!</h2>
            <p class="text-slate-400">Tài khoản của bạn đã được xác thực thành công. Bạn có thể truy cập tất cả tính
                năng ngay bây giờ.</p>
            <button @click="router.push('/')"
                class="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all">
                Về trang chủ
            </button>
        </div>

        <div v-else class="space-y-6 max-w-md">
            <div
                class="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </div>
            <h2 class="text-3xl font-bold text-white">Xác thực thất bại</h2>
            <p class="text-slate-400">{{ error }}</p>
            <button @click="router.push('/')"
                class="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all">
                Quay lại trang chủ
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const loading = ref(true);
const success = ref(false);
const error = ref('');

onMounted(async () => {
    const token = route.params.token;
    if (!token) {
        error.value = 'Liên kết xác thực không hợp lệ.';
        loading.value = false;
        return;
    }

    try {
        await authStore.verifyEmail(token);
        success.value = true;
    } catch (err) {
        console.error(err);
        error.value = err.message || 'Xác thực thất bại. Liên kết có thể đã hết hạn.';
    } finally {
        loading.value = false;
    }
});
</script>
