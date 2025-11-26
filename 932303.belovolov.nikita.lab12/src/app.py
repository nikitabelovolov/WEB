from flask import Flask, render_template, request
from services import calc

app = Flask(
    __name__,
    template_folder="../client/templates",
    static_folder="../client/static",
)


@app.route("/")
def index():
    return render_template("home.html")


@app.route("/calc", methods=["GET"])
def calc_view():
    return render_template("calc.html")


@app.route("/calc", methods=["POST"])
def calc_process_view():
    first_number = request.form.get("first_number") or ""
    second_number = request.form.get("second_number") or ""
    operation = request.form.get("operation") or ""

    try:
        print(first_number, second_number, operation)
        first_number = int(first_number)
        second_number = int(second_number)
        assert operation in ["+", "-", "*", "/"]
    except (ValueError, AssertionError):
        return render_template("calc.html")

    try:
        result = calc.calculate(first_number, second_number, operation)
    except calc.ServiceError as e:
        return render_template("result.html", error=e.msg)

    return render_template(
        "result.html",
        first_number=first_number,
        second_number=second_number,
        operation=operation,
        result=result,
    )
