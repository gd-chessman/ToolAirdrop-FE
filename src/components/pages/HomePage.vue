<template>
  <div class="min-h-screen bg-[#020617] font-sans text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">

    <header class="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-b from-[#020617]/30 via-[#020617]/80 to-[#020617] z-10"></div>
        <div
          class="absolute inset-0 bg-[url('@/assets/Background.png')] bg-cover bg-center opacity-80 mix-blend-overlay">
        </div>
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] -z-10">
        </div>
      </div>

      <div class="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center mt-10">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-400 mb-8 backdrop-blur-sm">
          <span class="flex h-2 w-2 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          v2.0 đã ra mắt
        </div>

        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          <span class="block text-white mb-2">Tối đa hóa</span>
          <span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Phần thưởng Airdrop
          </span>
        </h1>

        <p class="mt-8 text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          Khám phá airdrop tiền điện tử được kiểm duyệt với công cụ AI. Tham gia cùng 50,000+ thợ săn alpha để tối đa
          hóa phần thưởng với các chiến lược tự động.
        </p>

        <div class="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
<!-- <button @click="router.push('/pricing')"
            class="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-1 transition-all duration-300">
            Tham gia Private
          </button> -->
<!-- <button @click="scrollToSection('free-tools')"
            class="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
            Khám phá công cụ miễn phí
          </button> -->
        </div>

        <div
          class="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-slate-500 text-sm font-medium">
          <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
            <i class="pi pi-shield text-emerald-500"></i> Tuân thủ SOC 2
          </div>
          <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
            <i class="pi pi-check-circle text-emerald-500"></i> Tỷ lệ thành công 97%
          </div>
          <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
            <i class="pi pi-bolt text-emerald-500"></i> Cập nhật thời gian thực
          </div>
        </div>
      </div>
    </header>

    <section class="relative z-30 mt-24 pb-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="stat in stats" :key="stat.label"
            class="bg-[#0f172a]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center flex flex-col items-center gap-3 hover:border-blue-500/30 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-900/10 group">
            <div
              class="w-12 h-12 rounded-xl flex justify-center items-center bg-white/5 group-hover:scale-110 transition-transform duration-300">
              <i :class="`${stat.icon} ${stat.iconColor} text-xl`"></i>
            </div>
            <span class="text-white font-bold text-2xl md:text-3xl tracking-tight">{{ stat.value }}</span>
            <span class="text-slate-500 text-xs md:text-sm uppercase tracking-widest font-bold">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

<!-- <section class="bg-[#020617] py-20 px-6 relative">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
            <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Airdrop</span> Nổi
            bật & Sắp tới
          </h2>
          <p class="max-w-2xl mx-auto text-slate-400 text-lg">
            Khám phá những airdrop lợi nhuận cao nhất với hệ thống kiểm duyệt AI của chúng tôi.
          </p>

          <div class="flex flex-wrap justify-center gap-3 mt-10">
            <button v-for="filter in airdropFilters" :key="filter" @click="activeAirdropFilter = filter" :class="[
              'rounded-xl px-6 py-2.5 text-sm font-bold transition-all duration-300 border',
              activeAirdropFilter === filter
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
            ]">
              {{ filter }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="airdrop in airdrops" :key="airdrop.id"
            @click="router.push({ name: 'DetailAirdrop', params: { id: airdrop.id } })"
            class="bg-[#0f172a] border border-white/5 p-6 rounded-3xl hover:border-cyan-500/40 transition-all duration-300 group relative flex flex-col h-full cursor-pointer shadow-xl">

            <div class="absolute top-6 right-6">
              <span :class="[
                'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5',
                airdrop.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  airdrop.status === 'Hot' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                    'bg-slate-700/50 text-slate-400 border-white/10'
              ]">
                <span v-if="airdrop.status === 'Live'"
                  class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {{ airdrop.status }}
              </span>
            </div>

            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-14 h-14 bg-[#1e293b] rounded-2xl flex items-center justify-center border border-white/5 shrink-0 group-hover:scale-105 transition-transform overflow-hidden shadow-inner">
                <img v-if="airdrop.image" :src="airdrop.image" class="w-full h-full object-cover" />
                <span v-else class="text-xl font-bold text-cyan-400">{{ airdrop.name ? airdrop.name.charAt(0) : '?'
                }}</span>
              </div>
              <div class="min-w-0 pr-12">
                <h3
                  class="text-xl font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors truncate">
                  {{ airdrop.name }}
                </h3>
                <div class="mt-1 flex items-center gap-2">
                  <span class="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider">{{ airdrop.token ||
                    'TBA' }}</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 mb-6">
              <div class="bg-[#020617]/50 rounded-2xl p-4 border border-white/5">
                <div class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Est. Value</div>
                <div class="text-white font-bold text-sm leading-tight">{{ formatPrice(airdrop.price) }}</div>
              </div>
              <div class="bg-[#020617]/50 rounded-2xl p-4 border border-white/5">
                <div class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Total Raise</div>
                <div class="text-emerald-400 font-bold text-sm leading-tight">{{ formatPrice(airdrop.totalRaise) }}
                </div>
              </div>
            </div>

            <div class="mb-6 flex-1">
              <div class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">Featured Backers:</div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="(backer, idx) in (airdrop.supportNetworks && airdrop.supportNetworks.length ? airdrop.supportNetworks.slice(0, 3) : ['TBA'])"
                  :key="idx"
                  class="px-2 py-1 rounded bg-[#020617] border border-cyan-500/20 text-cyan-400 text-[10px] font-bold">
                  {{ backer }}
                </span>
                <span v-if="airdrop.supportNetworks && airdrop.supportNetworks.length > 3"
                  class="px-2 py-1 rounded bg-[#020617] border border-white/5 text-slate-400 text-[10px]">
                  +{{ airdrop.supportNetworks.length - 3 }}
                </span>
              </div>
            </div>

            <div class="pt-6 border-t border-white/5">
              <button
                class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600 hover:to-cyan-600 text-cyan-400 hover:text-white font-bold transition-all border border-cyan-500/30">
                Tham gia ngay
              </button>
            </div>
          </div>
        </div>

        <div class="mt-16 text-center">
          <a href="" @click.prevent="() => {
            router.push('/opportunities')
          }"
            class="px-8 py-4 bg-[#0f172a] border border-white/10 text-slate-300 rounded-xl font-bold hover:bg-white/5 hover:border-white/20 transition-all shadow-lg">
            Xem tất cả {{ totalAirdrops }}+ Airdrop
          </a>
        </div>
      </div>
    </section> -->
<!-- <section class="bg-[#0f172a] border-y border-white/5 py-24 px-6 relative overflow-hidden">
      <div
        class="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen">
      </div>
      <div
        class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] -z-10 pointer-events-none">
      </div>

      <div class="max-w-6xl mx-auto text-center relative z-10">
        <div
          class="inline-block bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
          ✨ Độc quyền hạng Private
        </div>

        <h2 class="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
          Mở khóa Quyền lợi <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">Premium</span>
        </h2>

        <p class="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
          Nâng tầm việc săn airdrop của bạn với các công cụ độc quyền, thông tin chi tiết cá nhân hóa và hỗ trợ cao cấp.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div v-for="benefit in benefits" :key="benefit.id"
            class="bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-white/5 p-8 rounded-[2rem] text-left hover:border-orange-500/30 transition-all duration-300 group hover:shadow-2xl hover:shadow-orange-900/10 relative overflow-hidden">

            <div
              class="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-orange-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ring-1 ring-white/20">
              <i v-if="typeof benefit.icon === 'string' && benefit.icon.startsWith('pi')"
                :class="[benefit.icon, 'text-3xl text-white']"></i>
              <component v-else-if="benefit.icon && benefit.icon !== 'div'" :is="benefit.icon"
                class="w-7 h-7 text-white" />
              <i v-else class="pi pi-star-fill text-3xl text-white"></i>
            </div>

            <h3 class="text-2xl text-white font-bold mb-4 group-hover:text-orange-200 transition-colors">{{ benefit.name
            }}</h3>
            <p class="text-slate-400 mb-8 text-sm leading-relaxed border-b border-white/5 pb-8">{{ benefit.desc }}</p>

            <ul class="space-y-4">
              <li v-for="item in benefit.features" :key="item" class="flex items-center text-sm text-slate-300">
                <div
                  class="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center mr-3 border border-orange-500/20">
                  <i class="pi pi-check text-orange-400 text-[10px] font-bold"></i>
                </div>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <div
          class="relative bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-10 md:p-14 max-w-4xl mx-auto overflow-hidden shadow-2xl">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-purple-500/5"></div>

          <div class="relative z-10">
            <h3 class="text-3xl font-bold mb-3 text-white">Sẵn sàng tham gia Private?</h3>
            <p class="text-slate-400 mb-10 text-lg">Tham gia cùng 5,000+ thành viên cao cấp để tối đa hóa phần thưởng
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
              <button @click="router.push('/pricing')"
                class="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-bold py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_40px_-10px_rgba(249,115,22,0.5)]">
                ⭐ Nâng cấp lên Private - $49/tháng
              </button>
              <button
                class="w-full sm:w-auto bg-[#020617] border border-slate-700 text-white hover:bg-white/5 hover:border-slate-500 py-4 px-10 rounded-2xl font-bold transition-all">
                👁️ Xem Demo
              </button>
            </div>

            <div
              class="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-slate-500 font-medium uppercase tracking-wider">
              <span class="flex items-center gap-2"><i class="pi pi-shield-check text-emerald-500"></i> Hoàn tiền trong
                30 ngày</span>
              <span class="flex items-center gap-2"><i class="pi pi-bolt text-orange-500"></i> Truy cập ngay lập
                tức</span>
            </div>
          </div>
        </div>
      </div>
    </section> -->

<!-- <section id="free-tools" class="bg-[#020617] py-24 px-6 relative border-t border-white/5">
      <div
        class="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[120px] -z-10 pointer-events-none">
      </div>

      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-20">
          <span
            class="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-4 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            Miễn phí vĩnh viễn
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-white mt-6">
            <span class="text-emerald-400">Công cụ miễn phí</span> thiết yếu
          </h2>
          <p class="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
            Bắt đầu hành trình airdrop với các công cụ miễn phí mạnh mẽ. Không cần đăng ký.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="tool in tools.free" :key="tool.id"
            class="bg-[#0f172a] border border-white/5 rounded-[2rem] p-10 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10 group relative overflow-hidden hover:-translate-y-1 flex flex-col h-full">

            <div class="flex justify-between items-start mb-8">
              <div
                class="w-16 h-16 bg-[#020617] rounded-2xl flex items-center justify-center text-emerald-400 border border-white/5 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-lg ring-1 ring-white/5 overflow-hidden">
                <img v-if="tool.image" :src="tool.image" class="w-full h-full object-cover" alt="Icon">
                <i v-else class="pi pi-wrench text-2xl"></i>
              </div>
              <span
                class="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg uppercase tracking-wider border border-emerald-500/20">Phổ
                biến</span>
            </div>

            <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">{{ tool.name
            }}</h3>
            <p class="text-slate-400 text-sm mb-8 leading-relaxed">{{ tool.description }}</p>

            <ul class="space-y-4 mb-10">
              <li v-for="feature in tool.features" :key="feature" class="flex items-center text-sm text-slate-300">
                <i class="pi pi-check text-emerald-400 mr-3 text-xs font-bold"></i>
                {{ feature }}
              </li>
            </ul>

            <button
              class="w-full mt-auto py-4 bg-[#1e293b] text-emerald-400 font-bold rounded-xl border border-emerald-500/20 hover:bg-emerald-500 hover:text-[#020617] hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2 group-hover:translate-y-[-2px]">
              Thử {{ tool.name }} <i class="pi pi-arrow-right text-xs"></i>
            </button>
          </div>
        </div>

        <div
          class="mt-20 bg-[#0f172a] border border-white/5 rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-xl">
          <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div class="relative z-10 flex flex-col items-center">
            <h3 class="text-2xl font-bold text-white mb-3">Muốn công cụ mạnh mẽ hơn?</h3>
            <p class="text-slate-400 mb-10 max-w-xl">Nâng cấp lên gói Private để mở khóa tính năng tự động hóa, quản lý
              đa ví và AI.</p>

            <div class="flex flex-col sm:flex-row justify-center gap-5 w-full max-w-md">
              <button @click="router.push('/pricing')"
                class="flex-1 px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20">
                <i class="pi pi-star-fill text-xs"></i> Khám phá Private
              </button>
              <button
                class="flex-1 px-8 py-4 bg-transparent text-white font-bold rounded-2xl hover:bg-white/5 border border-white/10 transition-all">
                Xem tất cả công cụ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="powerful-tools" class="bg-[#0f172a] py-24 px-6 border-y border-white/5">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white">
            Công cụ mạnh mẽ cho <span class="text-blue-500">Thợ săn Alpha</span>
          </h2>
          <p class="text-slate-400 mt-4 max-w-2xl mx-auto">
            Mọi thứ bạn cần để thống trị cuộc chơi airdrop.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="tool in tools.powerful" :key="tool.id"
            class="bg-[#020617] border border-white/5 rounded-2xl p-8 hover:bg-[#1e293b] transition-all group relative overflow-hidden hover:-translate-y-1 duration-300 flex flex-col h-full">
            <div class="flex justify-between items-start mb-6">
              <div
                class="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform overflow-hidden">
                <img v-if="tool.image" :src="tool.image" class="w-full h-full object-cover" alt="Icon">
                <i v-else class="pi pi-lock text-lg"></i>
              </div>
              <span
                class="text-[10px] font-bold bg-orange-500/10 text-orange-400 px-2 py-1 rounded border border-orange-500/20 uppercase">Riêng
                tư</span>
            </div>
            <h4 class="text-white text-lg font-bold mb-3">{{ tool.name }}</h4>
            <p class="text-slate-400 text-sm leading-relaxed mb-6 h-10 line-clamp-2">{{ tool.description }}</p>
            <ul class="space-y-3 text-sm text-slate-400">
              <li v-for="feature in tool.features" :key="feature" class="flex items-center gap-2">
                <i class="pi pi-check text-emerald-500 text-xs"></i> {{ feature }}
              </li>
            </ul>
            <a href="#"
              class="inline-flex items-center gap-1 mt-auto text-orange-400 text-sm font-bold hover:text-orange-300 transition group-hover:translate-x-1 duration-300">
              Tìm hiểu thêm <i class="pi pi-arrow-right text-xs"></i>
            </a>
          </div>
        </div>
      </div>
    </section> -->

<!-- <section id="pricing" class="py-24 bg-[#020617]">
      <div class="w-full max-w-7xl mx-auto px-6">
        <header class="text-center mb-12">
          <h2 class="text-4xl sm:text-5xl font-extrabold w-full text-center text-white">
            Chọn <span class="text-cyan-400">Gói Săn</span> của bạn
          </h2>
          <p class="mt-4 text-slate-400 mx-auto w-full text-center max-w-2xl">
            Từ công cụ cơ bản miễn phí đến tự động hóa cấp doanh nghiệp.
          </p>

          <div class="mt-8 inline-flex items-center bg-[#0f172a] border border-white/10 rounded-full p-1">
            <span class="px-4 py-1 text-sm text-slate-400 font-medium">Hàng tháng</span>
            <button @click="isAnnualPricing = !isAnnualPricing" :aria-pressed="isAnnualPricing"
              class="relative inline-flex items-center h-7 w-14 rounded-full bg-slate-700 p-0.5 transition-colors focus:outline-none">
              <span :class="[
                'h-6 w-6 rounded-full bg-white transform transition-transform shadow-sm',
                isAnnualPricing ? 'translate-x-7' : 'translate-x-0'
              ]"></span>
            </button>
            <span class="px-4 py-1 text-sm text-white font-medium">Hàng năm <span
                class="text-emerald-400 text-xs ml-1">-20%</span></span>
          </div>
        </header>

        <div class="grid gap-8 md:grid-cols-2 items-start relative">
          <div
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-full bg-cyan-500/10 blur-[100px] -z-10 rounded-full">
          </div>

          <article v-for="plan in pricingPlans" :key="plan.name" :class="[
            'rounded-3xl p-8 flex flex-col transition-all duration-300 h-full',
            plan.isPopular
              ? 'bg-[#0f172a] border-2 border-cyan-500 relative shadow-2xl shadow-cyan-900/20 z-10'
              : 'bg-[#0f172a]/50 border border-white/5 hover:border-white/10 hover:bg-[#0f172a]'
          ]">

            <div v-if="plan.isPopular">
              <span
                class="bg-cyan-500 text-[#020617] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Phổ
                biến nhất</span>
            </div>

            <div class="flex-1">
              <h3 class="text-xl font-bold text-white text-center">{{ plan.name }}</h3>
              <p class="mt-2 text-sm text-slate-400 text-center">{{ plan.description }}</p>

              <div class="mt-8 text-center">
                <div class="font-extrabold text-white flex items-center justify-center gap-1">
                  <span class="text-4xl">$</span>
                  <span class="text-5xl">{{ !isAnnualPricing ? plan.monthlyPrice : plan.annualPrice }}</span>
                  <span class="text-lg text-slate-500 self-end mb-2">/mo</span>
                </div>
              </div>

              <ul class="mt-8 space-y-4 text-sm text-slate-300">
                <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-3">
                  <i class="pi pi-check-circle text-cyan-400 mt-0.5"></i>
                  <span class="leading-tight">{{ feature }}</span>
                </li>
              </ul>
            </div>

            <div class="mt-8 pt-6 border-t border-white/5">
              <button @click="router.push('/pricing')" :class="[
                'w-full py-4 rounded-xl font-bold transition-all duration-300',
                plan.isPopular
                  ? 'bg-cyan-500 text-[#020617] hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25'
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              ]">
                {{ plan.buttonText }}
              </button>
            </div>
          </article>
        </div>

        <div class="mt-20 grid gap-6 md:grid-cols-3">
          <div v-for="faq in quickFaqs" :key="faq.question"
            class="bg-[#0f172a]/50 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <h4 class="font-bold text-white mb-2">{{ faq.question }}</h4>
            <p class="text-sm text-slate-400 leading-relaxed">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section> -->

    <section class="relative py-24 bg-[#0A1226] text-slate-200 overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <div class="relative w-full max-w-4xl mx-auto px-6 text-center">
        <div
          class="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent">
          </div>

          <h2 class="text-3xl sm:text-4xl font-bold text-white">
            Không bao giờ bỏ lỡ một <span class="text-cyan-400">Alpha Drop</span> nào
          </h2>

          <p class="text-slate-400 my-6 max-w-xl mx-auto text-lg">
            Nhận cảnh báo airdrop độc quyền, thông tin chi tiết thị trường và mẹo alpha gửi thẳng vào hộp thư của bạn.
          </p>

          <form @submit.prevent="handleSubscribe"
            class="mt-8 flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input v-model="email" type="email" placeholder="Nhập địa chỉ email của bạn"
              class="px-5 py-4 rounded-xl w-full bg-[#020617] border border-slate-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600" />
            <button type="submit"
              class="px-8 py-4 rounded-xl bg-cyan-500 text-[#020617] font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 whitespace-nowrap">
              Đăng ký
            </button>
          </form>

          <div
            class="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-slate-500 font-medium uppercase tracking-wide">
            <span class="flex items-center gap-1"><i class="pi pi-check"></i> Không spam</span>
            <span class="flex items-center gap-1"><i class="pi pi-check"></i> Hủy đăng ký bất cứ lúc nào</span>
            <span class="flex items-center gap-1"><i class="pi pi-users"></i> 25,000+ Người đăng ký</span>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
// import benefit from '@/service/benefit'
// import tool from '@/service/tool'
// import productService from '@/service/product'
import subscriberService from '@/service/subscriber'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Footer from './Footer.vue'

const activeAirdropFilter = ref('Featured')
const airdropFilters = ['Featured', 'Upcoming', 'Hot', 'Confirmed']
const isAnnualPricing = ref(false)
const email = ref('')
const tools = ref({ free: [], private: [] })
const totalAirdrops = ref(850)
const router = useRouter()

const stats = ref([
  { value: '$12.5M+', label: 'Tổng Phần Thưởng Đã Nhận', icon: 'pi pi-dollar', iconColor: 'text-emerald-400' },
  { value: '850+', label: 'Airdrop Đang Hoạt Động', icon: 'pi pi-gift', iconColor: 'text-purple-400' },
  { value: '1.2M+', label: 'Thợ Săn Alpha', icon: 'pi pi-user', iconColor: 'text-blue-400' },
  { value: '97%', label: 'Tỷ Lệ Thành Công', icon: 'pi pi-trophy', iconColor: 'text-yellow-400' }
])

const airdrops = ref([])

const pricingPlans = ref([
  {
    name: 'Thợ Săn Miễn Phí',
    description: 'Hoàn hảo để bắt đầu săn airdrop',
    monthlyPrice: '0',
    annualPrice: '0',
    features: [
      'Truy cập 100+ airdrop đã xác minh',
      'Cảnh báo airdrop cơ bản',
      'Truy cập Discord cộng đồng'
    ],
    buttonText: 'Bắt đầu miễn phí',
    isPopular: false
  },
  {
    name: 'Alpha Riêng Tư',
    description: 'Dành cho thợ săn nghiêm túc muốn tối đa hóa lợi nhuận',
    monthlyPrice: '49',
    annualPrice: '39',
    features: [
      'Mọi thứ trong Thợ Săn Miễn Phí',
      `Truy cập tất cả ${totalAirdrops.value}+ airdrop`,
      'Bảng điều khiển phân tích nâng cao',
      'Cuộc gọi alpha hàng tuần',
      'Bot tự động nhận thưởng'
    ],
    buttonText: 'Xem chi tiết',
    isPopular: true,
    url: 'https://web.telegram.org/k/#@alan_truong'
  }
])

const quickFaqs = [
  {
    question: 'Cipher 43 Lab khác biệt như thế nào?',
    answer: 'Tự động hóa bằng AI và quy trình kiểm duyệt chuyên gia của chúng tôi đảm bảo bạn chỉ dành thời gian cho các airdrop hợp pháp và có lợi nhuận cao.'
  },
  {
    question: 'Tôi có thể hủy bất cứ lúc nào không?',
    answer: 'Có, bạn có thể hủy đăng ký bất cứ lúc nào. Không cam kết dài hạn hoặc phí ẩn.'
  },
  {
    question: 'Bạn có cung cấp bản dùng thử không?',
    answer: 'Chúng tôi cung cấp bản dùng thử 7 ngày cho các gói được chọn. Hãy liên hệ để bắt đầu bản dùng thử Private.'
  }
]

onMounted(async () => {
  await loadData()
})

async function loadData() {
  // await loadBenefit();
  // await loadHuntingTiers();
  // await loadTool();
  // await loadAirdrops();
  // await loadTotalCount();
}

// async function loadTotalCount() {
//   try {
//     const total = await productService.getTotal();
//     if (total) {
//       totalAirdrops.value = total;
//       // Update stats
//       stats.value[1].value = `${total}+`;
//       // Update pricing - note: pricingPlans is ref now so we can update it
//       pricingPlans.value[1].features[1] = `Truy cập tất cả ${total}+ airdrop`;
//     }
//   } catch (e) {
//     console.error("Failed to load total count", e)
//   }
// }

// async function loadAirdrops() {
//   try {
//     const data = await productService.getTop(3);
//     if (data) {
//       airdrops.value = data
//     }
//   } catch (e) {
//     console.error("Failed to load airdrops", e)
//   }
// }

function formatTime(deadline) {
  if (!deadline) return 'TBA'
  const diff = new Date(deadline) - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? `${days} ngày` : 'Đã kết thúc';
}

const formatPrice = (value) => {
  if (!value && value !== 0) return 'TBA';

  const formatShort = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toLocaleString();
  };

  if (typeof value === 'number') return `$${formatShort(value)}`;
  const strValue = value.toString().trim();
  const num = parseFloat(strValue);
  if (!isNaN(num) && isFinite(strValue)) return `$${formatShort(num)}`;
  return strValue.startsWith('$') ? strValue : `$${strValue}`;
}

// async function loadBenefit() {
//   const data = await benefit.getAll();
//   benefits.value = data;
// }

// async function loadTool() {
//   const freeTool = await tool.getTop(3);
//   const powerfulTool = await tool.getTop(3, 'powerful');
//   tools.value = { free: freeTool, powerful: powerfulTool };
//   console.log(tools)
// }

const handleSubscribe = async () => {
  if (email.value) {
    try {
      const res = await subscriberService.subscribe(email.value)
      console.log('Subscription response:', res)
      email.value = ''
      alert(res.message || 'Đăng ký nhận tin thành công! Cảm ơn bạn.')
    } catch (error) {
      console.error('Subscription error:', error)
      const errorMsg = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.'
      alert(errorMsg)
    }
  } else {
    alert('Vui lòng nhập địa chỉ email hợp lệ.')
  }
}

const benefits = ref([
  {
    id: 1,
    name: 'Phân tích AI',
    desc: 'Thuật toán học sâu dự đoán xác suất airdrop.',
    icon: 'pi pi-chart-line',
    features: ['Chấm điểm rủi ro', 'Ma trận xác suất']
  },
  {
    id: 2,
    name: 'Tự động cày',
    desc: 'Tự động hóa các tác vụ lặp lại trên nhiều chuỗi.',
    icon: 'pi pi-sync',
    features: ['Hỗ trợ đa chuỗi', 'Tối ưu hóa phí gas']
  }
])

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const openPrivateLink = () => {
  window.open('https://web.telegram.org/k/#@alan_truong', '_blank')
}
</script>