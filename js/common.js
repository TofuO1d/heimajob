axios.defaults.baseURL = 'https://hmajax.itheima.net'

//封装小弹窗
const showToast = (msg) => {
    const toastDom = document.querySelector('.my-toast')
    const toastMsg = document.querySelector('.toast-body')
    const toastObj = new bootstrap.Toast(toastDom)
    toastObj.show()
    toastMsg.innerHTML = `${msg}`
}
const data = localStorage.getItem('userMsg')?JSON.parse(localStorage.getItem('userMsg')):{}
//用户登录校验函数
const checkToken = () => {
    const { token } = data
    if(!token) {
        showToast('请先登录！')
        setTimeout(()=>{
            location.href = './login.html'
        },1500)
    }
}

//用户名回显
const renderUname = () => {
    const { username } = data
    document.querySelector('.username').innerHTML = username
}

//退出用户按钮
const logout = () => {
    const logoutBtn = document.querySelector('#logout')
    logoutBtn.addEventListener('click',() => {
        localStorage.removeItem('userMsg')
        showToast('退出登录成功')
        setTimeout(()=>{
            location.href = './login.html'
        },1500)
    })
}

//请求拦截器
axios.interceptors.request.use(config => {
// Do something before request is sent
    // console.log(config.headers);
    const { token } = data
    config.headers['Authorization'] = token
    return config;
},error => {
// Do something with request error
    return Promise.reject(error);
});

//响应拦截器
axios.interceptors.response.use(response => {
// Do something before response is sent
    return response.data;
},error => {
// Do something with response error
    if(error.response.status === 401){
        showToast('登陆信息过期，请重新登录')
        localStorage.removeItem('userMsg')
        setTimeout(()=>{
            location.href = './login.html'
        },1500)
    }
    return Promise.reject(error);
});