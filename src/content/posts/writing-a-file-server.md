---
title: 'Writing a file server'
publishedAt: '2024-11-24'
author: 'aelpxy'
summary: 'A very experimental design for a file server that is not meant for
  production.'
isDraft: false
---

## Why?

I do not know.

## Designing the architecture

Just SQLite as the database, keeping in mind that this is a simple project to
learn more about various concepts. I want to keep things very straightforward
and easy to understand.

The following command will set up everything you need, including the API and
file server

```sh
fresh api --root=/var/fresh/data --domain=storage.aelpxy.dev
```

I'm also planning to add a config.toml configuration file, which will look
something like this

```toml
# storage config
[storage]
path = "/var/fresh/data"  # path to store data
chunk_size = 1024         # in bytes

# api config
[api]
domain = "storage.aelpxy.dev"     # domain to serve on
tls = "enabled"                   # TLS: enabled or disabled
web = true                        # web ui support (yes, there will be a web interface!)
jwt_secret = "aVerySecureSecret"  # jwt secret
aes_secret = "32bitsecret"        # secure secret key

# auth config
[auth]
username = ""                     # username for authentication
password = ""                     # password (only supports argon2 hashes)

# web server config
[serve]
host = "0.0.0.0"                  # bind to all IP addresses
port = 5000                       # web server port (ignored if TLS is enabled)
folder = "./static-files"         # folder for static files
static_site = false               # enable static site serving (set to true for static apps)
tls = "enabled"                   # TLS: enabled or disabled
domain = "static.aelpxy.dev"      # static web server domain
cert_dir = "/var/fresh/certs"     # directory where TLS certificates will be stored

```

### Filesystem

```txt
/data/
  ├── storage.db # stores data about buckets and its objects
  └── assets/
       ├── metadata.msgpack # stores lookups and access keys
       ├── image.jpg
       └── icons/
             ├── img1.png
             └── img2.png
```

What's happening is that the root folder can contain multiple buckets, along
with a main `storage.db` file, which serves as the root SQLite database used to
store information about the buckets.

A `Bucket` is an actual folder on the system that stores metadata about objects
in `MessagePack` format, as well as the objects themselves. The `MessagePack`
file maps files and hashes for faster lookups. Each bucket contains objects,
which can be either a file or a folder.

The metadata for each object is stored in a corresponding `MessagePack` file
residing in the bucket, named `metadata.msgpack`.

It may seem like using `JSON` for storing the filesystem is the best idea, but
here's the thing: `JSON` is text-based, while `MessagePack` is binary. As a
result, `MessagePack` is typically faster and more compact to serialize and
deserialize compared to `JSON`.

`MessagePack` will provide better performance for large datasets, which we will
definitely deal with. There are also benefits in terms of space efficiency.
While it may not seem like a huge deal, large amounts of data can quickly take
up a significant amount of space.

```txt
+----------------------------------------------------------------------------------------------+
|                               Root Filesystem (Data folder)                                  |
|                                                                                              |
|   ____________________    ____________________    ________________________________________   |
|  |      Bucket A      |  |      Bucket 2      |  |             a-large-bucket             |  |
|  |--------------------|  |--------------------|  |                                        |  |
|  | +----------------+ |  | +-----------+      |  | folder/                                |  |
|  | | object-img.png | |  | | Directory |      |  |    |-/assets.zip                       |  |
|  | +----------------+ |  | +-----------+      |  | folder2/                               |  |
|  |                    |  |       |            |  |    |-/files                            |  |
|  | +----------------+ |  | +----------------+ |  |    |     |-/icon.png                   |  |
|  | | object-111.zip | |  | | movie-file.zip | |  |    |     |-/icon2.png                  |  |
|  | +----------------+ |  | +----------------+ |  |    |-/icon3.png                        |  |
|  |____________________|  |____________________|  |________________________________________|  |
|                                                                                              |
+----------------------------------------------------------------------------------------------+
> authors note: this was painful to type out.
```

## Moving forward

I will probably actually never finish writing the actual code.
