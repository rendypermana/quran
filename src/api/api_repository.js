import quran from '@/api/quran.js'

const repositories = {
    quran: quran
};


export const RepositoryAPI = {
    get : name => repositories[name]
};