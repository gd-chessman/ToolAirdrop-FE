<template>
    <div
        class="bg-[#020617] text-slate-200 font-sans min-h-screen pt-24 pb-20 selection:bg-cyan-500/30 selection:text-cyan-200">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 mb-6 font-mono tracking-wider">
                    <span class="flex h-2 w-2 relative">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    DANH SÁCH THEO DÕI
                </div>
                <h1 class="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                    Dự án <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Đã theo
                        dõi</span>
                </h1>
                <p class="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Theo dõi các airdrop yêu thích của bạn và cập nhật trạng thái mới nhất.
                </p>
            </div>

            <div v-if="loading" class="flex flex-col items-center justify-center py-20">
                <div class="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                <p class="mt-4 text-slate-400 font-medium">Đang tải danh sách theo dõi...</p>
            </div>

            <div v-else-if="authStore.trackedProducts && authStore.trackedProducts.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="product in authStore.trackedProducts" :key="product._id || product.id"
                    @click="router.push({ name: 'DetailAirdrop', params: { id: product.id } })"
                    class="bg-[#0f172a] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-900/10 group cursor-pointer flex flex-col h-full relative overflow-hidden">

                    <!-- Glow Effect -->
                    <div
                        class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors">
                    </div>

                    <div class="flex justify-between items-start mb-6">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-12 h-12 rounded-xl bg-[#1e293b] flex items-center justify-center text-cyan-400 font-bold text-xl border border-white/5 shadow-inner">
                                <img v-if="product.image" :src="product.image"
                                    class="w-full h-full object-cover rounded-xl" :alt="product.name">
                                <span v-else>{{ product.name.charAt(0) }}</span>
                            </div>
                            <div>
                                <h3
                                    class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                                    {{ product.name }}</h3>
                                <div class="text-xs text-slate-500 font-mono mt-1 flex items-center gap-2">
                                    <span class="bg-white/5 px-1.5 py-0.5 rounded">{{ product.token }}</span>
                                    <span>{{ product.networkd || (product.supportNetworks && product.supportNetworks[0])
                                        }}</span>
                                </div>
                            </div>
                        </div>
                        <button @click.stop="handleUntrack(product)"
                            class="text-slate-500 hover:text-red-400 transition-colors p-2" title="Bỏ theo dõi">
                            <i class="pi pi-times"></i>
                        </button>
                    </div>

                    <div class="space-y-3 mb-6 flex-1">
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-slate-500 font-medium">Trạng thái</span>
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                                :class="{
                                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20': product.status === 'Live',
                                    'bg-amber-500/10 text-amber-400 border-amber-500/20': product.status === 'Upcoming',
                                    'bg-slate-500/10 text-slate-400 border-slate-500/20': product.status === 'Ended'
                                }">
                                {{ translate(product.status) }}
                            </span>
                        </div>
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-slate-500 font-medium">Tiềm năng</span>
                            <span class="font-bold" :class="{
                                'text-emerald-400': product.potential === 'High',
                                'text-amber-400': product.potential === 'Medium',
                                'text-slate-400': product.potential === 'Low'
                            }">{{ translate(product.potential) }}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-slate-500 font-medium">Độ khó</span>
                            <span class="font-bold" :class="{
                                'text-red-400': product.difficulty === 'Hard',
                                'text-amber-400': product.difficulty === 'Medium',
                                'text-emerald-400': product.difficulty === 'Easy'
                            }">{{ translate(product.difficulty) }}</span>
                        </div>
                    </div>

                    <div class="flex gap-3 items-center">
                        <button @click.stop="router.push({ name: 'DetailAirdrop', params: { id: product.id } })"
                            class="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm font-bold hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all">
                            Xem chi tiết
                        </button>
                        <button @click.stop="handleUntrack(product)"
                            class="px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 text-sm font-bold hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all flex items-center gap-2">
                            <span>Bỏ theo dõi</span>
                        </button>
                    </div>
                </div>
            </div>

            <div v-else class="text-center py-20 bg-[#0f172a]/50 rounded-3xl border border-white/5">
                <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="pi pi-bookmark text-slate-500 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">Chưa có dự án nào được theo dõi</h3>
                <p class="text-slate-400 mb-8 max-w-md mx-auto">Bắt đầu khám phá cơ hội và theo dõi các airdrop yêu
                    thích của bạn để xem chúng ở đây.</p>
                <button @click="router.push('/opportunities')"
                    class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20">
                    Khám phá Cơ hội
                </button>
            </div>

        </div>
        <Footer />

    </div>

    <!-- Custom Confirmation Dialog -->
    <div v-if="showConfirmDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            @click="showConfirmDialog = false"></div>

        <!-- Dialog Content -->
        <div
            class="relative bg-[#0f172a] border border-white/10 rounded-2xl p-6 shadow-2xl max-w-sm w-full transform transition-all scale-100 ring-1 ring-white/5">
            <div class="flex flex-col items-center text-center">
                <div class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-400">
                    <i class="pi pi-exclamation-triangle text-xl"></i>
                </div>

                <h3 class="text-xl font-bold text-white mb-2">Bỏ theo dõi dự án?</h3>
                <p class="text-slate-400 mb-6 text-sm leading-relaxed">
                    Bạn có chắc chắn muốn xóa <span class="text-white font-semibold">{{ itemToUntrack?.name
                    }}</span> khỏi danh sách theo dõi không? Bạn sẽ không nhận được cập nhật cho dự án này nữa.
                </p>

                <div class="flex gap-3 w-full">
                    <button @click="showConfirmDialog = false"
                        class="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-sm hover:bg-slate-700 transition-colors">
                        Hủy
                    </button>
                    <button @click="confirmUntrack"
                        class="flex-1 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-sm hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-lg shadow-red-900/20">
                        Bỏ theo dõi
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Footer from './Footer.vue'

const authStore = useAuthStore()
const router = useRouter()
const loading = ref(true)

onMounted(async () => {
    if (authStore.isAuthenticated) {
        await authStore.fetchTrackedProducts()
    } else {
        router.push({ name: 'Login' }) // Or show "Please login" state
    }
    loading.value = false
})

const handleUntrack = (product) => {
    itemToUntrack.value = product
    showConfirmDialog.value = true
}

const confirmUntrack = async () => {
    if (!itemToUntrack.value) return

    try {
        await authStore.untrack(itemToUntrack.value._id || itemToUntrack.value.id)
        showConfirmDialog.value = false
        itemToUntrack.value = null
    } catch (e) {
        alert(e.message) // Keep alert for error only, or could be a toast
    }
}

const itemToUntrack = ref(null)
const showConfirmDialog = ref(false)

const dictionary = {
    'Live': 'Đang diễn ra',
    'Upcoming': 'Sắp diễn ra',
    'Ended': 'Đã kết thúc',
    'High': 'Cao',
    'Medium': 'Trung bình',
    'Low': 'Thấp',
    'Hard': 'Khó',
    'Easy': 'Dễ'
}

const translate = (text) => dictionary[text] || text
</script>
