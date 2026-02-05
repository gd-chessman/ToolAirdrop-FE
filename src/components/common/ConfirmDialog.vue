<template>
    <Transition name="dialog-fade">
        <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="onCancel"></div>

            <!-- Dialog -->
            <div class="flex min-h-full items-center justify-center p-4">
                <Transition name="dialog-scale">
                    <div v-if="show"
                        class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">

                        <!-- Icon -->
                        <div class="pt-8 pb-4 px-6 text-center">
                            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4"
                                :class="iconBgClass">
                                <svg class="h-8 w-8" :class="iconColorClass" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path v-if="type === 'danger'" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    <path v-else-if="type === 'success'" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    <path v-else-if="type === 'info'" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <!-- Title -->
                            <h3 class="text-xl font-bold text-gray-900 mb-2">
                                {{ title }}
                            </h3>

                            <!-- Message -->
                            <p class="text-sm text-gray-600 leading-relaxed">
                                {{ message }}
                            </p>
                        </div>

                        <!-- Actions -->
                        <div class="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
                            <button v-if="showCancel" @click="onCancel"
                                class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
                                {{ cancelText }}
                            </button>
                            <button @click="onConfirm"
                                class="px-5 py-2.5 rounded-lg font-medium shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
                                :class="confirmButtonClass">
                                {{ confirmText }}
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'warning', // 'warning', 'danger', 'success', 'info'
        validator: (value) => ['warning', 'danger', 'success', 'info'].includes(value)
    },
    title: {
        type: String,
        default: 'Are you sure?'
    },
    message: {
        type: String,
        default: 'This action cannot be undone.'
    },
    confirmText: {
        type: String,
        default: 'Confirm'
    },
    cancelText: {
        type: String,
        default: 'Cancel'
    },
    showCancel: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['confirm', 'cancel', 'update:show'])

const iconBgClass = computed(() => {
    switch (props.type) {
        case 'danger':
            return 'bg-red-100'
        case 'success':
            return 'bg-green-100'
        case 'info':
            return 'bg-blue-100'
        default:
            return 'bg-yellow-100'
    }
})

const iconColorClass = computed(() => {
    switch (props.type) {
        case 'danger':
            return 'text-red-600'
        case 'success':
            return 'text-green-600'
        case 'info':
            return 'text-blue-600'
        default:
            return 'text-yellow-600'
    }
})

const confirmButtonClass = computed(() => {
    switch (props.type) {
        case 'danger':
            return 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
        case 'success':
            return 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
        case 'info':
            return 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
        default:
            return 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500'
    }
})

const onConfirm = () => {
    emit('confirm')
    emit('update:show', false)
}

const onCancel = () => {
    emit('cancel')
    emit('update:show', false)
}
</script>

<style scoped>
.dialog-fade-enter-active,
.dialog-fade-leave-active {
    transition: opacity 0.2s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
    opacity: 0;
}

.dialog-scale-enter-active,
.dialog-scale-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-scale-enter-from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
}

.dialog-scale-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
}
</style>
