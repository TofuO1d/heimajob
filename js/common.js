axios.defaults.baseURL = 'https://hmajax.itheima.net'

//封装小弹窗
const showToast = (msg) => {
    const toastDom = document.querySelector('.my-toast')
    const toastMsg = document.querySelector('.toast-body')
    const toastObj = new bootstrap.Toast(toastDom)
    toastObj.show()
    toastMsg.innerHTML = `${msg}`
}