<template>
    <Dialog v-model:visible="visible" modal :style="{ width: '25rem' }" @hide="visible = false" :dismissableMask="true">
        <div class="bg-[#0F172A] flex flex-col items-center justify-center px-4 p-[12px]">
            <h1 class="text-2xl font-semibold text-white">Đặt lại mật khẩu</h1>
            <p class="text-gray-400 mt-1 text-center text-sm">Nhập email để nhận liên kết đặt lại mật khẩu</p>

            <div class="w-full max-w-sm bg-[#1E293B] p-6 rounded-2xl shadow-xl mt-6">
                <label class="text-gray-300 text-sm">Địa chỉ Email</label>
                <div class="relative mt-1">
                    <input type="email" v-model="email" placeholder="Nhập email của bạn"
                        class="w-full bg-[#0F172A] mt-1 px-4 py-3 rounded-xl border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <p v-if="message" class="text-green-500 text-sm mt-3 text-center">{{ message }}</p>
                <p v-if="error" class="text-red-500 text-sm mt-3 text-center">{{ error }}</p>

                <button @click="handleReset" :disabled="loading"
                    class="w-full mt-6 py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 transition disabled:opacity-50">
                    <span v-if="loading" class="animate-spin">⌛</span>
                    Gửi liên kết
                </button>

                <button @click="visible = false" class="w-full mt-3 py-2 text-gray-400 hover:text-white text-sm">
                    Hủy
                </button>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import { ref, computed } from "vue";
import { useAuthStore } from '@/stores/auth';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const visible = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value)
});

const authStore = useAuthStore();
const email = ref("");
const loading = ref(false);
const message = ref("");
const error = ref("");

async function handleReset() {
    if (!email.value) return;
    loading.value = true;
    error.value = "";
    message.value = "";

    try {
        const res = await authStore.forgotPassword(email.value);
        if (res && res.devResetToken) {
            message.value = `Kiểm tra console/email! (DEV TOKEN: ${res.devResetToken})`;
        } else {
            message.value = "Nếu tài khoản tồn tại, liên kết xác thực đã được gửi.";
        }
    } catch (err) {
        error.value = "Gửi liên kết thất bại.";
        console.error(err);
    } finally {
        loading.value = false;
    }
}
</script>
