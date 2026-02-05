<template>
  <div
    class="bg-[#020617] text-slate-200 font-sans min-h-screen pt-24 pb-20 selection:bg-cyan-500/30 selection:text-cyan-200">
    <div class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6">

      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 mb-6 uppercase tracking-wider">
          Các gói dịch vụ
        </div>
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-white">
          Chọn Cấp Độ <span class="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Săn
            Airdrop</span>
        </h1>
        <p class="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Từ các công cụ cơ bản miễn phí đến tự động hóa cấp doanh nghiệp. Tìm gói phù hợp cho chiến lược airdrop của
          bạn.
        </p>

        <div class="flex items-center justify-center gap-4 mt-10">
          <span
            :class="['text-sm font-bold uppercase tracking-wider', !isAnnual ? 'text-white' : 'text-slate-500']">Hàng
            tháng</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="isAnnual" class="sr-only peer" />
            <div
              class="w-14 h-7 bg-[#0f172a] border border-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600 peer-checked:border-cyan-500">
            </div>
          </label>
          <span
            :class="['text-sm font-bold uppercase tracking-wider flex items-center gap-2', isAnnual ? 'text-white' : 'text-slate-500']">
            Hàng năm
            <span
              class="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">-20%</span>
          </span>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">

        <div
          class="relative bg-[#0f172a] border border-white/5 rounded-3xl p-10 hover:border-white/10 transition-all group">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-white mb-2">Thợ Săn Miễn Phí</h3>
            <div class="flex items-baseline justify-center gap-1">
              <span class="text-5xl font-extrabold text-white">$0</span>
              <span class="text-slate-500 font-medium">/mãi mãi</span>
            </div>
            <p class="text-slate-400 mt-4 text-sm">Hoàn hảo để bắt đầu săn airdrop</p>
          </div>

          <div class="space-y-8 mb-10">
            <div>
              <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Bao gồm</h4>
              <ul class="space-y-3">
                <li v-for="(feature, index) in freeFeatures" :key="feature"
                  class="flex items-start gap-3 text-sm text-slate-300">
                  <div
                    class="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 border border-cyan-500/20">
                    <i :class="getFreeFeatureIcon(index)" class="text-cyan-400 text-sm"></i>
                  </div>
                  <span class="flex-1 pt-1">{{ feature }}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Hạn chế</h4>
              <ul class="space-y-3">
                <li v-for="limitation in freeLimitations" :key="limitation"
                  class="flex items-start gap-3 text-sm text-slate-400">
                  <i class="pi pi-times text-slate-600 mt-0.5 text-xs"></i>
                  {{ limitation }}
                </li>
              </ul>
            </div>
          </div>

          <button
            class="w-full py-4 bg-[#1e293b] hover:bg-[#334155] text-white rounded-xl font-bold transition-all border border-white/5">
            Bắt đầu miễn phí
          </button>
        </div>

        <div
          class="relative bg-[#0f172a] border-2 border-cyan-500 rounded-3xl p-10 shadow-2xl shadow-cyan-900/20 transform md:-translate-y-4 hover:scale-[1.02] transition-all z-10">
          <div class="absolute -top-4 left-1/2 -translate-x-1/2">
            <span
              class="bg-cyan-500 text-[#020617] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              Phổ biến nhất
            </span>
          </div>

          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-white mb-2">Alpha Riêng Tư</h3>
            <div class="flex items-baseline justify-center gap-1">
              <span class="text-5xl font-extrabold text-white">${{ isAnnual ? Math.round(pricing.yearly / 12) :
                pricing.monthly }}</span>
              <span class="text-slate-500 font-medium">/tháng</span>
            </div>
            <p v-if="isAnnual" class="text-emerald-400 text-sm mt-2 font-bold">Thanh toán ${{ pricing.yearly }}/năm
              (Tiết kiệm ${{ (pricing.monthly * 12) - pricing.yearly }})</p>
            <p class="text-slate-300 mt-4 text-sm">Dành cho thợ săn nghiêm túc muốn tối đa hóa lợi nhuận</p>
          </div>

          <div class="space-y-6 mb-10">
            <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Tất cả trong Miễn phí, cộng thêm</h4>
            <ul class="space-y-3">
              <li v-for="(feature, index) in premiumFeatures" :key="feature"
                class="flex items-start gap-3 text-sm font-medium text-white">
                <div
                  class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/30 flex-shrink-0">
                  <i :class="getPremiumFeatureIcon(index)" class="text-cyan-400 text-sm"></i>
                </div>
                <span class="flex-1 pt-1">{{ feature }}</span>
              </li>
            </ul>
          </div>

          <button @click="handlePayment" :disabled="isProcessing || authStore.user?.accountType === 'premium'"
            class="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-70 flex items-center justify-center gap-2">
            <span v-if="isProcessing"
              class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <template v-if="authStore.user?.accountType === 'premium'">
              <i class="pi pi-verified"></i> Bạn Đang Là Thành Viên Premium
            </template>
            <template v-else>
              {{ isProcessing ? 'Đang xử lý...' : 'Đăng ký ngay' }}
            </template>
          </button>
          <p
            class="text-center text-[10px] uppercase font-bold text-slate-500 mt-4 tracking-wider flex items-center justify-center gap-1">
            <i class="pi pi-shield"></i> Hoàn tiền trong 30 ngày
          </p>
        </div>
      </div>

      <div class="text-center mb-12">
        <button @click="showComparison = !showComparison"
          class="inline-flex items-center gap-2 text-slate-400 hover:text-white font-bold transition-colors">
          {{ showComparison ? 'Ẩn' : 'Hiện' }} So sánh chi tiết
          <i
            :class="['pi text-xs transition-transform duration-300', showComparison ? 'pi-chevron-up' : 'pi-chevron-down']"></i>
        </button>
      </div>

      <section v-show="showComparison" class="max-w-5xl mx-auto mb-32 animate-fade-in">
        <div class="overflow-hidden rounded-3xl border border-white/5 bg-[#0f172a]">
          <table class="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr class="border-b border-white/5 bg-[#020617]/50">
                <th class="px-8 py-6 text-sm font-bold text-slate-400 uppercase tracking-wider">Tính năng</th>
                <th class="px-8 py-6 text-center w-1/4">
                  <div class="text-white font-bold text-lg">Miễn phí</div>
                </th>
                <th class="px-8 py-6 text-center w-1/4 bg-cyan-500/5 border-l border-cyan-500/10">
                  <div class="text-cyan-400 font-bold text-lg">Alpha Riêng Tư</div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr v-for="row in comparisonTable" :key="row.feature"
                :class="[row.isSection ? 'bg-[#1e293b]/50' : 'hover:bg-white/[0.02]']">
                <td
                  :class="['px-8 py-4 text-sm', row.isSection ? 'font-bold text-white' : 'text-slate-300 font-medium']">
                  {{ row.feature }}
                </td>
                <td class="px-8 py-4 text-center text-sm" :class="getCellClass(row.free)">
                  <component :is="getCellContent(row.free).comp" v-bind="getCellContent(row.free).props">
                    {{ getCellContent(row.free).text }}
                  </component>
                </td>
                <td class="px-8 py-4 text-center text-sm bg-cyan-500/5 border-l border-cyan-500/10"
                  :class="getCellClass(row.premium)">
                  <component :is="getCellContent(row.premium).comp" v-bind="getCellContent(row.premium).props">
                    {{ getCellContent(row.premium).text }}
                  </component>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="max-w-4xl mx-auto pb-20">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Câu hỏi thường gặp</h2>
          <p class="text-slate-400">Mọi thứ bạn cần biết trước khi tham gia săn thưởng</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="faq in faqs" :key="faq.question"
            class="bg-[#0f172a] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all duration-300 group">
            <h3 class="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
              {{ faq.question }}
            </h3>
            <p class="text-sm text-slate-400 leading-relaxed" v-html="faq.answer"></p>
          </div>
        </div>
      </section>

    </div>
    <!-- QR Payment Modal -->
    <div v-if="showQrModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-fade-in relative">
        <button @click="showQrModal = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10">
          <i class="pi pi-times text-xl"></i>
        </button>

        <div class="p-8 text-center">
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Thanh toán qua QR Code</h3>
          <p class="text-gray-500 text-sm mb-6">Quét mã để thanh toán và kích hoạt ngay lập tức</p>

          <div class="bg-white p-4 rounded-xl border-2 border-dashed border-cyan-500/30 mb-6 inline-block">
            <img :src="qrUrl" alt="Payment QR Code" class="w-48 h-48 sm:w-64 sm:h-64 object-contain mx-auto" />
          </div>

          <div class="space-y-3 text-left bg-gray-50 p-4 rounded-xl mb-6">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Ngân hàng:</span>
              <span class="font-bold text-gray-900">{{ paymentInfo.bankName }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Số tài khoản:</span>
              <span class="font-bold text-gray-900">{{ paymentInfo.bankAccount }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Chủ tài khoản:</span>
              <span class="font-bold text-gray-900">{{ paymentInfo.accountName }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Số tiền:</span>
              <span class="font-bold text-cyan-600">{{ formatCurrency(paymentInfo.amount) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Nội dung:</span>
              <span class="font-bold text-red-500">{{ paymentInfo.description }}</span>
            </div>
          </div>

          <p class="text-xs text-center text-gray-400">
            <i class="pi pi-info-circle mr-1"></i>
            Hệ thống sẽ tự động kích hoạt tài khoản của bạn sau khi nhận được thanh toán (1-3 phút).
          </p>
        </div>

        <div class="bg-gray-50 px-8 py-4 text-center">
          <button @click="showQrModal = false" class="text-sm text-cyan-600 font-bold hover:underline">
            Tôi đã thanh toán xong
          </button>
        </div>
      </div>
    </div>

    <FormLogin v-model="showLogin" @switch-to-register="openRegister" />
    <FormRegister v-model="showRegister" @switch-to-login="openLogin" />
    <Footer />

    <!-- Hidden SePay Payment Form -->
    <form ref="sePayForm" method="POST" :action="paymentData.checkoutUrl" style="display: none;">
      <input type="hidden" name="merchant" :value="paymentData.params.merchant" />
      <input type="hidden" name="currency" :value="paymentData.params.currency" />
      <input type="hidden" name="order_amount" :value="paymentData.params.order_amount" />
      <input type="hidden" name="operation" :value="paymentData.params.operation" />
      <input type="hidden" name="order_description" :value="paymentData.params.order_description" />
      <input type="hidden" name="order_invoice_number" :value="paymentData.params.order_invoice_number" />
      <input type="hidden" name="customer_id" :value="paymentData.params.customer_id" />
      <input type="hidden" name="success_url" :value="paymentData.params.success_url" />
      <input type="hidden" name="error_url" :value="paymentData.params.error_url" />
      <input type="hidden" name="cancel_url" :value="paymentData.params.cancel_url" />
      <input type="hidden" name="signature" :value="paymentData.params.signature" />
    </form>
  </div>

</template>

<script setup>
import { ref, h, onMounted } from 'vue'
import Footer from './Footer.vue'
import FormLogin from '@/components/FormLogin.vue'
import FormRegister from '@/components/FormRegister.vue'
import FetchCypher43 from '@/common/api';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import settingsService from '@/service/settings';

const authStore = useAuthStore();
const router = useRouter();

const isAnnual = ref(false)
const showComparison = ref(false)
const isProcessing = ref(false)
const showLogin = ref(false)
const showRegister = ref(false)
const showQrModal = ref(false)
const qrUrl = ref('')
const paymentInfo = ref({})
const sePayForm = ref(null)
const paymentData = ref({
  checkoutUrl: '',
  params: {}
})

const pricing = ref({
  monthly: 49,
  yearly: 470,
  currency: 'USD'
})

onMounted(async () => {
  if (authStore.isAuthenticated) {
    authStore.fetchUserProfile();
  }

  try {
    const res = await settingsService.get();
    if (res.success && res.data.pricing) {
      pricing.value = res.data.pricing;
    }
  } catch (err) {
    console.error("Failed to load settings:", err);
  }
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

const handlePayment = async () => {
  if (!authStore.isAuthenticated) {
    showLogin.value = true;
    return;
  }

  if (authStore.user?.accountType === 'premium') {
    alert('Tài khoản của bạn đã là Premium. Không cần đăng ký thêm.');
    return;
  }

  isProcessing.value = true;
  const plan = isAnnual.value ? 'yearly' : 'monthly';

  try {
    const res = await FetchCypher43('api/payment/create-checkout-url', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan,
        userId: authStore.user._id
      })
    });

    if (res.success) {
      paymentData.value = {
        checkoutUrl: res.checkoutUrl,
        params: res.params
      };

      // Wait for next tick to ensure form is updated with new params
      setTimeout(() => {
        if (sePayForm.value) {
          sePayForm.value.submit();
        }
      }, 100);
    } else {
      alert(res.message || 'Không thể khởi tạo thanh toán. Vui lòng thử lại sau.');
    }
  } catch (error) {
    console.error("Payment Error:", error);
    alert('Đã xảy ra lỗi khi kết nối cổng thanh toán.');
  } finally {
    // We don't set isProcessing to false here because the page will redirect
    // If it fails, we set it to false
  }
}

const openLogin = () => {
  showLogin.value = true;
  showRegister.value = false;
}

const openRegister = () => {
  showRegister.value = true;
  showLogin.value = false;
}

const freeFeatures = [
  'Truy cập hơn 100 airdrop đã xác minh',
  'Cảnh báo airdrop cơ bản',
  'Truy cập Discord cộng đồng',
  'Thư viện nội dung giáo dục'
]

const freeLimitations = [
  '3 airdrop mỗi ngày',
  'Chỉ bộ lọc cơ bản',
  'Giới hạn 5 airdrop theo dõi',
  'Không hỗ trợ ưu tiên'
]

const premiumFeatures = [
  'Truy cập TẤT CẢ 850+ airdrop',
  'Sử dụng công cụ không giới hạn & Dashboard',
  'Phân tích & thông tin chuyên sâu cao cấp',
  'Công cụ tự động hóa hỗ trợ AI',
  'Theo dõi danh mục đầu tư nâng cao',
  'Cảnh báo ưu tiên thời gian thực',
  'Kênh Telegram riêng tư',
  'Cuộc gọi alpha hàng tuần'
]

// Icon mapping functions
const getFreeFeatureIcon = (index) => {
  const icons = [
    'pi pi-database', // Truy cập airdrop
    'pi pi-bell', // Cảnh báo
    'pi pi-discord', // Discord
    'pi pi-book' // Thư viện
  ]
  return icons[index] || 'pi pi-check'
}

const getPremiumFeatureIcon = (index) => {
  const icons = [
    'pi pi-star-fill', // Truy cập TẤT CẢ
    'pi pi-desktop', // Dashboard
    'pi pi-chart-line', // Phân tích
    'pi pi-bolt', // AI automation
    'pi pi-wallet', // Portfolio tracking
    'pi pi-stopwatch', // Real-time alerts
    'pi pi-telegram', // Telegram
    'pi pi-phone' // Alpha calls
  ]
  return icons[index] || 'pi pi-check'
}

const comparisonTable = [
  { feature: 'Tính năng cốt lõi', free: '', premium: '', isSection: true },
  { feature: 'Airdrop đã xác minh', free: '100+', premium: '850+', isSection: false },
  { feature: 'Airdrop mới hàng tuần', free: '5-10', premium: '20-30', isSection: false },
  { feature: 'Alpha Drops Độc quyền', free: false, premium: true, isSection: false },
  { feature: 'Công cụ & Tự động hóa', free: '', premium: '', isSection: true },
  { feature: 'Giới hạn sử dụng tác vụ', free: '3/ngày', premium: 'Không giới hạn', isSection: false },
  { feature: 'Theo dõi ví', free: true, premium: true, isSection: false },
  { feature: 'Tính phí Gas', free: false, premium: true, isSection: false },
  { feature: 'Công cụ Tự động hóa', free: false, premium: true, isSection: false },
  { feature: 'Hỗ trợ & Cộng đồng', free: '', premium: '', isSection: true },
  { feature: 'Truy cập cộng đồng', free: 'Discord', premium: 'Telegram Riêng tư', isSection: false },
  { feature: 'Mức độ hỗ trợ', free: 'Tiêu chuẩn', premium: 'Ưu tiên', isSection: false }
]

const faqs = [
  {
    question: 'Cipher 43 Lab khác biệt ở điểm nào?',
    answer: 'Nhóm alpha của chúng tôi đã kiếm được hơn 2 triệu đô la từ airdrop trong 2 năm qua. Chúng tôi chỉ chia sẻ các dự án chúng tôi trực tiếp tham gia — không spam, chỉ cơ hội thực sự.'
  },
  {
    question: 'Tôi có thể hủy bất cứ lúc nào không?',
    answer: 'Có, bạn có thể hủy đăng ký bất cứ lúc nào chỉ với một cú nhấp chuột từ bảng điều khiển của mình. Không có phí ẩn.'
  },
  {
    question: 'Bạn có hoàn tiền không?',
    answer: 'Chắc chắn rồi. Mọi gói trả phí đều đi kèm với <span class="text-cyan-400 font-bold">bảo đảm hoàn tiền trong 30 ngày</span>. Nếu bạn không hài lòng, chúng tôi sẽ hoàn lại tiền cho bạn.'
  },
  {
    question: 'Làm thế nào để có quyền truy cập?',
    answer: 'Chọn gói Alpha Riêng Tư. Bạn sẽ nhận được quyền truy cập ngay lập tức vào Telegram riêng tư và các công cụ nâng cao ngay sau khi thanh toán.'
  }
]

// Helper functions for table rendering
const getCellClass = (value) => {
  if (value === true) return 'text-emerald-400'
  if (value === false) return 'text-slate-600'
  if (typeof value === 'string' && (value.includes('+') || value === 'Không giới hạn' || value === 'Ưu tiên')) return
  'text-emerald-400 font-bold'
  return 'text-slate-400'
}

const getCellContent = (value) => {
  if (value === true) return { comp: 'i', props: { class: 'pi pi-check text-emerald-400 font-bold' }, text: '' }
  if (value === false) return { comp: 'i', props: { class: 'pi pi-minus text-slate-600 text-xs' }, text: '' }
  return { comp: 'span', props: {}, text: value }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
</style>