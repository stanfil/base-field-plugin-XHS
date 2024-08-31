import dayjs from 'dayjs'
type TData = {
  url: string;
  cookie: string;
}

export async function request(data: TData, fetch: any) {
  if (!data.url) return null;

  try {

    // console.log(33333, data)
    const response = await fetch("https://feishu-xhs-assistant-directrequest-wuyi.replit.app/get_xhs_detail_data", {
      "headers": {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded',
        'DNT': '1',
        'Origin': 'https://ext.baseopendev.com',
        'Priority': 'u=1, i',
        'Referer': 'https://ext.baseopendev.com/',
        'Sec-CH-UA': '"Chromium";v="127", "Not)A;Brand";v="99"',
        'Sec-CH-UA-Mobile': '?0',
        'Sec-CH-UA-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
      },
      "body": `url=${encodeURIComponent(data.url)}&cookie=${encodeURIComponent(data.cookie)}`,
      "method": "POST"
    });
  
    const { info: result, status } = (await response.json()) || {};

    if (!status || status !== 200) return null
    // console.log(2222, result)
    return {
      "title": result.title,
      "author": result.uploader,
      "content": result.content,
      "tags": result.keywords,
      "publishTime": dayjs(result.releaseTime).format('YYYY-MM-DD HH:mm:ss'),
      "lastUpdateTime": dayjs(result.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss'),
      "favorites": result.collectionCount,
      "likes": result.likeCount,
      "shares": result.shareCount,
      "comments": result.commentCount,
      // "totalEngagement": "总互动量",
      "dataRetrievalTime": dayjs(result.currentTime).format('YYYY-MM-DD HH:mm:ss'),
    }
  } catch (e) {
    return null;
  } 
}