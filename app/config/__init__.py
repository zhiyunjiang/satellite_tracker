import os


class BaseConfig:
    SECRET_KEY = config_name = os.getenv('SECRET_KEY')
