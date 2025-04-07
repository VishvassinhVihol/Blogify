// to export environment variables

import tinymce from "tinymce"

const conf = {
    appWriteUrl : String(import.meta.env.VITE_APP_WRITE_URL),
    appWriteProjectId : String(import.meta.env.VITE_APP_WRITE_PROJECTID),
    appWriteDatabaseId : String(import.meta.env.VITE_APP_WRITE_DATABASEID),
    appWriteCollectionId : String(import.meta.env.VITE_APP_WRITE_COLLECTIONID),
    appWriteBucketId : String(import.meta.env.VITE_APP_WRITE_BUCKETID),
    tinymceApiKey : String(import.meta.env.VITE_TINYMCEAPIKEY),
}


export default conf