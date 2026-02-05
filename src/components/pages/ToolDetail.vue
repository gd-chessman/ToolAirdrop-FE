<template>
    <div
        class="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 pb-20">
        <!-- Background Effects -->
        <div class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]">
            </div>
            <div
                class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]">
            </div>
        </div>

        <!-- Navigation -->
        <nav class="relative z-10 pt-24 px-6 max-w-7xl mx-auto mb-8">
            <router-link to="/tools"
                class="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group">
                <i class="pi pi-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
                <span class="text-sm font-medium">Quay lại</span>
            </router-link>
        </nav>

        <div v-if="isLoading" class="flex justify-center py-20 relative z-10">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>

        <main v-else-if="tool" class="relative z-10 max-w-7xl mx-auto px-6 space-y-16">

            <!-- Header -->
            <header>
                <div class="flex gap-2 mb-4">
                    <span v-for="badge in displayedBadges" :key="badge" :class="[
                        'text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border',
                        badge === 'POPULAR' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                            badge === 'PRIVATE' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    ]">
                        <i v-if="badge === 'POPULAR'" class="pi pi-bolt mr-1"></i>
                        <i v-if="badge === 'PRIVATE'" class="pi pi-lock mr-1"></i>
                        {{ badge }}
                    </span>
                </div>

                <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4 flex items-center gap-4">
                    {{ tool.name }}
                </h1>

                <div class="flex items-start gap-4 mb-8">
                    <div class="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                        <div v-html="tool.iconSvg || defaultIcon" class="w-8 h-8 text-cyan-400"></div>
                    </div>
                    <p class="text-lg text-slate-400 max-w-2xl leading-relaxed">
                        {{ tool.description }}
                    </p>
                </div>

                <button @click="handleLaunch"
                    class="px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
                    :class="canAccess ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/20' : 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-orange-900/20'">
                    <i :class="canAccess ? 'pi pi-play' : 'pi pi-lock'"></i>
                    {{ canAccess ? 'Khởi chạy Tool' : 'Nâng cấp để mở khóa' }}
                </button>
            </header>

            <!-- About This Tool -->
            <section>
                <h2 class="text-xl font-bold text-white mb-4">Giới thiệu</h2>
                <p class="text-slate-400 leading-relaxed">
                    {{ tool.about || tool.description }}
                </p>
            </section>

            <!-- Key Features -->
            <section>
                <h2 class="text-xl font-bold text-white mb-6">Tính năng chính</h2>
                <div class="grid md:grid-cols-2 gap-4">
                    <div v-for="(feature, index) in tool.features" :key="index"
                        class="bg-[#0f172a] border border-white/5 rounded-xl p-4 flex items-center gap-3">
                        <i class="pi pi-check text-emerald-400"></i>
                        <span class="text-slate-300 text-sm font-medium">{{ feature }}</span>
                    </div>
                </div>
            </section>

            <!-- How It Works -->
            <section>
                <h2 class="text-xl font-bold text-white mb-6">Cách hoạt động</h2>
                <div class="space-y-4">
                    <div v-for="(step, index) in tool.howItWorks" :key="index"
                        class="bg-[#0f172a] border border-white/5 rounded-xl p-4 flex gap-4 items-center">
                        <div
                            class="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center shrink-0 border border-cyan-500/20">
                            {{ index + 1 }}
                        </div>
                        <span class="text-slate-300 text-sm">{{ step }}</span>
                    </div>
                </div>
            </section>

            <!-- Use Cases -->
            <section>
                <h2 class="text-xl font-bold text-white mb-6">Use Cases</h2>
                <div class="space-y-4">
                    <div v-for="(useCase, index) in tool.useCases" :key="index"
                        class="bg-[#0f172a] border border-white/5 rounded-xl p-4 flex gap-4 items-center">
                        <i class="pi pi-lightbulb text-amber-400 shrink-0"></i>
                        <span class="text-slate-300 text-sm">{{ useCase }}</span>
                    </div>
                </div>
            </section>

            <!-- API Documentation (Locked) -->
            <section>
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-white">Tài liệu API</h2>
                    <span v-if="tool.apiLocked"
                        class="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded text-xs font-bold uppercase flex items-center gap-1">
                        <i class="pi pi-lock text-[10px]"></i> Private Only
                    </span>
                </div>

                <!-- If user is premium and tool API is locked, show "Developing" -->
                <div v-if="tool.apiLocked && isUserPremium"
                    class="bg-[#0f172a] border border-cyan-500/20 rounded-2xl p-12 text-center relative overflow-hidden group">
                    <div
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/5 rounded-full blur-[50px] pointer-events-none">
                    </div>
                    <div class="relative z-10 flex flex-col items-center">
                        <div
                            class="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
                            <i class="pi pi-cog pi-spin text-cyan-400 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Đang phát triển</h3>
                        <p class="text-slate-400 max-w-md">Tính năng API cho công cụ này đang được đội ngũ kỹ thuật phát
                            triển và sẽ sớm ra mắt.</p>
                    </div>
                </div>

                <!-- If tool API is locked and user is NOT premium, show Lock UI -->
                <div v-else-if="tool.apiLocked"
                    class="bg-[#0f172a] border border-white/5 rounded-2xl p-12 text-center relative overflow-hidden group">
                    <!-- Lock Glow -->
                    <div
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-500/5 rounded-full blur-[50px] pointer-events-none">
                    </div>

                    <div class="relative z-10 flex flex-col items-center">
                        <div
                            class="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
                            <i class="pi pi-lock text-[#0f172a] text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Quyền truy cập API bị khóa</h3>
                        <p class="text-slate-400 mb-8 max-w-md">Tài liệu và quyền truy cập API chỉ dành riêng cho thành
                            viên Private.</p>
                        <button @click="router.push('/pricing')"
                            class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:brightness-110 transition-all flex items-center gap-2">
                            <i class="pi pi-crown"></i>
                            Nâng cấp ngay
                        </button>
                    </div>
                </div>
            </section>

            <!-- Related Tools -->
            <section v-if="relatedTools.length > 0">
                <h2 class="text-xl font-bold text-white mb-6">Công cụ liên quan</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div v-for="relTool in relatedTools" :key="relTool.id" @click="router.push(`/tools/${relTool.id}`)"
                        class="bg-[#0f172a] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition-all cursor-pointer group hover:-translate-y-1">
                        <div
                            class="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <div v-if="relTool.iconSvg" v-html="relTool.iconSvg" class="w-5 h-5"></div>
                            <i v-else class="pi pi-box"></i>
                        </div>
                        <h3 class="text-white font-bold mb-2">{{ relTool.name }}</h3>
                        <p class="text-slate-400 text-sm line-clamp-3 mb-4">{{ relTool.description }}</p>

                        <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                            <span
                                class="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-[10px] font-bold uppercase border border-cyan-500/10">Analysis</span>
                            <span v-if="relTool.type === 'free'"
                                class="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold uppercase  border border-emerald-500/10">Free</span>
                            <span v-else
                                class="px-2 py-1 bg-amber-500/10 text-amber-400 rounded text-[10px] font-bold uppercase border border-amber-500/10">Private</span>
                        </div>
                    </div>
                </div>
            </section>

        </main>

        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ToolService from '@/service/tool'
import { useAuthStore } from '@/stores/auth'
import Footer from './Footer.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const tool = ref(null)
const isLoading = ref(true)
const relatedTools = ref([])

const isUserPremium = computed(() => {
    return authStore.user?.accountType === 'premium'
})

const canAccess = computed(() => {
    if (!isPremium.value) return true
    return isUserPremium.value
})

function handleLaunch() {
    if (canAccess.value) {
        // Logic to launch tool
        console.log("Launching tool...")
    } else {
        router.push('/pricing')
    }
}

const defaultIcon = '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>'

const isPremium = computed(() => {
    return tool.value?.type === 'premium' || tool.value?.type === 'powerful' || tool.value?.isPremium
})

const displayedBadges = computed(() => {
    const badges = tool.value?.badges || []
    if (badges.length === 0 && tool.value) {
        // Fallback defaults
        if (tool.value.type === 'premium' || tool.value.type === 'powerful') return ['Automation', 'PRIVATE']
        return ['Analysis', 'FREE']
    }
    return ['Automation', ...badges] // Always add Automation tag as per design? Or dynamic. Assuming dynamic for now but design shows it.
})

onMounted(() => {
    loadToolData(route.params.id)
})

watch(() => route.params.id, (newId) => {
    loadToolData(newId)
})

async function loadToolData(id) {
    isLoading.value = true
    try {
        const res = await ToolService.getById(id)
        if (res) {
            tool.value = res
            // Normalize data if missing new fields
            if (!tool.value.howItWorks) tool.value.howItWorks = ['Connect your wallet', 'Configure settings', 'Launch simulation']
            if (!tool.value.useCases) tool.value.useCases = ['Test farming strategies', 'Optimize gas usage', 'Track wallet health']
            if (!tool.value.about) tool.value.about = tool.value.description

            // Fetch related tools (mock or random from all tools)
            const allTools = await ToolService.getAll()
            if (Array.isArray(allTools)) {
                relatedTools.value = allTools.filter(t => t.id != id).slice(0, 3)
            } else if (allTools.tool) {
                relatedTools.value = allTools.tool.filter(t => t.id != id).slice(0, 3)
            }
        }
    } catch (error) {
        console.error("Failed to load tool", error)
    } finally {
        isLoading.value = false
    }
}
</script>
