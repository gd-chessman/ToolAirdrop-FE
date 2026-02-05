<template>
    <div
        class="bg-[#020617] text-slate-200 font-sans min-h-screen flex items-center justify-center relative overflow-hidden">
        <!-- Background Effects -->
        <div class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div class="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]">
            </div>
        </div>

        <div class="relative z-10 max-w-lg w-full mx-auto px-6 text-center">
            <div class="bg-[#0f172a] border border-emerald-500/20 rounded-3xl p-10 shadow-2xl shadow-emerald-900/20">
                <div
                    class="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                    <i class="pi pi-check text-4xl text-emerald-400"></i>
                </div>

                <h1 class="text-3xl font-bold text-white mb-4">Thanh toán thành công!</h1>
                <p class="text-slate-400 mb-8">
                    Chúc mừng! Bạn đã nâng cấp thành công gói <span class="text-emerald-400 font-bold">Alpha Riêng
                        Tư</span>.
                    Các tính năng cao cấp đã được mở khóa.
                </p>

                <div class="space-y-4">
                    <router-link :to="{ name: 'Dashboard' }"
                        class="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/25">
                        Truy cập Dashboard
                    </router-link>

                    <router-link :to="{ name: 'Home' }"
                        class="block w-full py-3 bg-[#1e293b] hover:bg-[#334155] text-slate-300 rounded-xl font-bold transition-all">
                        Về trang chủ
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

onMounted(async () => {
    // Refresh user profile to get updated status
    await authStore.fetchUserProfile();
});
</script>
