from .types import restresponse_from_dict, restresponse_to_dict
from .nosql.service import find_last, persist
from .spider.service import fetch


def fetch_and_persist():
    print('persist and log')
    persist(fetch())


print(find_last().fecha)

__name__ == '__main__'
