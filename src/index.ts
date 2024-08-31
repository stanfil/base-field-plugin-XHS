import { basekit, FieldType, field, FieldComponent, FieldCode } from '@lark-opdev/block-basekit-server-api';
import { request } from './tools';

const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['feishu-xhs-assistant-directrequest-wuyi.replit.app']);

basekit.addField({
  // 定义捷径的i18n语言资源
  i18n: {
    messages: {
      "zh-CN": {
      "link": "笔记详情页链接",
      "cookie": "Cookie（有 Cookie 数据更准确）",
      "cookieTip": "请输入小红书 Cookie",
      "title": "标题",
      "author": "博主",
      "content": "笔记内容",
      "tags": "标签",
      "likes": "点赞量",
      "favorites": "收藏量",
      "shares": "转发量",
      "comments": "评论量",
      "publishTime": "发布时间",
      "lastUpdateTime": "最后更新时间",
      "dataRetrievalTime": "数据获取时间"
    },
    "en-US": {
      "link": "Note Detail Page Link",
      "cookie": "Cookie (More accurate with Cookie data)",
      "cookieTip": "Please enter the Xiaohongshu Cookie",
      "title": "Title",
      "author": "Author",
      "content": "Note Content",
      "tags": "Tags",
      "likes": "Likes",
      "favorites": "Favorites",
      "shares": "Shares",
      "comments": "Comments",
      "publishTime": "Publish Time",
      "lastUpdateTime": "Last Update Time",
      "dataRetrievalTime": "Data Retrieval Time"
    },
    "ja-JP": {
      "link": "ノート詳細ページリンク",
      "cookie": "Cookie（Cookie データがあるとより正確）",
      "cookieTip": "小紅書のCookieを入力してください",
      "title": "タイトル",
      "author": "ブロガー",
      "content": "ノート内容",
      "tags": "タグ",
      "likes": "いいね数",
      "favorites": "お気に入り数",
      "shares": "シェア数",
      "comments": "コメント数",
      "publishTime": "公開時間",
      "lastUpdateTime": "最終更新時間",
      "dataRetrievalTime": "データ取得時間"
    }
    }
  },
  // 定义捷径的入参
  formItems: [
    {
      key: 'link',
      label: t('link'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Text, FieldType.Url],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'cookie',
      label: t('cookie'),
      component: FieldComponent.Input,
      props: {
        placeholder: t('cookieTip'),
      },
    }
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Object,
    extra: {
      icon: {
        light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
      },
      properties: [
        {
          key: 'id',
          isGroupByKey: true,
          type: FieldType.Text,
          title: 'id',
          hidden: true,
        },
        {
          key: 'title',
          type: FieldType.Text,
          title: t('title'),
          primary: true,
        },
        {
          key: 'author',
          type: FieldType.Text,
          title: t('author'),
        },
        {
          key: 'content',
          type: FieldType.Text,
          title: t('content'),
        },
        {
          key: 'tags',
          type: FieldType.Text,
          title: t('tags'),
        },
        {
          key: 'likes',
          type: FieldType.Number,
          title: t('likes'),
        },
        {
          key: 'favorites',
          type: FieldType.Number,
          title: t('favorites'),
        },
        {
          key: 'shares',
          type: FieldType.Number,
          title: t('shares'),
        },
        {
          key: 'comments',
          type: FieldType.Number,
          title: t('comments'),
        },
        // {
        //   key: 'totalEngagement',
        //   type: FieldType.Text,
        //   title: t('totalEngagement'),
        // },
        {
          key: 'publishTime',
          type: FieldType.Text,
          title: t('publishTime'),
        },
        {
          key: 'lastUpdateTime',
          type: FieldType.Text,
          title: t('lastUpdateTime'),
        },
        {
          key: 'dataRetrievalTime',
          type: FieldType.Text,
          title: t('dataRetrievalTime'),
        },
      ],
    },
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams: { link: [{ link: string, type: string }], cookie: string }, context) => {
    const { link = [], cookie } = formItemParams;

    const url = link?.find(item => item.type === 'url')?.link || null
    
    // console.log(1111, url,'\n\n' , cookie)
    try {

      const result = await request({ url, cookie }, context.fetch);

      // console.log(2222, result)
      return {
        code: FieldCode.Success,
        data: {
          ...(result || {}),
          id: `${Math.random()}`,
        }
      }
    } catch (e) {
      return {
        code: FieldCode.Error,
      }
    }
  },
});
export default basekit;