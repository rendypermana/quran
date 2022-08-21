import {json} from '@/api/config';

export default {
    quranEdition(){
        return json.get('v1/edition/language/id');
    },
    suratAll(){
        return json.get('v1/surah');
    },
    suratSingle(number){
        return json.get('v1/surah/'+number+'/editions/id.indonesian,id.pickthall');
    },
    allQuran(){
        return json.get('v1/quran/ar.asad');
    },
    searchKeyword(keyword) {
        return json.get('v1/search/'+ keyword +'/all/id');
    },
    suratByAyat(ayat) {
        return json.get('v1/ayah/'+ ayat +'/editions/id.indonesian,id.pickthall');
    },
}
