from .types import restresponse_from_dict, restresponse_to_dict
from .nosql.service import find_last
from .spider.service import fetch

# fetch()
print(len(find_last().lista_eess_precio))

__name__ == '__main__'