<template>
    <div
        class="bg-[#020617] text-slate-200 font-sans min-h-screen flex items-center justify-center relative overflow-hidden">
        <!-- Background Effects -->
        <div class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div class="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px]">
            </div>
        </div>

        <div class="relative z-10 max-w-lg w-full mx-auto px-6 text-center">
            <div class="bg-[#0f172a] border border-red-500/20 rounded-3xl p-10 shadow-2xl shadow-red-900/20">
                <div
                    class="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                    <i class="pi pi-times text-4xl text-red-400"></i>
                </div>

                <h1 class="text-3xl font-bold text-white mb-4">Thanh toán thất bại</h1>
                <p class="text-slate-400 mb-8">
                    Đã có lỗi xảy ra hoặc bạn đã hủy giao dịch. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp
                    diễn.
                </p>

                <div class="space-y-4">
                    <router-link :to="{ name: 'Pricing' }"
                        class="block w-full py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:brightness-110 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-500/25">
                        Thử lại
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
</script>
