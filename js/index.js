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
        console.log(res.data);
        showYearSalary(res.data.year)
        showSalary(res.data.salaryData)
        showGroupSalary(res.data.groupData)
        showGenderSalary(res.data.salaryData)
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
    Object.keys(overview).forEach(item => {
        document.querySelector(`.${item}`).innerHTML = overview[item]
    });
}

const showYearSalary = (yearsalary) => {
    const chartDom = document.querySelector('#line')
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: '2022全学科薪资走势',
            top: 12,
            left: 10
          },
          tooltip: {
            trigger: 'item'
          },
        xAxis: {
          type: 'category',
          axisLine:{
            lineStyle:{
                type:'dashed',
                color: '#D3D3D3'
            }
          },
          data: yearsalary.map(item => {
            return item.month
          })
        },
        yAxis: {
          type: 'value',
          splitLine:{
            lineStyle:{
                type: 'dashed'
            }
          }
        },
        series: [
          {
            data: yearsalary.map(item => {
                return item.salary
            }),
            type: 'line',
            smooth: true,
            symbolSize : 8,
            lineStyle:{
                width: 7
            },
            areaStyle: {
                color:{
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops:[
                        {
                            offset: 0,
                            color: 'rgba(85,111,253,0.50)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(85,111,253,0.00)'
                        },
                        
                    ]
                }
            }
          }
        ]
      };
      myChart.setOption(option)
}
const showSalary = (salary) => {
    const chartDom = document.querySelector('#salary')
    const myChart = echarts.init(chartDom);
    const option = {
        title:{
          text: '班级薪资分布',
          top: 12,
          left: 10
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 'bottom'
        },
        series: [
          {
            name: '薪资',
            type: 'pie',
            radius: ['55%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
            },
            labelLine: {
              show: false
            },
            data: salary.map(item => {
                return {
                    value:item.g_count + item.b_count,
                    name:item.label
                }
            })
          }
        ]
      };
    myChart.setOption(option)
}
function showGroupSalary(groupData) {
    // console.log(groupData)
  
    // 初始化实例
    const dom = document.querySelector('#lines')
    const myChart = echarts.init(dom)
  
    // 定义选项和数据
    const option = {
      // 显示提示框
      tooltip: {},
      // 绘图网络
      grid: {
        left: 70,
        top: 30,
        right: 30,
        bottom: 50
      },
      xAxis: {
        type: 'category',
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        // 默认渲染第一组的数据
        data: groupData[1].map(v => v.name),
        // 线的类型，颜色，文字的颜色
        axisLine: {
          lineStyle: {
            color: '#ccc',
            type: 'dashed'
          }
        },
        // 坐标轴刻度标签的相关设置
        axisLabel: {
          // 刻度标签文字的颜色
          color: '#999'
        }
      },
      yAxis: {
        type: 'value',
        // 分割线的类型
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      // series中设置多个图形，就会渲染多个图形
      series: [
        {
          name: '期望薪资',
          // data: [120, 200, 150, 80, 70, 110, 130],
          data: groupData[1].map(v => v.hope_salary),
          type: 'bar',
          // 柱状图的样式
          itemStyle: {
            // 柱状图的颜色
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#34D39A' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(52,211,154,0.2)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        },
        {
          name: '实际薪资',
          // data: [120, 200, 150, 80, 70, 110, 130],
          data: groupData[1].map(v => v.salary),
          type: 'bar',
          // 柱状图的样式
          itemStyle: {
            // 柱状图的颜色
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#499FEE' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(73,159,238,0.2)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
  
    // 基于选项和数据绘制图表
    myChart.setOption(option)
  
  
    // 高亮切换
    const btns = document.querySelector('#btns')
    btns.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn')) {
        // console.log('点了按钮')
        btns.querySelector('.btn-blue').classList.remove('btn-blue')
        e.target.classList.add('btn-blue')
  
        // 数据切换
        const index = e.target.innerText
        // console.log(index)
        const data = groupData[index]
  
        option.xAxis.data = data.map(v => v.name)
        option.series[0].data = data.map(v => v.hope_salary)
        option.series[1].data = data.map(v => v.salary)
  
        // 重新渲染
        myChart.setOption(option)
      }
    })
  
  }
  function showGenderSalary(salaryData) {
    // console.log(salaryData)
  
    // 初始化实例
    const dom = document.querySelector('#gender')
    const myChart = echarts.init(dom)
  
    // 定义选项和数据
    const option = {
      tooltip: {
        trigger: 'item'
      },
      // 不写legend 不会显示图例组件
      // legend: {
      //   top: '5%',
      //   left: 'center'
      // },
      // 颜色
      color: ['#fda224', '#5097ff', '#3abcfa', '#34d39a'],
      // 标题，通过数组设置多个
      title: [
        {
          text: '男女薪资分布',
          left: 10,
          top: 10,
          // text属性的样式
          textStyle: {
            // 文字的大小
            fontSize: 16
          }
        },
        {
          text: '男生',
          left: '50%',
          top: '45%',
          textStyle: {
            fontSize: 12
          },
          textAlign: 'center'
        },
        {
          text: '女生',
          left: '50%',
          top: '85%',
          textStyle: {
            fontSize: 12
          },
          textAlign: 'center'
        }
      ],
      series: [
        {
          type: 'pie',
          radius: ['20%', '30%'],
          // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
          center: ['50%', '30%'],
          data: salaryData.map(v => {
            return { value: v.b_count, name: v.label }
          })
          // data: [
          //   { value: 1048, name: 'Search Engine' },
          //   { value: 735, name: 'Direct' },
          //   { value: 580, name: 'Email' },
          //   { value: 484, name: 'Union Ads' },
          //   { value: 300, name: 'Video Ads' }
          // ]
        },
        {
          type: 'pie',
          radius: ['20%', '30%'],
          center: ['50%', '70%'],
          data: salaryData.map(v => {
            return { value: v.g_count, name: v.label }
          })
          // data: [
          //   { value: 1048, name: 'Search Engine' },
          //   { value: 735, name: 'Direct' },
          //   { value: 580, name: 'Email' },
          //   { value: 484, name: 'Union Ads' },
          //   { value: 300, name: 'Video Ads' }
          // ]
        }
      ]
    }
  
    // 基于选项和数据绘制图表
    myChart.setOption(option)
  }