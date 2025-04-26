function drawShip(svg) {
    const ship = svg.append("g")
        .attr("transform", "translate(300, 300)");

    // 1. Корпус (кастомный путь)
    ship.append("path")
        .attr("d", "M-50,20 L-30,-10 L30,-10 L50,20 Z")
        .style("fill", "#8d6e63");

    // 2. Палуба (прямоугольник)
    ship.append("rect")
        .attr("x", -40)
        .attr("y", -20)
        .attr("width", 80)
        .attr("height", 10)
        .style("fill", "#5d4037");

    // 3. Мачта (линия)
    ship.append("line")
        .attr("x1", 0)
        .attr("y1", -10)
        .attr("x2", 0)
        .attr("y2", -60)
        .style("stroke", "#5d4037")
        .style("stroke-width", 3);

    // 4. Парус (треугольник)
    ship.append("path")
        .attr("d", "M0,-60 L0,-20 L40,-20 Z")
        .style("fill", "#e3f2fd");

    // 5-6. Волны (две кривые)
    ship.append("path")
        .attr("d", "M-80,25 Q-40,15 0,25 Q40,35 80,25")
        .style("stroke", "#1e88e5")
        .style("fill", "none")
        .style("stroke-width", 2);

    ship.append("path")
        .attr("d", "M-80,30 Q-40,20 0,30 Q40,40 80,30")
        .style("stroke", "#1e88e5")
        .style("fill", "none")
        .style("stroke-width", 2);

    return ship;
}