# PetStoreAPI


## Prepare PostgreSQL database

```bash
$ oc new-app -e POSTGRESQL_USER=luke -e POSTGRESQL_PASSWORD=secret \
-e POSTGRESQL_DATABASE=my_data centos/postgresql-10-centos7 \
--name=my-database
```
