---
title: Express.js project stucture
date: 2022/08/29
description: A good project structure for your express.js applications.
tag: javascript, node.js
author: Aelpxy
---

Express is a Node.js web framework that provides a set of robust features for backend applications.

This is the structure I tend follow for any express application.

```
./src
├── configs
│   └── config.ts
├── controllers
│   ├── account.controller.ts
│   └── auth.controller.ts
├── index.ts
├── middlewares
│   ├── auth.middleware.ts
│   └── validate.middleware.ts
├── models
│   └── account.model.ts
├── routes
│   └── router.ts
├── services
│   └── account.service.ts
└── utils
    ├── db.util.ts
    ├── hash.util.ts
    ├── jwt.util.ts
    ├── logger.util.ts
    └── server.util.ts

7 directories, 14 files
```
