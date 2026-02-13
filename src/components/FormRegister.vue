<template>
    <Dialog v-model:visible="visible" modal :style="{ width: '30rem' }" @hide="visible = false" :dismissableMask="true">
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
            <h1 class="text-3xl font-semibold text-white">Tạo tài khoản</h1>
            <p class="text-gray-400 mt-1">Tham gia cộng đồng Cryptospoid ngay hôm nay</p>

            <!-- Register Card -->
            <div class="w-full max-w-md bg-[#1E293B] p-6 rounded-2xl shadow-xl mt-6">
                <div class="flex gap-4">
                    <div class="flex-1">
                        <label class="text-gray-300 text-sm">Tên</label>
                        <input type="text" v-model="form.firstName" placeholder="Tên"
                            class="w-full bg-[#0F172A] mt-1 px-4 py-3 rounded-xl border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div class="flex-1">
                        <label class="text-gray-300 text-sm">Họ</label>
                        <input type="text" v-model="form.lastName" placeholder="Họ"
                            class="w-full bg-[#0F172A] mt-1 px-4 py-3 rounded-xl border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                </div>

                <div class="mt-4">
                    <label class="text-gray-300 text-sm">Địa chỉ Email</label>
                    <input type="email" v-model="form.email" placeholder="Nhập email của bạn"
                        class="w-full bg-[#0F172A] mt-1 px-4 py-3 rounded-xl border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div class="mt-4">
                    <label class="text-gray-300 text-sm">Số điện thoại</label>
                    <input type="tel" v-model="form.phoneNumber" placeholder="Nhập số điện thoại của bạn"
                        class="w-full bg-[#0F172A] mt-1 px-4 py-3 rounded-xl border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div class="mt-4">
                    <label class="text-gray-300 text-sm">Mật khẩu</label>
                    <input type="password" v-model="form.password" placeholder="Tạo mật khẩu"
                        class="w-full bg-[#0F172A] mt-1 px-4 py-3 rounded-xl border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div class="mt-4">
                    <label class="text-gray-300 text-sm">Xác nhận mật khẩu</label>
                    <input type="password" v-model="form.confirmPassword" placeholder="Nhập lại mật khẩu"
                        class="w-full bg-[#0F172A] mt-1 px-4 py-3 rounded-xl border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <p v-if="error" class="text-red-500 text-sm mt-2 text-center">{{ error }}</p>
                <p v-if="success" class="text-green-500 text-sm mt-2 text-center">{{ success }}</p>

                <!-- Sign up button -->
                <button @click="handleRegister" :disabled="loading"
                    class="w-full mt-6 py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 transition disabled:opacity-50">
                    <span v-if="loading" class="animate-spin">⌛</span>
                    <span v-else>🚀</span>
                    Đăng ký
                </button>
            </div>

            <!-- Footer -->
            <p class="text-gray-400 text-sm mt-6">
                Đã có tài khoản?
                <a href="#" @click.prevent="switchToLogin" class="text-blue-400 hover:underline">Đăng nhập</a>
            </p>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import { ref, computed, reactive } from "vue";
import { useAuthStore } from '@/stores/auth';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'switch-to-login']);

const visible = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value)
});

const authStore = useAuthStore();
const loading = ref(false);
const error = ref("");
const success = ref("");

const form = reactive({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
});

async function handleRegister() {
    error.value = "";
    success.value = "";

    if (!form.email || !form.password || !form.firstName || !form.lastName) {
        error.value = "Vui lòng điền đầy đủ thông tin";
        return;
    }

    if (form.password !== form.confirmPassword) {
        error.value = "Mật khẩu không khớp";
        return;
    }

    loading.value = true;
    try {
        const res = await authStore.register({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phoneNumber: form.phoneNumber,
            password: form.password
        });

        console.log("Register response:", res);

        // Luôn hiển thị thông báo thân thiện với người dùng
        success.value = "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.";
        if (res && res.devToken) {
            console.log("Dev Token:", res.devToken);
        }

        // Reset form
        form.firstName = "";
        form.lastName = "";
        form.email = "";
        form.phoneNumber = "";
        form.password = "";
        form.confirmPassword = "";

    } catch (err) {
        console.error(err);
        error.value = err.message || "Đăng ký thất bại";
    } finally {
        loading.value = false;
    }
}

function switchToLogin() {
    visible.value = false;
    emit('switch-to-login');
}
</script>
