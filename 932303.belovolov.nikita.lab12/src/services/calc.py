from decimal import InvalidOperation


class ServiceError(Exception):
    msg: str = ""

    def __init__(self, message: str | None = None):
        self.msg = message or self.msg
        super().__init__(self.msg)


class InvalidOperationError(ServiceError):
    msg: str = "Invalid operation"


class DivisionByZeroError(ServiceError):
    msg: str = "Division by zero"


def calculate(first_number: int, second_number: int, operation: str) -> int:
    if operation == "+":
        return first_number + second_number
    elif operation == "-":
        return first_number - second_number
    elif operation == "*":
        return first_number * second_number
    elif operation == "/":
        if second_number == 0:
            raise DivisionByZeroError()
        return first_number // second_number
    else:
        raise InvalidOperation()
