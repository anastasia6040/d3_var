﻿function createPathG() {
    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    const petals = 5;

    let data = [];

    for (let p = 0; p < petals; p++) {
        const startAngle = Math.PI - (2 * Math.PI * p) / petals;
        const endAngle = Math.PI - (2 * Math.PI * (p + 1)) / petals;

        data.push({ x: centerX, y: centerY }); // начало лепестка

        for (let t = 0; t <= Math.PI; t += 0.1) {
            const angle = startAngle + (endAngle - startAngle) * (t / Math.PI);
            const r = radius * Math.pow(Math.sin(t), 0.8);
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            data.push({ x, y });
        }

        data.push({ x: centerX, y: centerY }); // возврат в центр
    }

    return data;
}



// Создаем путь и возвращаем его как DOM-элемент
function drawPath() {
    const dataPoints = createPathG(); // всегда рисуем createPathG

    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y);

    const svg = d3.select("svg");

    svg.selectAll("path.path-animation").remove();

    const path = svg.append('path')
        .attr('class', 'path-animation')
        .attr('d', line(dataPoints))
        .attr('stroke', 'none')
        .attr('fill', 'none')
        .attr('opacity', 0.5);

    return path.node();
}


// Функция для анимации перемещения
function translateAlong(path) {
    const length = path.getTotalLength();
    return function (d, i, a) {
        return function (t) {
            const point = path.getPointAtLength(t * length);
            return `translate(${point.x},${point.y})`;
        };
    };
}