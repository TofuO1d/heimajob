//验证token
checkToken()
//回显用户名
renderUname()
//退出登录
logout()
//获取首页展示数据
const getData = async() => {
    try {
        const res = await axios({
            url:'/dashboard',
            methods: 'GET',
        })
        showOverview(res.data.overview)
    } catch (err) {
        // if(err.response.status === 401){
        //     showToast('登陆信息过期，请重新登录')
        //     localStorage.removeItem('userMsg')
        //     setTimeout(()=>{
        //         location.href = './login.html'
        //     },1500)
        // }
    }
}
getData()

//展示Overview面板数据
const showOverview = (overview) => {
    console.log(overview);
    Object.keys(overview).forEach(item => {
        document.querySelector(`.${item}`).innerHTML = overview[item]
    });
}