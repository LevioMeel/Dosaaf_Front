## DEPLOY

1. add to auth.js

```
advanced: {
crossSubDomainCookies: {
enabled: true,
domain: "drdgen.ru"
}
},
trustedOrigins: [
'https://api.drdgen.ru'
]
```

2. Change env

3. yarn build
