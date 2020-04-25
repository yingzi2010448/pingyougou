// 同时发起Ajax请求的数量
let ajaxNum = 0 ;
export const request = (params) => {
    //发起异步请求
    ajaxNum ++;
    //异步请求显示加载框
    wx.showLoading({
        title: '加载中',
        mask: true,
    });
    //公共Url
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success:(res) =>{
                resolve(res)
            },
            fail:(err) => {
                reject(err)
            },
            complete:() =>{
                ajaxNum--;
                // 所有的异步请求都完成loading才消失
                if(ajaxNum === 0){
                    wx.hideLoading();
                }
            }

        });
    });
};