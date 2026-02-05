<template>
  <div class="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
    <header class="pt-24 pb-12 px-6 relative overflow-hidden">
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] -z-10">
      </div>

      <div class="max-w-7xl mx-auto text-center md:text-left">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <span class="text-white">Cơ hội </span>
          <span class="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Airdrop
          </span>
        </h1>
        <p class="text-lg text-slate-400 max-w-3xl leading-relaxed">
          Săn và theo dõi các airdrop tiền điện tử lợi nhuận cao nhất với hệ thống phân tích và lọc nâng cao của chúng
          tôi. Ngừng đoán mò, bắt đầu cày.
        </p>
      </div>
    </header>

    <router-view></router-view>

    <main v-show="!route.params.id" class="px-6 pb-20">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row gap-8">

          <aside class="w-full lg:w-72 shrink-0">
            <div
              class="bg-[#0f172a] border border-white/5 rounded-3xl sticky top-24 shadow-xl shadow-black/20 backdrop-blur-sm overflow-hidden transition-all duration-300">

              <!-- Master Toggle Header -->
              <div @click="showFilters = !showFilters"
                class="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors select-none border-b border-transparent"
                :class="{ 'border-white/5': showFilters }">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <i data-lucide="filter" class="w-4 h-4 text-cyan-400"></i>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-white">Bộ lọc</h3>
                    <p class="text-xs text-slate-500 font-medium" v-if="activeFiltersCount > 0">{{ activeFiltersCount }}
                      đang chọn</p>
                    <p class="text-xs text-slate-500 font-medium" v-else>Lọc kết quả</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <button v-if="activeFiltersCount > 0" @click.stop="clearFilters"
                    class="text-xs font-bold text-red-400 hover:text-red-300 px-2 py-1 rounded bg-red-400/10 hover:bg-red-400/20 border border-red-400/20 transition-all">
                    Xóa
                  </button>
                  <i :data-lucide="showFilters ? 'chevron-up' : 'chevron-down'"
                    class="w-4 h-4 text-slate-400 transition-transform"></i>
                </div>
              </div>

              <!-- Collapsible Body -->
              <div v-show="showFilters" class="px-5 pb-4">

                <!-- Status Filter -->
                <div class="py-4 border-b border-white/5">
                  <div class="flex items-center justify-between text-sm font-bold text-white mb-4">
                    <span>Trạng thái</span>
                  </div>
                  <div class="space-y-2 pl-1">
                    <label v-for="status in statusOptions" :key="status"
                      class="flex items-center gap-3 cursor-pointer group/item select-none p-2 rounded-lg hover:bg-white/5 transition-colors"
                      @click.prevent="filters.status = filters.status === status ? null : status">
                      <div class="relative w-4 h-4 flex items-center justify-center">
                        <div class="w-4 h-4 rounded border border-slate-600 transition-colors"
                          :class="filters.status === status ? 'bg-cyan-500 border-cyan-500' : 'group-hover/item:border-cyan-500/50'">
                        </div>
                        <i v-if="filters.status === status" data-lucide="check" class="w-3 h-3 text-white absolute"></i>
                      </div>
                      <span class="text-sm text-slate-400 group-hover/item:text-slate-200"
                        :class="{ 'text-white font-medium': filters.status === status }">{{ translate(status) }}</span>
                    </label>
                  </div>
                </div>

                <!-- Potential Filter -->
                <div class="py-4 border-b border-white/5">
                  <div class="flex items-center justify-between text-sm font-bold text-white mb-4">
                    <span>Tiềm năng</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <button v-for="pot in potentialOptions" :key="pot"
                      @click="filters.potential = filters.potential === pot ? null : pot"
                      class="px-2 py-2 rounded-xl text-xs font-bold border transition-all text-center" :class="filters.potential === pot
                        ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-[#1e293b] border-transparent text-slate-500 hover:border-white/10 hover:text-slate-300'">
                      {{ translate(pot) }}
                    </button>
                  </div>
                </div>

                <!-- Difficulty Filter -->
                <div class="py-4 border-b border-white/5">
                  <div class="flex items-center justify-between text-sm font-bold text-white mb-4">
                    <span>Độ khó</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="diff in difficultyOptions" :key="diff"
                      @click="filters.difficulty = filters.difficulty === diff ? null : diff"
                      class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all" :class="filters.difficulty === diff
                        ? 'bg-slate-700 text-white border-slate-500'
                        : 'bg-[#1e293b] text-slate-500 border-transparent hover:bg-slate-800'">
                      {{ translate(diff) }}
                    </button>
                  </div>
                </div>

                <!-- Category Filter -->
                <div class="py-4 border-b border-white/5">
                  <div class="flex items-center justify-between text-sm font-bold text-white mb-4">
                    <span>Danh mục</span>
                  </div>
                  <div class="max-h-48 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
                    <label v-for="cat in airdropCategories" :key="cat._id"
                      class="flex items-center justify-between cursor-pointer group/item select-none p-2 rounded-lg hover:bg-white/5 transition-colors"
                      @click.prevent="filters.category = filters.category === cat._id ? null : cat._id">
                      <span class="text-sm text-slate-400 group-hover/item:text-slate-200"
                        :class="{ 'text-cyan-400 font-medium': filters.category === cat._id }">{{ cat.name }}</span>
                      <i v-if="filters.category === cat._id" data-lucide="check-circle-2"
                        class="w-3.5 h-3.5 text-cyan-500"></i>
                    </label>
                  </div>
                </div>

                <!-- Estimated Value Filter -->
                <div class="py-4 border-b border-white/5">
                  <div class="flex items-center justify-between text-sm font-bold text-white mb-4">
                    <span>Giá trị ước tính</span>
                  </div>
                  <div class="space-y-4 px-1">
                    <div
                      class="flex items-center justify-between text-xs bg-[#1e293b] p-2 rounded-lg border border-white/5">
                      <span class="text-cyan-400 font-mono">${{ formatNumberShort(filters.priceMin) }}</span>
                      <i data-lucide="arrow-right" class="w-3 h-3 text-slate-600"></i>
                      <span class="text-cyan-400 font-mono">${{ formatNumberShort(filters.priceMax) }}</span>
                    </div>
                    <div class="space-y-6">
                      <div>
                        <input type="range" v-model.number="filters.priceMin" :min="0" :max="100000" :step="1000"
                          :style="{
                            background: `linear-gradient(to right, #06b6d4 0%, #3b82f6 ${(filters.priceMin / 100000) * 100}%, #1e293b ${(filters.priceMin / 100000) * 100}%, #1e293b 100%)`
                          }" class="w-full slider-thumb" />
                      </div>
                      <div>
                        <input type="range" v-model.number="filters.priceMax" :min="0" :max="100000" :step="1000"
                          :style="{
                            background: `linear-gradient(to right, #06b6d4 0%, #3b82f6 ${(filters.priceMax / 100000) * 100}%, #1e293b ${(filters.priceMax / 100000) * 100}%, #1e293b 100%)`
                          }" class="w-full slider-thumb" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Total Raise Filter -->
                <div class="py-4">
                  <div class="flex items-center justify-between text-sm font-bold text-white mb-4">
                    <span>Tổng vốn gọi được</span>
                  </div>
                  <div class="space-y-4 px-1">
                    <div
                      class="flex items-center justify-between text-xs bg-[#1e293b] p-2 rounded-lg border border-white/5">
                      <span class="text-cyan-400 font-mono">${{ formatNumberShort(filters.raiseMin) }}</span>
                      <i data-lucide="arrow-right" class="w-3 h-3 text-slate-600"></i>
                      <span class="text-cyan-400 font-mono">${{ formatNumberShort(filters.raiseMax) }}</span>
                    </div>
                    <div class="space-y-6">
                      <div>
                        <input type="range" v-model.number="filters.raiseMin" :min="0" :max="500000000" :step="100000"
                          :style="{
                            background: `linear-gradient(to right, #06b6d4 0%, #3b82f6 ${(filters.raiseMin / 500000000) * 100}%, #1e293b ${(filters.raiseMin / 500000000) * 100}%, #1e293b 100%)`
                          }" class="w-full slider-thumb" />
                      </div>
                      <div>
                        <input type="range" v-model.number="filters.raiseMax" :min="0" :max="500000000" :step="100000"
                          :style="{
                            background: `linear-gradient(to right, #06b6d4 0%, #3b82f6 ${(filters.raiseMax / 500000000) * 100}%, #1e293b ${(filters.raiseMax / 500000000) * 100}%, #1e293b 100%)`
                          }" class="w-full slider-thumb" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </aside>

          <div class="flex-1">
            <div
              class="mb-8 bg-[#0f172a] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="relative w-full sm:w-96 group">
                <i data-lucide="search"
                  class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-500 transition"></i>
                <input v-model="searchQuery" type="text" placeholder="Tìm kiếm airdrop..."
                  class="w-full bg-[#020617] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all" />
              </div>

              <div class="flex items-center gap-3 w-full sm:w-auto">
                <select v-model="sortBy"
                  class="bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50 cursor-pointer">
                  <option value="value">Sắp xếp theo Giá trị</option>
                </select>

                <div class="relative flex bg-[#020617] border border-white/10 rounded-xl p-1 cursor-pointer select-none"
                  @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'">
                  <div
                    class="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#1e293b] rounded-lg shadow-sm transition-all duration-300"
                    :class="viewMode === 'grid' ? 'left-1' : 'left-1/2'"></div>
                  <div class="relative z-10 p-2 w-10 flex items-center justify-center transition-colors duration-300"
                    :class="viewMode === 'list' ? 'text-cyan-400' : 'text-slate-500'">
                    <i data-lucide="list" class="w-4 h-4 pointer-events-none"></i>
                  </div>
                </div>
              </div>
            </div>

            <div
              :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'">

              <!-- Skeleton Loading State -->
              <template v-if="isLoading">
                <div v-for="n in 6" :key="n"
                  class="bg-[#0f172a] border border-white/5 rounded-3xl p-6 relative flex flex-col h-full animate-pulse">
                  <!-- Header Skeleton -->
                  <div class="flex items-start gap-4 mb-4 pr-16">
                    <div class="w-14 h-14 bg-slate-800 rounded-full shrink-0"></div>
                    <div class="space-y-2 w-full">
                      <div class="h-6 bg-slate-800 rounded w-3/4"></div>
                      <div class="flex gap-2">
                        <div class="h-4 bg-slate-800 rounded w-16"></div>
                        <div class="h-4 bg-slate-800 rounded w-20"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Rating Skeleton -->
                  <div class="flex items-center gap-1 mb-6">
                    <div class="flex gap-1">
                      <div v-for="i in 5" :key="i" class="w-3.5 h-3.5 bg-slate-800 rounded-full"></div>
                    </div>
                  </div>

                  <!-- Badges Skeleton -->
                  <div class="flex flex-wrap gap-2 mb-6">
                    <div class="h-6 bg-slate-800 rounded-full w-24"></div>
                    <div class="h-6 bg-slate-800 rounded-full w-20"></div>
                  </div>

                  <!-- Value & Raise Skeleton -->
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="space-y-2">
                      <div class="h-3 bg-slate-800 rounded w-20"></div>
                      <div class="h-8 bg-slate-800 rounded w-full"></div>
                    </div>
                    <div class="space-y-2">
                      <div class="h-3 bg-slate-800 rounded w-20"></div>
                      <div class="h-8 bg-slate-800 rounded w-full"></div>
                    </div>
                  </div>

                  <!-- Description Skeleton -->
                  <div class="mb-6 space-y-2">
                    <div class="h-4 bg-slate-800 rounded w-full"></div>
                    <div class="h-4 bg-slate-800 rounded w-2/3"></div>
                  </div>

                  <!-- Footer Skeleton -->
                  <div class="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                    <div class="h-4 bg-slate-800 rounded w-24"></div>
                    <div class="h-8 bg-slate-800 rounded w-24"></div>
                  </div>
                </div>
              </template>

              <!-- Real Data -->
              <div v-else v-for="product in filteredProducts" :key="product.id" @click="handleClickProduct(product.id)"
                class="bg-[#0f172a] border border-white/5 rounded-3xl p-6 hover:border-cyan-500/40 transition-all duration-300 group relative flex flex-col h-full">

                <!-- Content Header (Vertical Layout) -->
                <div class="space-y-4 mb-6">
                  <!-- 1. Tên dự án + Image -->
                  <div class="flex items-center gap-4">
                    <div
                      class="w-14 h-14 bg-[#1e293b] rounded-2xl flex items-center justify-center border border-white/5 shrink-0 group-hover:scale-105 transition-transform overflow-hidden shadow-inner">
                      <img v-if="product.image" :src="product.image" class="w-full h-full object-cover" />
                      <span v-else class="text-xl font-bold text-cyan-400">{{ product.name ? product.name.charAt(0) :
                        '?'
                      }}</span>
                    </div>
                    <div class="min-w-0">
                      <h3
                        class="text-xl font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors truncate">
                        {{ product.name }}
                      </h3>
                      <div v-if="product.category" class="mt-1">
                        <span
                          class="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded border border-blue-500/20 font-bold uppercase tracking-wider">
                          {{ typeof product.category === 'object' ? product.category.name : product.category }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- 2. Tiến độ dự án (Status) -->
                  <div class="flex items-center gap-2">
                    <span :class="[
                      'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5',
                      product.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' :
                        product.status === 'Hot' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]' :
                          'bg-slate-700/50 text-slate-400 border-white/10'
                    ]">
                      <span v-if="product.status === 'Live'"
                        class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {{ translate(product.status) }}
                    </span>
                  </div>

                  <!-- 3. Tên token + Social -->
                  <div
                    class="flex items-center justify-between bg-[#020617]/50 rounded-2xl p-3 border border-white/5 shadow-inner">
                    <div class="flex flex-col">
                      <span class="text-[9px] text-slate-500 uppercase font-bold tracking-tight">Token</span>
                      <span class="text-white font-mono text-xs font-bold uppercase truncate max-w-[80px]">{{
                        product.token ||
                        product.shortNamme || 'TBA' }}</span>
                    </div>

                    <div class="flex items-center gap-2">
                      <a v-if="product.website" :href="formatUrl(product.website)" @click.stop target="_blank"
                        class="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-all border border-white/5">
                        <i class="pi pi-globe text-xs"></i>
                      </a>
                      <a v-if="product.twitter" :href="formatUrl(product.twitter)" @click.stop target="_blank"
                        class="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:bg-slate-700 transition-all border border-white/5">
                        <i class="pi pi-twitter text-xs"></i>
                      </a>
                      <a v-if="product.discord" :href="formatUrl(product.discord)" @click.stop target="_blank"
                        class="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition-all border border-white/5">
                        <i class="pi pi-discord text-xs"></i>
                      </a>
                      <a v-if="product.telegram" :href="formatUrl(product.telegram)" @click.stop target="_blank"
                        class="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-all border border-white/5">
                        <i class="pi pi-send text-xs"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Rating -->
                <div class="flex items-center gap-1 mb-6">
                  <i v-for="n in 5" :key="n" data-lucide="star"
                    :class="['w-3.5 h-3.5', n <= (product.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700 fill-slate-800']">
                  </i>
                </div>
                <div class="flex flex-wrap gap-2 mb-6">
                  <div
                    class="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-500 text-xs font-bold">
                    <i class="pi pi-star-fill text-[10px]"></i> {{ product.potential }}
                  </div>
                  <div :class="[
                    'flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold border',
                    product.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      product.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        'bg-red-500/10 text-red-400 border-red-500/20'
                  ]">
                    <i class="pi pi-bolt text-[10px]"></i> {{ product.difficulty }}
                  </div>
                </div>

                <!-- Estimated Value & Total Raise -->
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p class="text-slate-500 text-xs font-medium mb-1">Giá trị ước tính</p>
                    <p class="text-emerald-400 text-lg md:text-xl font-bold font-mono truncate"
                      :title="formatPrice(product.price)">
                      {{ formatPrice(product.price) }}
                    </p>
                  </div>
                  <div>
                    <p class="text-slate-500 text-xs font-medium mb-1">Vốn huy động</p>
                    <p class="text-blue-400 text-lg md:text-xl font-bold font-mono truncate"
                      :title="formatPrice(product.totalRaise)">
                      {{ formatPrice(product.totalRaise) }}
                    </p>
                  </div>
                </div>

                <!-- Description (Scrollable) -->
                <div class="mb-6">
                  <div class="text-slate-400 text-sm leading-relaxed h-16 overflow-y-auto pr-2 custom-scrollbar-sm"
                    @click.stop>
                    {{ product.description }}
                  </div>
                </div>

                <!-- Key Requirements (Scrollable) -->
                <div class="mb-6">
                  <p class="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-2">Key Requirements:</p>
                  <div class="flex flex-wrap gap-2 max-h-20 overflow-y-auto pr-1 custom-scrollbar-sm" @click.stop>
                    <span
                      v-for="(req, idx) in (product.keyRequirements && product.keyRequirements.length ? product.keyRequirements : ['Bridge', 'Swap'])"
                      :key="idx"
                      class="px-3 py-1.5 rounded-lg bg-[#1e293b] border border-white/5 text-slate-300 text-xs font-medium hover:bg-white/5 transition-colors">
                      {{ req }}
                    </span>
                  </div>
                </div>

                <!-- Footer Stats & Action -->
                <div class="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <!-- Featured Backers (Left) -->
                  <div class="flex-1 overflow-hidden pr-4">
                    <p class="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-2">Featured Backers:</p>
                    <div class="flex flex-wrap gap-1.5">
                      <span
                        v-for="(backer, idx) in (product.supportNetworks && product.supportNetworks.length ? product.supportNetworks.slice(0, 2) : ['TBA'])"
                        :key="idx"
                        class="px-2 py-1 rounded bg-[#020617] border border-cyan-500/20 text-cyan-400 text-[10px] font-bold">
                        {{ backer }}
                      </span>
                      <span v-if="product.supportNetworks && product.supportNetworks.length > 2"
                        class="px-2 py-1 rounded bg-[#020617] border border-white/5 text-slate-400 text-[10px]">
                        +{{ product.supportNetworks.length - 2 }}
                      </span>
                    </div>
                  </div>

                  <!-- Track Button (Right) -->
                  <button
                    class="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg shadow-lg transition-all hover:-translate-y-0.5"
                    :class="[
                      authStore.isTracked(product._id)
                        ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-900/20'
                    ]" @click.stop="handleTrack(product)">
                    <i class="pi pi-check-square text-sm"></i>
                    {{ authStore.isTracked(product._id) ? 'Đã theo dõi' : 'Theo dõi' }}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import ProductService from '@/service/product'
import CategoryService from '@/service/category'
import { useRouter, useRoute } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import Footer from './Footer.vue'

const viewMode = ref('grid')
const showFilters = ref(false)
const products = ref([])
const router = useRouter()
const route = useRoute()
const sortBy = ref('rating')
const searchQuery = ref('')
const categories = ref([])
const authStore = useAuthStore()
const airdropCategories = computed(() => {
  return categories.value.filter(cat => !cat.type || cat.type === 'airdrop')
})
const filters = ref({
  status: null,
  potential: null,
  difficulty: null,
  category: null,
  priceMin: 0,
  priceMax: 100000,
  raiseMin: 0,
  raiseMax: 500000000
})

const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.value.status) count++
  if (filters.value.potential) count++
  if (filters.value.difficulty) count++
  if (filters.value.category) count++
  return count
})

const clearFilters = () => {
  filters.value.status = null
  filters.value.potential = null
  filters.value.difficulty = null
  filters.value.category = null
  filters.value.priceMin = 0
  filters.value.priceMax = 100000
  filters.value.raiseMin = 0
  filters.value.raiseMax = 500000000
}

const statusOptions = ['Upcoming', 'Live', 'Ended']
const potentialOptions = ['High', 'Medium', 'Low']
const difficultyOptions = ['Easy', 'Medium', 'Hard']

const dictionary = {
  'Upcoming': 'Sắp tới',
  'Live': 'Đang diễn ra',
  'Ended': 'Đã kết thúc',
  'Hot': 'Nổi bật',
  'High': 'Cao',
  'Medium': 'Trung bình',
  'Low': 'Thấp',
  'Easy': 'Dễ',
  'Hard': 'Khó',
}

function translate(text) {
  return dictionary[text] || text
}

// Hàm nạp lại icons khi DOM thay đổi
const refreshIcons = () => {
  nextTick(() => {
    if (window.lucide) {
      window.lucide.createIcons()
    }
  })
}

function formatNumber(num) {
  if (!num) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
  return num.toString();
}

function formatNumberShort(num) {
  if (!num || num === 0) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

function formatPrice(value) {
  if (!value) return 'TBA';

  const formatShort = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toLocaleString();
  };

  // Nếu là số
  if (typeof value === 'number') {
    return `$${formatShort(value)}`;
  }

  // Nếu là chuỗi
  const strValue = value.toString().trim();

  // Kiểm tra nếu là range (ví dụ: "3000 - 5000")
  if (strValue.includes('-')) {
    const parts = strValue.split('-').map(part => part.trim());
    const formattedParts = parts.map(part => {
      const num = parseFloat(part);
      if (!isNaN(num)) {
        return `$${formatShort(num)}`;
      }
      return part;
    });
    return formattedParts.join(' - ');
  }

  // Nếu là chuỗi số (ví dụ: "3000")
  const num = parseFloat(strValue);
  if (!isNaN(num) && isFinite(strValue)) {
    return `$${formatShort(num)}`;
  }

  return strValue;
}

const formatUrl = (url) => {
  if (!url) return '#';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
}

onMounted(async () => {
  await loadCategories()
  await loadProducts()
  await refreshIcons()
})

async function loadCategories() {
  try {
    categories.value = await CategoryService.getAll()
  } catch (e) { console.error(e) }
}


const isLoading = ref(true)

async function loadProducts() {
  isLoading.value = true
  let sort = undefined
  if (sortBy.value === 'value') {
    sort = '-price'
  }

  const params = {
    page: 1,
    sort,
    status: filters.value.status,
    potential: filters.value.potential,
    difficulty: filters.value.difficulty,
    category: filters.value.category
  }

  try {
    const rs = await ProductService.getAllProduct(params)

    if (!rs || rs.length === 0) {
      products.value = []
    } else {
      products.value = rs
    }
  } catch (error) {
    console.error("Failed to load products:", error)
    products.value = []
  } finally {
    // Add a small delay to prevent flickering if loading is too fast, and to show off the skeleton
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}

watch(filters, () => {
  loadProducts()
}, { deep: true })

watch(sortBy, () => {
  loadProducts()
})

async function handleTrack(product) {
  if (!authStore.user) {
    alert("Vui lòng đăng nhập để theo dõi dự án");
    return;
  }

  try {
    if (authStore.isTracked(product._id)) {
      await authStore.untrack(product._id);
    } else {
      await authStore.track(product._id);
    }
    refreshIcons();
  } catch (error) {
    alert(error.message);
  }
}

function handleClickProduct(id) {
  router.push({ name: 'DetailAirdrop', params: { id } })
}

const filteredProducts = computed(() => {
  let result = products.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(product => {
      return (
        product.name?.toLowerCase().includes(query) ||
        product.shortNamme?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      )
    })
  }

  // Apply price range filter
  result = result.filter(product => {
    if (!product.price) return true // Include products without price

    // Extract numeric value from price
    let priceValue = 0
    if (typeof product.price === 'number') {
      priceValue = product.price
    } else if (typeof product.price === 'string') {
      // Handle range format like "3000 - 5000"
      if (product.price.includes('-')) {
        const parts = product.price.split('-').map(p => parseFloat(p.trim()))
        // Use the average of the range
        priceValue = (parts[0] + parts[1]) / 2
      } else {
        priceValue = parseFloat(product.price)
      }
    }

    // If price is not a valid number, include it
    if (isNaN(priceValue)) return true

    return priceValue >= filters.value.priceMin && priceValue <= filters.value.priceMax
  })

  // Apply total raise filter
  result = result.filter(product => {
    const raise = product.totalRaise || 0
    // Include if raise is 0 (TBA) and filter covers 0, OR filter logic. 
    // Usually if raise is missing (0), we might want to show it or hide it.
    // Let's assume standard range check.
    return raise >= filters.value.raiseMin && raise <= filters.value.raiseMax
  })

  return result
})

// Watch changes to refresh icons (quan trọng khi filter/search thay đổi DOM)
watch([filteredProducts, viewMode], () => {
  refreshIcons()
})
</script>

<style scoped>
/* Custom Scrollbar for Sidebar */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: #020617;
}

aside::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 4px;
}

/* Hide Default Details Marker */
details>summary {
  list-style: none;
}

details>summary::-webkit-details-marker {
  display: none;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

/* Range Slider Styling */
input[type="range"].slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  outline: none;
  border-radius: 3px;
  cursor: pointer;
}

input[type="range"].slider-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(6, 182, 212, 0.6), 0 0 0 3px rgba(6, 182, 212, 0.1);
  transition: all 0.2s ease;
  border: 2px solid #0f172a;
}

/* Small Custom Scrollbar for Description */
.custom-scrollbar-sm::-webkit-scrollbar {
  width: 3px;
}

.custom-scrollbar-sm::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar-sm::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 10px;
}

.custom-scrollbar-sm:hover::-webkit-scrollbar-thumb {
  background: #334155;
}

input[type="range"].slider-thumb::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 3px 12px rgba(6, 182, 212, 0.8), 0 0 0 4px rgba(6, 182, 212, 0.2);
}

input[type="range"].slider-thumb::-webkit-slider-thumb:active {
  transform: scale(1.05);
  box-shadow: 0 1px 6px rgba(6, 182, 212, 0.9), 0 0 0 5px rgba(6, 182, 212, 0.25);
}

input[type="range"].slider-thumb::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  cursor: pointer;
  border: 2px solid #0f172a;
  box-shadow: 0 2px 8px rgba(6, 182, 212, 0.6), 0 0 0 3px rgba(6, 182, 212, 0.1);
  transition: all 0.2s ease;
}

input[type="range"].slider-thumb::-moz-range-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 3px 12px rgba(6, 182, 212, 0.8), 0 0 0 4px rgba(6, 182, 212, 0.2);
}

input[type="range"].slider-thumb::-moz-range-thumb:active {
  transform: scale(1.05);
  box-shadow: 0 1px 6px rgba(6, 182, 212, 0.9), 0 0 0 5px rgba(6, 182, 212, 0.25);
}

/* Track styling - keep minimal to allow inline gradient */
input[type="range"].slider-thumb::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 3px;
}

input[type="range"].slider-thumb::-moz-range-track {
  height: 6px;
  border-radius: 3px;
}
</style>