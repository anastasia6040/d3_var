document.addEventListener("DOMContentLoaded", function () {
    const svg = d3.select("svg")
        .attr("width", 600)
        .attr("height", 600);

    let currentSmile = null;
    const form = document.getElementById("setting");
    const toParams = document.querySelectorAll(".to-params");

    // Элементы управления
    const drawBtn = document.getElementById("drawBtn");
    const animateBtn = document.getElementById("animateBtn");
    const clearBtn = document.getElementById("clearBtn");

    // Добавим этот блок в начало формы
    const paramContainer = document.querySelector(".param-group");

    // Очистка холста
    clearBtn.addEventListener("click", function () {
        svg.selectAll("*").remove();
        currentSmile = null;
    });

    // Обычное рисование
    drawBtn.addEventListener("click", function () {
        // Удаляем все предыдущие элементы (если нужно)
        svg.selectAll("g").remove();

        // Рисуем кораблик по центру
        currentSmile = drawShip(svg);

        // Центрируем кораблик в середине SVG (600x600)
        currentSmile.attr("transform", "translate(300, 300)"); // 300, 300 — это центр
    });

    // В обработчике кнопки анимации:
    animateBtn.addEventListener("click", function () {
        const scaleX = parseFloat(document.getElementById("scaleX").value);
        const scaleY = parseFloat(document.getElementById("scaleY").value);
        const rotate = parseFloat(document.getElementById("rotate").value);
        const time = parseFloat(document.getElementById("time").value) * 1000; // время в миллисекундах

        const easeMethod = d3.easeLinear;

        // Очищаем старые элементы
        svg.selectAll("path.path-animation").remove();
        svg.selectAll("g").remove();

        // Создаем новый кораблик
        const smile = drawShip(svg);
        smile.attr("class", "ship-group");

        // Строим путь createPathG
        const path = drawPath(); // без параметров теперь!

        // Запускаем анимацию кораблика вдоль пути
        smile.transition()
            .duration(time)  // Используем выбранное время для анимации
            .ease(easeMethod)
            .attrTween("transform", function (d, i, a) {
                return function (t) {
                    const point = path.getPointAtLength(t * path.getTotalLength());
                    const rotateAngle = rotate * t; // Поворот с учетом времени
                    const scaleXValue = 1 + (scaleX - 1) * t; // Изменение масштаба по X
                    const scaleYValue = 1 + (scaleY - 1) * t; // Изменение масштаба по Y
                    return `translate(${point.x}, ${point.y}) rotate(${rotateAngle}) scale(${scaleXValue}, ${scaleYValue})`; // Добавляем масштаб
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
