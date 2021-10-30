from flask import Flask, jsonify
from flask_restful import Api
from .. import extensions
from .resources import gasstations_v1_bp


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_BIND'] = "engine"
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/gas'
    # app.config.from_object(settings_module)

    # Inicializa las extensiones
    extensions.ma.init_app(app)
    extensions.db.init_app(app)

    # Captura todos los errores 404
    Api(app, catch_all_404s=True)

    # Deshabilita el modo estricto de acabado de una URL con /
    app.url_map.strict_slashes = False

    # Registra los blueprints
    app.register_blueprint(gasstations_v1_bp)

    # Registra manejadores de errores personalizados
    register_error_handlers(app)

    return app


def register_error_handlers(app):
    @app.errorhandler(Exception)
    def handle_exception_error(e):
        return jsonify({'msg': 'Internal backend error'}), 500

    @app.errorhandler(405)
    def handle_405_error(e):
        return jsonify({'msg': 'Method not allowed'}), 405

    @app.errorhandler(403)
    def handle_403_error(e):
        return jsonify({'msg': 'Forbidden error'}), 403

    @app.errorhandler(404)
    def handle_404_error(e):
        return jsonify({'msg': 'Not Found error'}), 404

    # @app.errorhandler(AppErrorBaseClass)
    # def handle_app_base_error(e):
    #     return jsonify({'msg': str(e)}), 500
    #
    # @app.errorhandler(ObjectNotFound)
    # def handle_object_not_found_error(e):
    #     return jsonify({'msg': str(e)}), 404


app = create_app()
