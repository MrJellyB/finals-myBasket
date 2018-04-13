
set PATH=%PATH%;C:\Program Files\MongoDB\Server\3.6\bin
mongoimport --db test --collection product --drop --file ".\product.json" --jsonArray
mongoimport --db test --collection stores --drop --file ".\stores.json" --jsonArray

