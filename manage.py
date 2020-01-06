from flask_script import Manager, Server
from app import application

manager = Manager(application)
manager.add_command('runserver', Server(
    host='0.0.0.0', port=3000, use_debugger=True))

if __name__ == '__main__':
    manager.run()
