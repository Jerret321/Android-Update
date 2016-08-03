---

## Android Web Update System

## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```

## API

- url: /api/app/post
- methods: post
- params
```javascript
{
	"key": "",
	"secret": "",
	"package": "",
	"version_code": 1
}
```
- returns
```javascript
{
    "code": 0,
    "msg": "",
    "data": {
        "need_update": true,
        "id": 1,
        "name": "1",
        "is_force_update": 1,
        "create_time": 1469861005097,
        "url": "http://127.0.0.1:1111/upload/xxxaaassas.apk"
    }
}
```