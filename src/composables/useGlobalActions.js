import { reactive, ref } from 'vue'

const toast = reactive({
    show: false,
    type: 'info',
    title: '',
    message: '',
    duration: 3000
})

const confirmDialog = reactive({
    show: false,
    type: 'warning',
    title: '',
    message: '',
    confirmText: 'Confirm',
    onConfirm: () => { },
    onCancel: () => { }
})

export function useGlobalActions() {
    const showToast = ({ type = 'info', title, message, duration = 3000 }) => {
        toast.type = type
        toast.title = title
        toast.message = message
        toast.duration = duration
        toast.show = true
    }

    const showConfirm = ({ type = 'warning', title, message, confirmText = 'Confirm' }) => {
        return new Promise((resolve) => {
            confirmDialog.type = type
            confirmDialog.title = title
            confirmDialog.message = message
            confirmDialog.confirmText = confirmText
            confirmDialog.show = true

            confirmDialog.onConfirm = () => {
                confirmDialog.show = false
                resolve(true)
            }

            confirmDialog.onCancel = () => {
                confirmDialog.show = false
                resolve(false)
            }
        })
    }

    return {
        toast,
        confirmDialog,
        showToast,
        showConfirm
    }
}
