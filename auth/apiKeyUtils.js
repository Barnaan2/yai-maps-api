const crypto = require('crypto')

//? GENERAL API KEY SETTINGS
const SIZE = 24;
const FORMAT ='base64'

exports.apiKeyGenerator = (size) =>{
 const buffer = crypto.randomBytes(size)
 const apiKey = buffer.toString(FORMAT)
 console.log(apiKey)
    return apiKey
}




// {location: {$geoWithin: { $centerSphere: [ [ 113.36822424235127, 79.19442732872645 ], 0.0464893032793969 ]}}}