import {json} from '@/api/config';

export default {
    getData(){
        return json.get('getUcapan')
    },
    loadMore(page){
        return json.get('getUcapan?page='+page)
    },
    postData(data){
        return json.post('kirimUcapan', data)
    }
}
