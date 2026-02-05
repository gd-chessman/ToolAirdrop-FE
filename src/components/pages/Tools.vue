<template>
  <div
    class="bg-[#020617] text-slate-200 font-sans min-h-screen pt-24 pb-20 selection:bg-cyan-500/30 selection:text-cyan-200">
    <div class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]">
      </div>
    </div>

    <main class="relative z-10 max-w-7xl mx-auto px-6 space-y-16">

      <section class="text-center max-w-7xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          <span class="text-white">Công cụ Airdrop</span>
          <span class="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"> Chuyên nghiệp</span>
        </h2>
        <p class="text-lg text-slate-400 leading-relaxed">
          Mọi thứ bạn cần để thống trị cuộc chơi airdrop. Từ những công cụ cơ bản miễn phí đến các công cụ tự động hóa
          cao cấp.
        </p>
      </section>

      <div class="bg-[#0f172a]/80 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-2xl">
        <div class="flex flex-wrap justify-around gap-8 text-center">
          <div class="flex-1 min-w-[120px] group">
            <div :class="[
              'text-4xl font-extrabold mb-2 transition-all duration-1000 transform group-hover:scale-110',
              isLoading ? 'opacity-0 scale-50' : 'opacity-100 scale-100 text-cyan-400'
            ]">
              {{ freeTool }}
            </div>
            <div class="text-sm font-bold text-slate-500 uppercase tracking-wider">Công cụ miễn phí</div>
          </div>

          <div class="w-px bg-white/10 hidden md:block"></div>

          <div class="flex-1 min-w-[120px] group">
            <div :class="[
              'text-4xl font-extrabold mb-2 transition-all duration-1000 delay-200 transform group-hover:scale-110',
              isLoading ? 'opacity-0 scale-50' : 'opacity-100 scale-100 text-orange-400'
            ]">
              {{ premiumTool }}
            </div>
            <div class="text-sm font-bold text-slate-500 uppercase tracking-wider">Công cụ cao cấp</div>
          </div>

          <div class="w-px bg-white/10 hidden md:block"></div>

          <div class="flex-1 min-w-[120px] group">
            <div :class="[
              'text-4xl font-extrabold mb-2 transition-all duration-1000 delay-500 transform group-hover:scale-110',
              isLoading ? 'opacity-0 scale-50' : 'opacity-100 scale-100 text-emerald-400'
            ]">
              24/7
            </div>
            <div class="text-sm font-bold text-slate-500 uppercase tracking-wider">Tự động hóa</div>
          </div>
        </div>
      </div>



      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <template v-if="isLoading">
          <div v-for="n in 8" :key="n"
            class="rounded-3xl p-6 bg-[#0f172a] border border-white/5 animate-pulse flex flex-col">
            <div class="flex items-start mb-4 gap-4">
              <div class="w-12 h-12 bg-slate-800/50 rounded-2xl shrink-0"></div>
              <div class="flex-1">
                <div class="h-5 bg-slate-800/50 rounded w-3/4 mb-2"></div>
                <div class="flex gap-2">
                  <div class="h-4 bg-slate-800/50 rounded w-12"></div>
                  <div class="h-4 bg-slate-800/50 rounded w-12"></div>
                </div>
              </div>
            </div>
            <div class="space-y-3 mb-8 flex-1">
              <div class="h-4 bg-slate-800/50 rounded w-full"></div>
              <div class="h-4 bg-slate-800/50 rounded w-5/6"></div>
              <div class="h-4 bg-slate-800/50 rounded w-4/6"></div>
            </div>
            <div class="h-12 bg-slate-800/50 rounded-xl w-full"></div>
          </div>
        </template>
        <div v-else v-for="tool in tools" :key="tool.id" @click="router.push(`/tools/${tool.id}`)" :class="[
          'rounded-3xl p-6 flex flex-col transition-all duration-300 group border relative overflow-hidden cursor-pointer',
          'bg-[#0f172a] hover:-translate-y-2 hover:shadow-2xl',
          tool.isPremium
            ? 'border-orange-500/20 hover:border-orange-500/50 hover:shadow-orange-900/10'
            : 'border-white/5 hover:border-cyan-500/50 hover:shadow-cyan-900/10'
        ]">
          <div :class="[
            'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500',
            tool.isPremium ? 'bg-orange-500' : 'bg-cyan-500'
          ]"></div>

          <header class="relative z-10 flex items-start justify-between mb-4">
            <div class="flex items-center space-x-4">
              <div :class="[
                'p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110 flex items-center justify-center overflow-hidden',
                tool.image ? 'bg-transparent' : tool.isPremium ? 'bg-orange-500/10 text-orange-400' : 'bg-cyan-500/10 text-cyan-400'
              ]">
                <img v-if="tool.image" :src="tool.image" class="w-10 h-10 object-cover rounded-lg" alt="Tool Icon">
                <div v-else-if="tool.iconSvg" v-html="tool.iconSvg" class="w-6 h-6"></div>
                <div v-else class="w-6 h-6">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-white text-lg font-bold group-hover:text-white transition-colors">{{ tool.name }}</h3>
                <div class="flex gap-2 mt-1">
                  <span v-for="badge in tool.badges" :key="badge" :class="[
                    'text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border',
                    badge === 'HOT' || badge === 'NỔI BẬT' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      badge === 'FREE' || badge === 'MIỄN PHÍ' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  ]">
                    {{ badge }}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <ul :class="[
            'relative z-10 flex-1 space-y-3 text-sm mb-8',
            'text-slate-400'
          ]">
            <li v-for="feature in tool.features" :key="feature" class="flex items-start gap-2">
              <i :class="['pi pi-check mt-1 text-xs', tool.isPremium ? 'text-orange-500' : 'text-cyan-500']"></i>
              <span class="leading-tight">{{ feature }}</span>
            </li>
          </ul>

          <button @click.stop="handleToolAction(tool)" :class="[
            'relative z-10 w-full py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2',
            !canAccess(tool)
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20 hover:brightness-110'
              : 'bg-[#1e293b] text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-[#020617] hover:shadow-lg hover:shadow-cyan-500/20'
          ]">
            <i v-if="!canAccess(tool)" class="pi pi-lock text-sm"></i>
            {{ canAccess(tool) ? 'Sử dụng' : 'Nâng cấp để truy cập' }}
          </button>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import tool from '@/service/tool'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Footer from './Footer.vue'

import CategoryService from '@/service/category'

const router = useRouter()
const authStore = useAuthStore()
const activeFilter = ref('Tất cả')

const isUserPremium = computed(() => {
  return authStore.user?.accountType === 'premium'
})

function canAccess(tool) {
  if (tool.type === 'free') return true
  return isUserPremium.value
}

function handleToolAction(tool) {
  if (canAccess(tool)) {
    router.push(`/tools/${tool.id}`)
  } else {
    router.push('/pricing')
  }
}
const filters = ref(['Tất cả'])

const freeTool = ref(0)
const premiumTool = ref(0)
const isLoading = ref(true)

const tools = ref([])

onMounted(async () => {
  await loadData()
})

async function loadData() {
  await Promise.all([getTools(), fetchCategories()])
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}

async function fetchCategories() {
  try {
    const res = await CategoryService.getAll({ type: 'tool' })
    if (res && res.length > 0) {
      filters.value = ['Tất cả', ...res.map(c => c.name)]
    } else {
      // Fallback if no categories found
      filters.value = ['Tất cả', 'Phân tích', 'Tối ưu hóa', 'Theo dõi', 'Tự động hóa', 'Công cụ AI', 'Cảnh báo', 'Nghiên cứu']
    }
  } catch (error) {
    console.error('Failed to fetch tool categories', error)
    filters.value = ['Tất cả', 'Phân tích', 'Tối ưu hóa', 'Theo dõi', 'Tự động hóa', 'Công cụ AI', 'Cảnh báo', 'Nghiên cứu']
  }
}


async function getTools() {
  let res = await tool.getAll()
  if (!res || res.length === 0) {
    res = [
      {
        id: 1, name: 'Hồ sơ Ví', type: 'free', isPremium: false, isFeatured: true,
        iconSvg: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>',
        badges: ['NỔI BẬT', 'MIỄN PHÍ'], features: ['Hỗ trợ đa chuỗi', 'Phân tích giao dịch']
      },
      {
        id: 2, name: 'Tính phí Gas', type: 'free', isPremium: false,
        iconSvg: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
        badges: ['MIỄN PHÍ'], features: ['Giá gas thời gian thực', 'Dự đoán chi phí']
      },
      {
        id: 3, name: 'Tạo chiến lược AI', type: 'premium', isPremium: true,
        iconSvg: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>',
        badges: ['RIÊNG TƯ'], features: ['Phân tích hỗ trợ AI', 'Chiến lược tùy chỉnh', 'Thông tin thị trường']
      }
    ]
  }

  tools.value = res

  let freeCount = 0
  let premiumCount = 0

  for (let t of tools.value) {
    if (t.type === 'free') {
      freeCount += 1
    } else {
      premiumCount += 1
    }
  }
  animateNumber(freeCount, freeTool)
  animateNumber(premiumCount, premiumTool)
}

function animateNumber(target, refVar) {
  let current = 0
  const duration = 1000
  const stepTime = Math.abs(Math.floor(duration / target))

  const timer = setInterval(() => {
    current += 1
    refVar.value = current
    if (current >= target) {
      clearInterval(timer)
      refVar.value = target
    }
  }, stepTime || 100)
}
</script>