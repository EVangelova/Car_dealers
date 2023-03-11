window.addEventListener("load", solve);

function solve() {
    const input = {
        make: document.getElementById('make'),
        model: document.getElementById('model'),
        year: document.getElementById('year'),
        fuel: document.getElementById('fuel'),
        originalPrice: document.getElementById('original-cost'),
        sellingPrice: document.getElementById('selling-price'),
    };
    const areas = {
        carInfo: document.getElementById('table-body'),
        soldCars: document.getElementById('cars-list'),
        profit: document.getElementById('profit'),
    }
 
    const refPublishBtn = document.getElementById('publish');
    refPublishBtn.addEventListener('click', publish);
 
    function publish(e) {
        e.preventDefault();
        let make = input.make.value;
        let model = input.model.value;
        let year = input.year.value;
        let fuel = input.fuel.value;
        let orPrice = input.originalPrice.value;
        let sellPrice = input.sellingPrice.value;
 
        if (make === "" ||
            model === "" ||
            year === "" ||
            fuel === "" ||
            orPrice === "" ||
            sellPrice === "") {
            return;
        }
        if (Number(sellPrice) < Number(orPrice)) {
            return;
        }
        const tr = document.createElement('tr');
        tr.className = 'row';
        tr.innerHTML = `<td>${make}</td>
        <td>${model}</td>
        <td>${year}</td>
        <td>${fuel}</td>
        <td>${orPrice}</td>
        <td>${sellPrice}</td> 
        <td>
          <button class="action-btn edit">Edit</button>
          <button class="action-btn sell"> Sell</button>
        </td>`
 
        const refEditBtn = tr.querySelector('.edit');
        const refSellBtn = tr.querySelector('.sell');
 
        refEditBtn.addEventListener('click', edit);
        refSellBtn.addEventListener('click', sellCar);
 
        areas.carInfo.appendChild(tr);
        clearInput()
 
        function edit() {
            input.make.value = make;
            input.model.value = model;
            input.year.value = year;
            input.fuel.value = fuel;
            input.originalPrice.value = orPrice;
            input.sellingPrice.value = sellPrice;
 
            tr.remove();
        }
        function sellCar() {
            let li = document.createElement('li');
            li.className = 'each-list';
            li.innerHTML = `<span>${make} ${model}</span>
            <span>${year}</span>
            <span>${sellPrice - orPrice}</span>`;
            areas.soldCars.appendChild(li);
            tr.remove()
            let allRows = Array.from(document.getElementById('cars-list').children);
            let totalProfit = 0;
 
            for (let row of allRows) {
              totalProfit += Number(row.children[2].textContent)
 
            }
            areas.profit.textContent = totalProfit.toFixed(2)
        }
    }
    function clearInput() {
        input.make.value = "";
        input.model.value = "";
        input.year.value = "";
        input.fuel.value = "";
        input.originalPrice.value = "";
        input.sellingPrice.value = "";
    }
 
}

