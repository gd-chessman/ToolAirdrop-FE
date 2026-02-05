<template>
    <Dialog v-model:visible="visible" modal :style="{ width: '25rem' }" @hide="visible = false" :dismissableMask="true">
        <div class="bg-[#0F172A] flex flex-col items-center justify-center px-4 p-[12px]">
            <!-- Logo -->
            <div
                class="w-16 h-16 mb-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9"></circle>
                </svg>
            </div>

            <!-- Title -->
            <h1 class="text-3xl font-semibold text-white">Chào mừng trở lại</h1>
            <p class="text-gray-400 mt-1">Đăng nhập vào tài khoản Cipher 43 Lab của bạn</p>

            <!-- Tabs -->
            <div class="flex w-full max-w-sm mt-10 bg-[#1E293B] rounded-xl p-1">
                <button class="flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                    :class="tab === 'email' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'text-gray-400'"
                    @click="tab = 'email'">
                    <span>📧</span> Email
                </button>

                <button class="flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                    :class="tab === 'web3' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'text-gray-400'"
                    @click="tab = 'web3'">
                    ⚡ Web3
                </button>
            </div>

            <!-- Login Card -->
            <div class="w-full max-w-sm bg-[#1E293B] p-6 rounded-2xl shadow-xl mt-6">
                <!-- Email Tab Content -->
                <div v-if="tab === 'email'">
                    <!-- Email -->
                    <label class="text-gray-300 text-sm">Địa chỉ Email</label>
                    <div class="relative mt-1">
                        <input type="email" v-model="email" placeholder="Nhập email của bạn"
                            class="w-full bg-[#0F172A] mt-1 px-4 py-3 rounded-xl border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <!-- Password -->
                    <label class="text-gray-300 text-sm mt-4 block">Mật khẩu</label>
                    <div class="relative mt-1">
                        <input type="password" v-model="password" placeholder="Nhập mật khẩu của bạn"
                            class="w-full bg-[#0F172A] mt-1 px-4 py-3 rounded-xl border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <p v-if="error" class="text-red-500 text-sm mt-3 text-center">{{ error }}</p>

                    <!-- Remember + Forgot -->
                    <div class="flex items-center justify-between mt-4 text-sm">
                        <label class="flex items-center gap-2 text-gray-400">
                            <input type="checkbox" v-model="remember" />
                            Ghi nhớ đăng nhập
                        </label>
                        <a href="#" @click.prevent="switchToForgot" class="text-blue-400 hover:underline">Quên
                            mật khẩu?</a>
                    </div>

                    <!-- Sign in button -->
                    <button @click="login" :disabled="loading"
                        class="w-full mt-6 py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 transition disabled:opacity-50">
                        <span v-if="loading" class="animate-spin">⌛</span>
                        <span v-else>🔄</span>
                        Đăng nhập
                    </button>
                </div>

                <!-- Web3 Tab Content (Under Development) -->
                <div v-else class="text-center py-8">
                    <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-3xl">🚧</span>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Đang phát triển</h3>
                    <p class="text-gray-400 text-sm">
                        Tính năng đăng nhập Web3 đang được xây dựng. Vui lòng quay lại sau!
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <p class="text-gray-400 text-sm mt-6">
                Chưa có tài khoản?
                <a href="#" @click.prevent="switchToRegister" class="text-blue-400 hover:underline">Đăng ký miễn phí</a>
            </p>
        </div>
    </Dialog>

    <!-- Unverified Account Dialog -->
    <Dialog v-model:visible="showUnverifiedDialog" modal :style="{ width: '28rem' }" :dismissableMask="true">
        <div class="bg-[#0F172A] p-6 text-center">
            <div class="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="pi pi-exclamation-triangle text-amber-500 text-3xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Tài khoản chưa xác thực</h3>
            <p class="text-gray-400 mb-8 leading-relaxed">
                Tài khoản của bạn đã được đăng ký nhưng chưa được xác thực email.
                Vui lòng kiểm tra hộp thư đến (hoặc thư rác) để tìm liên kết xác thực chúng tôi đã gửi.
            </p>
            <div class="flex flex-col gap-3">
                <button @click="showUnverifiedDialog = false"
                    class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:opacity-90 transition">
                    Đã hiểu
                </button>
                <p class="text-gray-500 text-sm">
                    Không tìm thấy email? <a href="#" @click.prevent="switchToRegister"
                        class="text-blue-400 hover:underline">Hãy thử đăng ký lại</a> để hệ thống gửi lại link mới.
                </p>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import { ref, computed } from "vue";
import { useAuthStore } from '@/stores/auth';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'switch-to-register', 'switch-to-forgot']);

const visible = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value)
});

const authStore = useAuthStore();
const tab = ref("email");
const email = ref("");
const password = ref("");
const remember = ref(false);
const loading = ref(false);
const error = ref("");
const showUnverifiedDialog = ref(false);

async function login() {
    error.value = "";
    if (!email.value || !password.value) {
        error.value = "Vui lòng nhập email và mật khẩu";
        return;
    }

    loading.value = true;
    try {
        await authStore.login(email.value, password.value);
        visible.value = false;
        // Có thể reload page hoặc redirect nếu cần
        window.location.reload();
    } catch (err) {
        console.error("Login component error:", err);

        // Nếu là lỗi 403 (chưa verify), hiển thị dialog riêng
        if (err.message && err.message.includes('xác thực email')) {
            visible.value = false; // Đóng form login
            showUnverifiedDialog.value = true; // Mở dialog thông báo
        } else {
            error.value = err.message || "Đăng nhập thất bại";
        }
    } finally {
        loading.value = false;
    }
}

function switchToRegister() {
    visible.value = false;
    emit('switch-to-register');
}

function switchToForgot() {
    visible.value = false;
    emit('switch-to-forgot');
}
</script>