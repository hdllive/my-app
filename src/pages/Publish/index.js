import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { http } from '@/utils'

const { Option } = Select

const Publish = () => {
  const { channelStore } = useStore()
  //存放上次图片的列表
  const [fileList, setFileList] = useState([])
  //声明一个暂存仓库
  const cacheImgList = useRef([])

  const onUploadChange = ({ fileList }) => {
    const formatlist = fileList.map((file) => {
      if (file.response) {
        return {
          url: file.response.data.url,
        }
      }
      return file
    })
    // console.log(fileList)
    //采取受控的写法
    setFileList(formatlist)
    cacheImgList.current = formatlist
  }

  //切换图片
  const [imgCount, setImageCount] = useState(1)
  const radioChange = (e) => {
    // console.log(e.target.value)
    const rawValue = e.target.value
    setImageCount(rawValue)
    // console.log(cacheImgList.current)
    if (cacheImgList.current.length === 0) {
      return false
    }
    if (rawValue === 1) {
      const img = cacheImgList.current ? cacheImgList.current[0] : []
      setFileList([img])
    } else if (rawValue === 3) {
      setFileList(cacheImgList.current)
    }
  }

  //提交表单
  const onFinish = async (values) => {
    console.log(values)
    //数据二次处理 处理cover子弹
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map((item) => item.url),
      },
    }
    // console.log(params)
    if (id) {
      await http.put(`/mp/articles/${id}?draft`, params)
    } else {
      await http.post('/mp/articles?draft=false', params)
    }
  }

  const [params] = useSearchParams()
  const id = params.get('id')
  const form = useRef(null)
  useEffect(() => {
    const loadDetail = async () => {
      const res = await http.get(`/mp/articles/${id}`)
      // console.log(res)
      const data = res.data
      form.current.setFieldsValue({ ...data, type: data.cover.type })
      setFileList(data.cover.images.map((url) => ({ url })))
      cacheImgList.current = data.cover.images.map((url) => ({ url }))
    }
    if (id) {
      loadDetail()
    }
  }, [id])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? '编辑' : '发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: 'hello' }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill theme="snow" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id ? '编辑' : '发布'}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)
