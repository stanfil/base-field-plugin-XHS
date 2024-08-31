"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const tools_1 = require("./tools");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['feishu-xhs-assistant-directrequest-wuyi.replit.app']);
block_basekit_server_api_1.basekit.addField({
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
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Text, block_basekit_server_api_1.FieldType.Url],
            },
            validator: {
                required: true,
            }
        },
        {
            key: 'cookie',
            label: t('cookie'),
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                placeholder: t('cookieTip'),
            },
        }
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Object,
        extra: {
            icon: {
                light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
            },
            properties: [
                {
                    key: 'id',
                    isGroupByKey: true,
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: 'id',
                    hidden: true,
                },
                {
                    key: 'title',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('title'),
                    primary: true,
                },
                {
                    key: 'author',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('author'),
                },
                {
                    key: 'content',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('content'),
                },
                {
                    key: 'tags',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('tags'),
                },
                {
                    key: 'likes',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: t('likes'),
                },
                {
                    key: 'favorites',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: t('favorites'),
                },
                {
                    key: 'shares',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: t('shares'),
                },
                {
                    key: 'comments',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: t('comments'),
                },
                // {
                //   key: 'totalEngagement',
                //   type: FieldType.Text,
                //   title: t('totalEngagement'),
                // },
                {
                    key: 'publishTime',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('publishTime'),
                },
                {
                    key: 'lastUpdateTime',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('lastUpdateTime'),
                },
                {
                    key: 'dataRetrievalTime',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('dataRetrievalTime'),
                },
            ],
        },
    },
    // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
    execute: async (formItemParams, context) => {
        const { link = [], cookie } = formItemParams;
        const url = link?.find(item => item.type === 'url')?.link || null;
        // console.log(1111, url,'\n\n' , cookie)
        try {
            const result = await (0, tools_1.request)({ url, cookie }, context.fetch);
            // console.log(2222, result)
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: {
                    ...(result || {}),
                    id: `${Math.random()}`,
                }
            };
        }
        catch (e) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBNEc7QUFDNUcsbUNBQWtDO0FBRWxDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxnQ0FBSyxDQUFDO0FBRXBCLDJCQUEyQjtBQUMzQixrQ0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLG9EQUFvRCxDQUFDLENBQUMsQ0FBQztBQUU5RSxrQ0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNmLGdCQUFnQjtJQUNoQixJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFdBQVcsRUFBRSxlQUFlO2dCQUM1QixPQUFPLEVBQUUsSUFBSTtnQkFDYixRQUFRLEVBQUUsSUFBSTtnQkFDZCxTQUFTLEVBQUUsTUFBTTtnQkFDakIsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixhQUFhLEVBQUUsTUFBTTtnQkFDckIsZ0JBQWdCLEVBQUUsUUFBUTtnQkFDMUIsbUJBQW1CLEVBQUUsUUFBUTthQUM5QjtZQUNELE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsdUJBQXVCO2dCQUMvQixRQUFRLEVBQUUseUNBQXlDO2dCQUNuRCxXQUFXLEVBQUUscUNBQXFDO2dCQUNsRCxPQUFPLEVBQUUsT0FBTztnQkFDaEIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFNBQVMsRUFBRSxjQUFjO2dCQUN6QixNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUUsT0FBTztnQkFDaEIsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixVQUFVLEVBQUUsVUFB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