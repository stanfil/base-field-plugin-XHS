"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = request;
const dayjs_1 = __importDefault(require("dayjs"));
async function request(data, fetch) {
    if (!data.url)
        return null;
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
        if (!status || status !== 200)
            return null;
        // console.log(2222, result)
        return {
            "title": result.title,
            "author": result.uploader,
            "content": result.content,
            "tags": result.keywords,
            "publishTime": (0, dayjs_1.default)(result.releaseTime).format('YYYY-MM-DD HH:mm:ss'),
            "lastUpdateTime": (0, dayjs_1.default)(result.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss'),
            "favorites": result.collectionCount,
            "likes": result.likeCount,
            "shares": result.shareCount,
            "comments": result.commentCount,
            // "totalEngagement": "总互动量",
            "dataRetrievalTime": (0, dayjs_1.default)(result.currentTime).format('YYYY-MM-DD HH:mm:ss'),
        };
    }
    catch (e) {
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdG9vbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFNQSwwQkFnREM7QUF0REQsa0RBQXlCO0FBTWxCLEtBQUssVUFBVSxPQUFPLENBQUMsSUFBVyxFQUFFLEtBQVU7SUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFM0IsSUFBSSxDQUFDO1FBRUgsMkJBQTJCO1FBQzNCLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLGdGQUFnRixFQUFFO1lBQzdHLFNBQVMsRUFBRTtnQkFDVCxRQUFRLEVBQUUsbUNBQW1DO2dCQUM3QyxpQkFBaUIsRUFBRSxnQkFBZ0I7Z0JBQ25DLGNBQWMsRUFBRSxtQ0FBbUM7Z0JBQ25ELEtBQUssRUFBRSxHQUFHO2dCQUNWLFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixTQUFTLEVBQUUsOEJBQThCO2dCQUN6QyxXQUFXLEVBQUUsMENBQTBDO2dCQUN2RCxrQkFBa0IsRUFBRSxJQUFJO2dCQUN4QixvQkFBb0IsRUFBRSxTQUFTO2dCQUMvQixnQkFBZ0IsRUFBRSxPQUFPO2dCQUN6QixnQkFBZ0IsRUFBRSxNQUFNO2dCQUN4QixnQkFBZ0IsRUFBRSxZQUFZO2dCQUM5QixZQUFZLEVBQUUsdUhBQXVIO2FBQ3RJO1lBQ0QsTUFBTSxFQUFFLE9BQU8sa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN2RixRQUFRLEVBQUUsTUFBTTtTQUNqQixDQUFDLENBQUM7UUFFSCxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRS9ELElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxLQUFLLEdBQUc7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUMxQyw0QkFBNEI7UUFDNUIsT0FBTztZQUNMLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSztZQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3pCLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUTtZQUN2QixhQUFhLEVBQUUsSUFBQSxlQUFLLEVBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztZQUN0RSxnQkFBZ0IsRUFBRSxJQUFBLGVBQUssRUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDO1lBQzVFLFdBQVcsRUFBRSxNQUFNLENBQUMsZUFBZTtZQUNuQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxVQUFVO1lBQzNCLFVBQVUsRUFBRSxNQUFNLENBQUMsWUFBWTtZQUMvQiw2QkFBNkI7WUFDN0IsbUJBQW1CLEVBQUUsSUFBQSxlQUFLLEVBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztTQUM3RSxDQUFBO0lBQ0gsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7QUFDSCxDQUFDIn0=