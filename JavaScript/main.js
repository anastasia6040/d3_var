document.addEventListener("DOMContentLoaded", function () {
    const svg = d3.select("svg")
        .attr("width", 600)
        .attr("height", 600);

    let currentSmile = null;
    const form = document.getElementById("setting");
    const toParams = document.querySelectorAll(".to-params");

    // �������� ����������
    const drawBtn = document.getElementById("drawBtn");
    const animateBtn = document.getElementById("animateBtn");
    const clearBtn = document.getElementById("clearBtn");

    // ������� ���� ���� � ������ �����
    const paramContainer = document.querySelector(".param-group");

    // ������� ������
    clearBtn.addEventListener("click", function () {
        svg.selectAll("*").remove();
        currentSmile = null;
    });

    // ������� ���������
    drawBtn.addEventListener("click", function () {
        // ������� ��� ���������� �������� (���� �����)
        svg.selectAll("g").remove();

        // ������ �������� �� ������
        currentSmile = drawShip(svg);

        // ���������� �������� � �������� SVG (600x600)
        currentSmile.attr("transform", "translate(300, 300)"); // 300, 300 � ��� �����
    });

    // � ����������� ������ ��������:
    animateBtn.addEventListener("click", function () {
        const scaleX = parseFloat(document.getElementById("scaleX").value);
        const scaleY = parseFloat(document.getElementById("scaleY").value);
        const rotate = parseFloat(document.getElementById("rotate").value);
        const time = parseFloat(document.getElementById("time").value) * 1000; // ����� � �������������

        const easeMethod = d3.easeLinear;

        // ������� ������ ��������
        svg.selectAll("path.path-animation").remove();
        svg.selectAll("g").remove();

        // ������� ����� ��������
        const smile = drawShip(svg);
        smile.attr("class", "ship-group");

        // ������ ���� createPathG
        const path = drawPath(); // ��� ���������� ������!

        // ��������� �������� ��������� ����� ����
        smile.transition()
            .duration(time)  // ���������� ��������� ����� ��� ��������
            .ease(easeMethod)
            .attrTween("transform", function (d, i, a) {
                return function (t) {
                    const point = path.getPointAtLength(t * path.getTotalLength());
                    const rotateAngle = rotate * t; // ������� � ������ �������
                    const scaleXValue = 1 + (scaleX - 1) * t; // ��������� �������� �� X
                    const scaleYValue = 1 + (scaleY - 1) * t; // ��������� �������� �� Y
                    return `translate(${point.x}, ${point.y}) rotate(${rotateAngle}) scale(${scaleXValue}, ${scaleYValue})`; // ��������� �������
                };
            });


    });

    function applyTransform(element, x, y, scaleX, scaleY, rotate) {
        element.attr("transform", getTransformString(x, y, scaleX, scaleY, rotate));
    }

    function getTransformString(x, y, scaleX, scaleY, rotate) {
        return `translate(${x}, ${y}) rotate(${rotate}) scale(${scaleX}, ${scaleY})`;
    }
});
