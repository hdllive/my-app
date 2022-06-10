import './index.scss'
import Bar from '@/components/Bar'
const Home = () => {
  return (
    <div>
      {/* 渲染Bar组件 */}
      <Bar
        title="三大框架满意度"
        xData={['vue', 'angular', 'react']}
        yData={[50, 60, 70]}
        style={{ width: '500px', height: '400px' }}
      />

      <Bar
        title="三大框架使用度"
        xData={['vue', 'angular', 'react']}
        yData={[30, 40, 50]}
        style={{ width: '400px', height: '300px' }}
      />
    </div>
  )
}

export default Home
