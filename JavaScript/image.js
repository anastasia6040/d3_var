function drawShip(svg) {
    const ship = svg.append("g")
        .attr("transform", "translate(300, 300)");

    // 1. Корпус
    ship.append("polygon")
        .attr("points", "-50,20 -30,-10 30,-10 50,20")
        .style("fill", "#8d6e63");

    // 2. Палуба
    ship.append("rect")
        .attr("x", -40)
        .attr("y", -20)
        .attr("width", 80)
        .attr("height", 10)
        .style("fill", "#5d4037");

    // 3. Мачта
    ship.append("line")
        .attr("x1", 0)
        .attr("y1", -10)
        .attr("x2", 0)
        .attr("y2", -60)
        .style("stroke", "#5d4037")
        .style("stroke-width", 3);

    // 4. Парус
    ship.append("polygon")
        .attr("points", "0,-60 0,-20 40,-20")
        .style("fill", "#e3f2fd");

    // Тело медузы
    ship.append("circle")
        .attr("cx", -50)
        .attr("cy", 50)
        .attr("r", 10)
        .style("fill", "#ce93d8");

    // Щупальца медузы
    ship.append("line")
        .attr("x1", -55).attr("y1", 55).attr("x2", -55).attr("y2", 70)
        .style("stroke", "#ba68c8").style("stroke-width", 2);

    ship.append("line")
        .attr("x1", -50).attr("y1", 55).attr("x2", -50).attr("y2", 70)
        .style("stroke", "#ba68c8").style("stroke-width", 2);

    ship.append("line")
        .attr("x1", -45).attr("y1", 55).attr("x2", -45).attr("y2", 70)
        .style("stroke", "#ba68c8").style("stroke-width", 2);

    return ship;
}
