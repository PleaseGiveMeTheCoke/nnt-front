import $C from './config.js'
export default {
    // 获取存储列表数据
    getStorage(key){
        let data = null;
        data = uni.getStorageSync(key)
        return data
    },
    // 设置存储
    setStorage(key,data){
		return uni.setStorageSync(key,data)
    },
    // 删除存储
    removeStorage(key){
		return uni.removeStorageSync(key)
    }
}