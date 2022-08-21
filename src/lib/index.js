export function saveDataAyat(data) {
    const localData = JSON.parse(localStorage.getItem('saveAyat')) ?? [];
    localData.push(data);
    localStorage.setItem('saveAyat', JSON.stringify(localData));
    return true;
}

export function getSaveAyat() {
    return JSON.parse(localStorage.getItem('saveAyat')) ?? [];
}

export function deleteAyat(data) {
    const localData = JSON.parse(localStorage.getItem('saveAyat')) ?? [];
    const filterData = localData.filter(function(value){ 
        return value.no != data; 
    });
    localStorage.setItem('saveAyat', JSON.stringify(filterData));
    location.reload();
}

export function getTandaAyat() {
    const localData = JSON.parse(localStorage.getItem('tandaAyat')) ?? {};
    return localData;
}
export function tandaiAyat(data) {
    localStorage.setItem('tandaAyat', JSON.stringify(data));
}