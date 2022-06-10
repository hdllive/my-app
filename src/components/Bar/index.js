//封装图标bar组件
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
function Bar({ style, xData, yData, title }) {
  const domRef = useRef()
  const chartInit = () => {
    //初始化echarts实例
    const myChart = echarts.init(domRef.current)
    //绘制图标
    myChart.setOption({
      title: {
        text: title,
      },
      tooltip: {},
      xAxis: {
        data: xData,
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: yData,
        },
      ],
    })
  }
  //执行初始化的函数
  useEffect(() => {
    chartInit()
  }, [])
  return (
    <div>
      {/* 准备一个挂载节点 */}
      <div ref={domRef} style={style}></div>
    </div>
  )
}

export default Bar
