from .sql.models import create_schema
from .types import restresponse_from_dict, restresponse_to_dict
from .nosql.service import find_last, persist as insert_in_mongo
from .spider.service import fetch
from .adapters import rest_response_to_normalized
from .sql.service import persist as insert_in_postgres


def fetch_and_persist():
    print('persist and log')
    insert_in_mongo(fetch())

create_schema()
insert_in_postgres(rest_response_to_normalized(find_last()))

__name__ == '__main__'
