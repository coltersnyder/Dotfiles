from requests.auth import AuthBase

class HTTPBearerAuth(AuthBase):
    password: str
    def __init__(self, password: str) -> None: ...
    def __eq__(self, other: object) -> bool: ...
    def __ne__(self, other: object) -> bool: ...
    def __call__(self, r): ...
