<template>
  <div v-if="data.name"
    class="bg-[#020617] text-slate-200 font-sans min-h-screen pt-24 pb-20 selection:bg-cyan-500/30 selection:text-cyan-200">
    <div class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]">
      </div>
    </div>

    <main class="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">

      <nav class="flex items-center space-x-2 text-sm font-medium text-slate-500">
        <RouterLink to="/Opportunities" class="hover:text-cyan-400 transition-colors flex items-center gap-1">
          <i class="pi pi-arrow-left text-xs"></i> Airdrop
        </RouterLink>
        <span class="text-slate-700">/</span>
        <span class="text-slate-200 font-bold">{{ data.name }}</span>
      </nav>

      <section class="bg-[#0f172a] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div
          class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50">
        </div>

        <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
          <div class="flex items-start space-x-6">
            <div
              class="bg-[#020617] border border-white/10 rounded-2xl flex items-center justify-center w-20 h-20 shadow-lg">
              <img v-if="data.image" :src="data.image" :alt="data.name" class="w-full h-full object-cover rounded-xl" />
              <span v-else class="text-2xl font-bold text-cyan-500">{{ data.name.charAt(0) }}</span>
            </div>

            <div>
              <div class="flex items-center gap-3 mb-2">
                <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{{ data.name }}</h1>
                <span
                  v-if="data.status === 'active' || data.status === 'Upcoming' || data.status === 'Live' || data.status === 'Sắp diễn ra' || data.status === 'Đang diễn ra'"
                  class="bg-red-500/10 text-red-500 border border-red-500/20 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider animate-pulse">
                  HOT
                </span>
              </div>

              <div class="flex flex-wrap items-center gap-2 mb-4">
                <span class="bg-blue-600 text-white px-2.5 py-0.5 rounded text-xs font-bold">{{ data.shortNamme
                  }}</span>
                <span
                  class="bg-slate-700/50 text-slate-300 border border-white/5 px-2.5 py-0.5 rounded text-xs font-mono">{{
                    data.token }}</span>
                <div
                  class="flex items-center gap-1 ml-2 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-500 text-xs font-bold">
                  <i class="pi pi-star-fill text-[10px]"></i> {{ data.potential || 'Cao' }}
                </div>
                <div :class="[
                  'flex items-center gap-1 ml-2 px-2 py-0.5 rounded text-xs font-bold border',
                  data.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    data.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                ]">
                  <i class="pi pi-bolt text-[10px]"></i> {{ data.difficulty || 'Trung bình' }}
                </div>
              </div>

            </div>
          </div>

          <div class="flex flex-col items-end gap-4 min-w-[200px]">
            <div class="text-right">
              <div class="text-3xl font-mono font-bold text-emerald-400">{{ formatPrice(data.totalRaise) }}</div>
              <div class="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Raise</div>
            </div>
            <div class="flex gap-3 w-full">
              <button @click="handleToggleTrack" :disabled="isTrackingLoading" :class="[
                'flex-1 px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2',
                isTracked
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white shadow-cyan-500/20'
              ]">
                <i
                  :class="[isTrackingLoading ? 'pi pi-spin pi-spinner' : (isTracked ? 'pi pi-check-circle' : 'pi pi-plus-circle')]"></i>
                {{ isTracked ? 'Đang theo dõi' : 'Theo dõi' }}
              </button>
              <a :href="formatUrl(data.website)" target="_blank"
                class="w-12 shrink-0 bg-[#1e293b] hover:bg-[#2e3b4e] text-slate-300 hover:text-cyan-400 border border-white/10 rounded-xl flex items-center justify-center transition-all">
                <i class="pi pi-chart-line text-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div
            class="bg-[#020617] border border-white/5 rounded-2xl p-5 text-center group hover:border-cyan-500/30 transition-colors">
            <div class="text-emerald-400 text-xl font-bold mb-1">{{ formatPrice(data.price) }}</div>
            <div class="text-[10px] text-slate-500 uppercase font-bold tracking-wider group-hover:text-slate-400">
              Estimated Value
            </div>
          </div>
          <div
            class="bg-[#020617] border border-white/5 rounded-2xl p-5 text-center group hover:border-purple-500/30 transition-colors">
            <div class="text-purple-400 text-xl font-bold mb-1">{{ (data.supportNetworks?.length || '0') }}</div>
            <div class="text-[10px] text-slate-500 uppercase font-bold tracking-wider group-hover:text-slate-400">
              Backers
            </div>
          </div>
          <div
            class="bg-[#020617] border border-white/5 rounded-2xl p-5 text-center group hover:border-yellow-500/30 transition-colors">
            <div class="text-yellow-400 text-xl font-bold mb-1">
              {{ data.deadline ? new Date(data.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                :
                'TBA' }}
            </div>
            <div class="text-[10px] text-slate-500 uppercase font-bold tracking-wider group-hover:text-slate-400">
              Deadline
            </div>
          </div>
          <div
            class="bg-[#020617] border border-white/5 rounded-2xl p-5 text-center group hover:border-blue-500/30 transition-colors">
            <div class="text-blue-400 text-xl font-bold mb-1 truncate px-2" :title="data.networkd || 'N/A'">{{
              data.networkd || 'N/A' }}</div>
            <div class="text-[10px] text-slate-500 uppercase font-bold tracking-wider group-hover:text-slate-400">Chain
            </div>
          </div>
        </div>

        <div class="border-b border-white/5 mb-8">
          <nav class="flex space-x-8">
            <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="[
              'pb-4 text-sm font-bold transition-all relative',
              activeTab === tab ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
            ]">
              {{ tab }}
              <span v-if="activeTab === tab"
                class="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
            </button>
          </nav>
        </div>

        <div v-if="activeTab === 'Tổng quan'" class="space-y-8 animate-fade-in">

          <article>
            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <i class="pi pi-info-circle text-cyan-500"></i> Về {{ data.name }}
            </h3>
            <div class="bg-[#020617]/50 border border-white/5 rounded-2xl p-6 text-slate-400 text-sm leading-relaxed">
              {{ data.about || 'Không có thông tin.' }}
              <br><br>
              {{ data.description }}
            </div>
          </article>

          <article v-if="data.keyRequirements && data.keyRequirements.length > 0">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <i class="pi pi-list-check text-emerald-500"></i> Key Requirements
            </h3>
            <div class="bg-[#020617]/50 border border-white/5 rounded-2xl p-6">
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li v-for="req in data.keyRequirements" :key="req" class="flex items-start space-x-3 group">
                  <div
                    class="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                    <i class="pi pi-check text-[10px] text-emerald-500"></i>
                  </div>
                  <span class="text-slate-300 text-sm group-hover:text-white transition-colors">{{ req }}</span>
                </li>
              </ul>
            </div>
          </article>

          <article v-if="data.supportNetworks && data.supportNetworks.length > 0">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <i class="pi pi-users text-blue-500"></i> Featured Backers
            </h3>
            <div class="flex flex-wrap gap-3">
              <span v-for="backer in data.supportNetworks" :key="backer"
                class="bg-[#1e293b] text-slate-300 border border-white/5 px-4 py-2 rounded-xl text-xs font-bold hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-default">
                {{ backer }}
              </span>
            </div>
          </article>
        </div>

        <div v-else-if="activeTab === 'Cộng đồng'" class="animate-fade-in">
          <div class="bg-[#0f172a] border border-white/5 rounded-3xl p-8">
            <div class="flex items-center justify-between mb-8">
              <h3 class="text-2xl font-bold text-white flex items-center gap-3">
                Mạng xã hội {{ data.name }}
              </h3>
            </div>

            <div class="flex flex-wrap gap-4">
              <!-- Website -->
              <a :href="formatUrl(data.website)" :target="formatUrl(data.website) ? '_blank' : null"
                class="flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all duration-300 group"
                :class="data.website ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/50 hover:-translate-y-1' : 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed pointer-events-none'">
                <i class="pi pi-globe text-lg" :class="data.website ? 'text-cyan-400' : 'text-slate-500'"></i>
                <span :class="data.website ? 'text-slate-300 font-medium' : 'text-slate-500'">Website</span>
              </a>

              <!-- Twitter/X -->
              <a :href="formatUrl(data.twitter)" :target="formatUrl(data.twitter) ? '_blank' : null"
                class="flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all duration-300 group"
                :class="data.twitter ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/50 hover:-translate-y-1' : 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed pointer-events-none'">
                <i class="pi pi-twitter text-lg" :class="data.twitter ? 'text-cyan-400' : 'text-slate-500'"></i>
                <span :class="data.twitter ? 'text-slate-300 font-medium' : 'text-slate-500'">X</span>
              </a>

              <!-- Discord -->
              <a :href="formatUrl(data.discord)" :target="formatUrl(data.discord) ? '_blank' : null"
                class="flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all duration-300 group"
                :class="data.discord ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/50 hover:-translate-y-1' : 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed pointer-events-none'">
                <i class="pi pi-discord text-lg" :class="data.discord ? 'text-cyan-400' : 'text-slate-500'"></i>
                <span :class="data.discord ? 'text-slate-300 font-medium' : 'text-slate-500'">Discord</span>
              </a>

              <!-- Gitbook -->
              <a :href="formatUrl(data.gitbook)" :target="formatUrl(data.gitbook) ? '_blank' : null"
                class="flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all duration-300 group"
                :class="data.gitbook ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/50 hover:-translate-y-1' : 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed pointer-events-none'">
                <i class="pi pi-book text-lg" :class="data.gitbook ? 'text-cyan-400' : 'text-slate-500'"></i>
                <span :class="data.gitbook ? 'text-slate-300 font-medium' : 'text-slate-500'">Docs</span>
              </a>

              <!-- Telegram -->
              <a :href="formatUrl(data.telegram)" :target="formatUrl(data.telegram) ? '_blank' : null"
                class="flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all duration-300 group"
                :class="data.telegram ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/50 hover:-translate-y-1' : 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed pointer-events-none'">
                <i class="pi pi-send text-lg" :class="data.telegram ? 'text-cyan-400' : 'text-slate-500'"></i>
                <span :class="data.telegram ? 'text-slate-300 font-medium' : 'text-slate-500'">Telegram</span>
              </a>
            </div>
          </div>
        </div>

        <div v-else-if="activeTab === 'Hướng dẫn'" class="animate-fade-in">
          <div class="bg-[#0f172a] border border-white/5 rounded-3xl p-8 guide-content">
            <h3 class="text-2xl font-bold text-white mb-6">Hướng dẫn chi tiết</h3>
            <div v-if="data.guide" v-html="data.guide"
              class="guide-content prose prose-invert max-w-none prose-a:text-cyan-400 prose-headings:text-slate-200 text-slate-300">
            </div>
            <div v-else class="text-center py-10">
              <p class="text-slate-400">Hướng dẫn chi tiết đang được cập nhật.</p>
            </div>
          </div>
        </div>

        <div v-else-if="activeTab === 'Tin tức'" class="animate-fade-in">
          <div class="bg-[#0f172a] border border-white/5 rounded-3xl p-6 md:p-8">
            <h3 class="text-2xl font-bold text-white mb-6">Cập nhật mới nhất</h3>

            <div v-if="data.updates && data.updates.length > 0" class="flex flex-col md:flex-row gap-6">
              <!-- Sidebar List -->
              <div class="w-full md:w-1/3 space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <button v-for="(update, idx) in sortedUpdates" :key="idx" @click="selectedUpdate = update"
                  class="w-full text-left p-4 rounded-xl border transition-all duration-300 group relative overflow-hidden"
                  :class="selectedUpdate === update ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-white/5 border-white/5 hover:bg-white/10'">
                  <div class="relative z-10">
                    <div class="text-xs font-mono mb-1"
                      :class="selectedUpdate === update ? 'text-cyan-400' : 'text-slate-500'">{{ new
                        Date(update.date).toLocaleDateString() }}</div>
                    <h4 class="font-bold text-sm line-clamp-2"
                      :class="selectedUpdate === update ? 'text-white' : 'text-slate-300 group-hover:text-white'">{{
                        update.title }}</h4>
                  </div>
                  <div v-if="selectedUpdate === update"
                    class="absolute left-0 top-0 h-full w-1 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                </button>
              </div>

              <!-- Content Area -->
              <div class="w-full md:w-2/3 bg-[#020617]/50 border border-white/5 rounded-2xl p-6 min-h-[300px]">
                <div v-if="selectedUpdate" class="animate-fade-in">
                  <div class="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                    <span
                      class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">Cập
                      nhật</span>
                    <span class="text-slate-500 text-sm">{{ new Date(selectedUpdate.date).toLocaleDateString(undefined,
                      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                  </div>
                  <h2 class="text-xl md:text-2xl font-bold text-white mb-6">{{ selectedUpdate.title }}</h2>
                  <div class="prose prose-invert max-w-none prose-sm text-slate-300 leading-relaxed"
                    v-html="selectedUpdate.content"></div>
                </div>
                <div v-else class="h-full flex flex-col items-center justify-center text-slate-500 py-20">
                  <i class="pi pi-inbox text-4xl mb-2 opacity-50"></i>
                  <p>Chọn một bản cập nhật để xem chi tiết</p>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-12">
              <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-bell-slash text-slate-500 text-2xl"></i>
              </div>
              <p class="text-slate-400">Chưa có cập nhật nào.</p>
            </div>
          </div>
        </div>

        <div v-else class="py-20 text-center">
          <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <i class="pi pi-lock text-slate-500 text-2xl"></i>
          </div>
          <p class="text-slate-400 font-medium">Nội dung cho <span class="text-cyan-400">{{ activeTab }}</span> sẽ sớm
            ra mắt...</p>
        </div>
      </section>
    </main>
  </div>

  <div v-else class="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-slate-400 space-y-4">
    <div class="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
    <p class="font-medium animate-pulse">Đang tải dữ liệu dự án...</p>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ProductService from '@/service/product'
import { useAuthStore } from '@/stores/auth'
import { useGlobalActions } from '@/composables/useGlobalActions'
import Footer from './Footer.vue'

const activeTab = ref('Tổng quan')
const tabs = ['Tổng quan', 'Hướng dẫn', 'Tin tức', 'Cộng đồng']
const id = useRoute().params.id
const data = ref({})
const selectedUpdate = ref(null)

const authStore = useAuthStore()
const { showToast } = useGlobalActions()
const isTrackingLoading = ref(false)

const isTracked = computed(() => authStore.isTracked(id))

async function handleToggleTrack() {
  if (!authStore.isAuthenticated) {
    showToast({
      type: 'warning',
      title: 'Yêu cầu đăng nhập',
      message: 'Vui lòng đăng nhập để sử dụng tính năng theo dõi.'
    })
    return
  }

  isTrackingLoading.value = true
  try {
    if (isTracked.value) {
      await authStore.untrack(id)
      showToast({
        type: 'success',
        title: 'Thành công',
        message: 'Đã bỏ theo dõi dự án.'
      })
    } else {
      await authStore.track(id)
      showToast({
        type: 'success',
        title: 'Thành công',
        message: 'Đã thêm dự án vào danh sách theo dõi.'
      })
    }
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Lỗi',
      message: error.message || 'Có lỗi xảy ra, vui lòng thử lại sau.'
    })
  } finally {
    isTrackingLoading.value = false
  }
}

const sortedUpdates = computed(() => {
  if (!data.value.updates) return []
  return [...data.value.updates].sort((a, b) => new Date(b.date) - new Date(a.date))
})

onMounted(async () => {
  await getData()
})

async function getData() {
  const res = await ProductService.getProductById(id);

  if (res && res.name) {
    data.value = res;
    if (data.value.updates && data.value.updates.length > 0) {
      // Sort desc by date
      const sorted = [...data.value.updates].sort((a, b) => new Date(b.date) - new Date(a.date));
      selectedUpdate.value = sorted[0];
    }
  } else {
    // Handle error or redirect if product not found
    console.error("Product not found");
  }
}

const formatPrice = (value) => {
  if (!value && value !== 0) return 'TBA';

  const formatShort = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toLocaleString();
  };

  if (typeof value === 'number') {
    return `$${formatShort(value)}`;
  }

  const strValue = value.toString().trim();

  if (strValue.includes('-')) {
    const parts = strValue.split('-').map(part => part.trim());
    const formattedParts = parts.map(part => {
      const num = parseFloat(part);
      if (!isNaN(num)) return `$${formatShort(num)}`;
      return part;
    });
    return formattedParts.join(' - ');
  }

  const num = parseFloat(strValue);
  if (!isNaN(num) && isFinite(strValue)) {
    return `$${formatShort(num)}`;
  }

  return strValue.startsWith('$') ? strValue : `$${strValue}`;
}

const formatUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
}

</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

/* Custom styles for Guide content */

.guide-content a:hover {
  color: #60a5fa !important;
}

.guide-content :deep(img) {
  border-radius: 1.5rem !important;
  /* Increased for a more premium look */
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  /* Add subtle shadow */
  border: 1px solid rgba(255, 255, 255, 0.1);
  /* Subtle border for visibility */
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
  margin-left: auto !important;
  margin-right: auto !important;
  display: block !important;
  max-width: 100% !important;
  height: auto !important;
  transition: transform 0.3s ease;
}

.guide-content :deep(img:hover) {
  transform: scale(1.02);
  /* Slight zoom effect for premium feel */
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #020617;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 4px;
}
</style>