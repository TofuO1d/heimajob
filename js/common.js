axios.defaults.baseURL = 'https://hmajax.itheima.net'

//封装小弹窗
const showToast = (msg) => {
    const toastDom = document.querySelector('.my-toast')
    const toastMsg = document.querySelector('.toast-body')
    const toastObj = new bootstrap.Toast(toastDom)
    toastObj.show()
    toastMsg.innerHTML = `${msg}`
}

//用户登录校验函数
const checkToken = () => {
    const data = localStorage.getItem('userMsg')?localStorage.getItem('userMsg'):{}
    const { token } = JSON.parse(data)
    if(!token) {
        showToast('请先登录！')
        setTimeout(()=>{
            location.href = './login.html'
        },1500)
    }
}