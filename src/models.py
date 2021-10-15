# To use this code, make sure you
#
#     import json
#
# and then, to convert JSON from a string, do
#
#     result = gasolina_from_dict(json.loads(json_string))

from dataclasses import dataclass
from typing import Optional, Any, List, TypeVar, Type, Callable, cast


T = TypeVar("T")


def from_none(x: Any) -> Any:
    assert x is None
    return x


def from_str(x: Any) -> str:
    assert isinstance(x, str)
    return x


def from_union(fs, x):
    for f in fs:
        try:
            return f(x)
        except:
            pass
    assert False


def is_type(t: Type[T], x: Any) -> T:
    assert isinstance(x, t)
    return x


def from_list(f: Callable[[Any], T], x: Any) -> List[T]:
    assert isinstance(x, list)
    return [f(y) for y in x]


def to_class(c: Type[T], x: Any) -> dict:
    assert isinstance(x, c)
    return cast(Any, x).to_dict()


@dataclass
class ListaEESSPrecio:
    ideess: Optional[int] = None
    id_municipio: Optional[int] = None
    c_p: Optional[str] = None
    dirección: Optional[str] = None
    horario: Optional[str] = None
    latitud: Optional[str] = None
    localidad: Optional[str] = None
    longitud_wgs84: Optional[str] = None
    margen: Optional[str] = None
    municipio: Optional[str] = None
    precio_biodiesel: Optional[str] = None
    precio_bioetanol: Optional[str] = None
    precio_gas_natural_comprimido: Optional[str] = None
    precio_gas_natural_licuado: Optional[str] = None
    precio_gases_licuados_del_petróleo: Optional[str] = None
    precio_gasoleo_a: Optional[str] = None
    precio_gasoleo_b: Optional[str] = None
    precio_gasoleo_premium: Optional[str] = None
    precio_gasolina_95_e10: Optional[str] = None
    precio_gasolina_95_e5: Optional[str] = None
    precio_gasolina_95_e5_premium: Optional[str] = None
    precio_gasolina_98_e10: Optional[str] = None
    precio_gasolina_98_e5: Optional[str] = None
    precio_hidrogeno: Optional[str] = None
    provincia: Optional[str] = None
    remisión: Optional[str] = None
    rótulo: Optional[str] = None
    tipo_venta: Optional[str] = None
    bio_etanol: Optional[str] = None
    éster_metílico: Optional[str] = None
    id_provincia: Optional[str] = None
    idccaa: Optional[str] = None

    @staticmethod
    def from_dict(obj: Any) -> 'ListaEESSPrecio':
        assert isinstance(obj, dict)
        ideess = from_union([from_none, lambda x: int(from_str(x))], obj.get("IDEESS"))
        id_municipio = from_union([from_none, lambda x: int(from_str(x))], obj.get("IDMunicipio"))
        c_p = from_union([from_str, from_none], obj.get("C.P."))
        dirección = from_union([from_str, from_none], obj.get("Dirección"))
        horario = from_union([from_str, from_none], obj.get("Horario"))
        latitud = from_union([from_str, from_none], obj.get("Latitud"))
        localidad = from_union([from_str, from_none], obj.get("Localidad"))
        longitud_wgs84 = from_union([from_str, from_none], obj.get("Longitud (WGS84)"))
        margen = from_union([from_str, from_none], obj.get("Margen"))
        municipio = from_union([from_str, from_none], obj.get("Municipio"))
        precio_biodiesel = from_union([from_str, from_none], obj.get("Precio Biodiesel"))
        precio_bioetanol = from_union([from_str, from_none], obj.get("Precio Bioetanol"))
        precio_gas_natural_comprimido = from_union([from_str, from_none], obj.get("Precio Gas Natural Comprimido"))
        precio_gas_natural_licuado = from_union([from_str, from_none], obj.get("Precio Gas Natural Licuado"))
        precio_gases_licuados_del_petróleo = from_union([from_str, from_none], obj.get("Precio Gases licuados del petróleo"))
        precio_gasoleo_a = from_union([from_str, from_none], obj.get("Precio Gasoleo A"))
        precio_gasoleo_b = from_union([from_str, from_none], obj.get("Precio Gasoleo B"))
        precio_gasoleo_premium = from_union([from_str, from_none], obj.get("Precio Gasoleo Premium"))
        precio_gasolina_95_e10 = from_union([from_str, from_none], obj.get("Precio Gasolina 95 E10"))
        precio_gasolina_95_e5 = from_union([from_str, from_none], obj.get("Precio Gasolina 95 E5"))
        precio_gasolina_95_e5_premium = from_union([from_str, from_none], obj.get("Precio Gasolina 95 E5 Premium"))
        precio_gasolina_98_e10 = from_union([from_str, from_none], obj.get("Precio Gasolina 98 E10"))
        precio_gasolina_98_e5 = from_union([from_str, from_none], obj.get("Precio Gasolina 98 E5"))
        precio_hidrogeno = from_union([from_str, from_none], obj.get("Precio Hidrogeno"))
        provincia = from_union([from_str, from_none], obj.get("Provincia"))
        remisión = from_union([from_str, from_none], obj.get("Remisión"))
        rótulo = from_union([from_str, from_none], obj.get("Rótulo"))
        tipo_venta = from_union([from_str, from_none], obj.get("Tipo Venta"))
        bio_etanol = from_union([from_str, from_none], obj.get("% BioEtanol"))
        éster_metílico = from_union([from_str, from_none], obj.get("% Éster metílico"))
        id_provincia = from_union([from_str, from_none], obj.get("IDProvincia"))
        idccaa = from_union([from_str, from_none], obj.get("IDCCAA"))
        return ListaEESSPrecio(ideess, id_municipio, c_p, dirección, horario, latitud, localidad, longitud_wgs84, margen, municipio, precio_biodiesel, precio_bioetanol, precio_gas_natural_comprimido, precio_gas_natural_licuado, precio_gases_licuados_del_petróleo, precio_gasoleo_a, precio_gasoleo_b, precio_gasoleo_premium, precio_gasolina_95_e10, precio_gasolina_95_e5, precio_gasolina_95_e5_premium, precio_gasolina_98_e10, precio_gasolina_98_e5, precio_hidrogeno, provincia, remisión, rótulo, tipo_venta, bio_etanol, éster_metílico, id_provincia, idccaa)

    def to_dict(self) -> dict:
        result: dict = {}
        result["IDEESS"] = from_union([lambda x: from_none((lambda x: is_type(type(None), x))(x)), lambda x: from_str((lambda x: str((lambda x: is_type(int, x))(x)))(x))], self.ideess)
        result["IDMunicipio"] = from_union([lambda x: from_none((lambda x: is_type(type(None), x))(x)), lambda x: from_str((lambda x: str((lambda x: is_type(int, x))(x)))(x))], self.id_municipio)
        result["C.P."] = from_union([from_str, from_none], self.c_p)
        result["Dirección"] = from_union([from_str, from_none], self.dirección)
        result["Horario"] = from_union([from_str, from_none], self.horario)
        result["Latitud"] = from_union([from_str, from_none], self.latitud)
        result["Localidad"] = from_union([from_str, from_none], self.localidad)
        result["Longitud (WGS84)"] = from_union([from_str, from_none], self.longitud_wgs84)
        result["Margen"] = from_union([from_str, from_none], self.margen)
        result["Municipio"] = from_union([from_str, from_none], self.municipio)
        result["Precio Biodiesel"] = from_union([from_str, from_none], self.precio_biodiesel)
        result["Precio Bioetanol"] = from_union([from_str, from_none], self.precio_bioetanol)
        result["Precio Gas Natural Comprimido"] = from_union([from_str, from_none], self.precio_gas_natural_comprimido)
        result["Precio Gas Natural Licuado"] = from_union([from_str, from_none], self.precio_gas_natural_licuado)
        result["Precio Gases licuados del petróleo"] = from_union([from_str, from_none], self.precio_gases_licuados_del_petróleo)
        result["Precio Gasoleo A"] = from_union([from_str, from_none], self.precio_gasoleo_a)
        result["Precio Gasoleo B"] = from_union([from_str, from_none], self.precio_gasoleo_b)
        result["Precio Gasoleo Premium"] = from_union([from_str, from_none], self.precio_gasoleo_premium)
        result["Precio Gasolina 95 E10"] = from_union([from_str, from_none], self.precio_gasolina_95_e10)
        result["Precio Gasolina 95 E5"] = from_union([from_str, from_none], self.precio_gasolina_95_e5)
        result["Precio Gasolina 95 E5 Premium"] = from_union([from_str, from_none], self.precio_gasolina_95_e5_premium)
        result["Precio Gasolina 98 E10"] = from_union([from_str, from_none], self.precio_gasolina_98_e10)
        result["Precio Gasolina 98 E5"] = from_union([from_str, from_none], self.precio_gasolina_98_e5)
        result["Precio Hidrogeno"] = from_union([from_str, from_none], self.precio_hidrogeno)
        result["Provincia"] = from_union([from_str, from_none], self.provincia)
        result["Remisión"] = from_union([from_str, from_none], self.remisión)
        result["Rótulo"] = from_union([from_str, from_none], self.rótulo)
        result["Tipo Venta"] = from_union([from_str, from_none], self.tipo_venta)
        result["% BioEtanol"] = from_union([from_str, from_none], self.bio_etanol)
        result["% Éster metílico"] = from_union([from_str, from_none], self.éster_metílico)
        result["IDProvincia"] = from_union([from_str, from_none], self.id_provincia)
        result["IDCCAA"] = from_union([from_str, from_none], self.idccaa)
        return result


@dataclass
class Gasolina:
    fecha: Optional[str] = None
    lista_eess_precio: Optional[List[ListaEESSPrecio]] = None
    nota: Optional[str] = None
    resultado_consulta: Optional[str] = None

    @staticmethod
    def from_dict(obj: Any) -> 'Gasolina':
        assert isinstance(obj, dict)
        fecha = from_union([from_str, from_none], obj.get("Fecha"))
        lista_eess_precio = from_union([lambda x: from_list(ListaEESSPrecio.from_dict, x), from_none], obj.get("ListaEESSPrecio"))
        nota = from_union([from_str, from_none], obj.get("Nota"))
        resultado_consulta = from_union([from_str, from_none], obj.get("ResultadoConsulta"))
        return Gasolina(fecha, lista_eess_precio, nota, resultado_consulta)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Fecha"] = from_union([from_str, from_none], self.fecha)
        result["ListaEESSPrecio"] = from_union([lambda x: from_list(lambda x: to_class(ListaEESSPrecio, x), x), from_none], self.lista_eess_precio)
        result["Nota"] = from_union([from_str, from_none], self.nota)
        result["ResultadoConsulta"] = from_union([from_str, from_none], self.resultado_consulta)
        return result


def gasolina_from_dict(s: Any) -> Gasolina:
    return Gasolina.from_dict(s)


def gasolina_to_dict(x: Gasolina) -> Any:
    return to_class(Gasolina, x)
