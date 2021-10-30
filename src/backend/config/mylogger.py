import logging


def init(env='development'):
    level = logging.DEBUG if env == "development" else logging.WARNING
    logging.basicConfig(format='%(levelname)s:%(message)s', encoding='utf-8', level=level)
