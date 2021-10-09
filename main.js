const chart = window.chart;

let totalMarketValue = 0;
let mfMarketValue = 0;
let etfMarketValue = 0;

let dataset = [
    {
        name:'AADR',
        quantity:430,
        price:50.30,
        avgCost:41.75,
        invAmt:17952.07,
        pfValPercent:22.06,
        unrealizedPL:3676.93,
        returnPercent:20.48,
        type:'mf'
    },
    {
        name:'MFEM',
        quantity:210,
        price:23.20,
        avgCost:22.50,
        invAmt:4725.84,
        pfValPercent:5.81,
        unrealizedPL:146.16,
        returnPercent:3.09,
        type:'mf'
    },
    {
        name:'JPEM',
        quantity:328,
        price:52.50,
        avgCost:56.70,
        invAmt:18597.60,
        pfValPercent:22.86,
        unrealizedPL:-1377.60,
        returnPercent:-7.41,
        type:'mf'
    },
    {
        name:'KEMQ',
        quantity:801,
        price:20.40,
        avgCost:22.24,
        invAmt:17811.04,
        pfValPercent:21.89,
        unrealizedPL:-1470.64,
        returnPercent:-8.26,
        type:'mf'
    },
    {
        name:'KLDW',
        quantity:523,
        price:32.90,
        avgCost:26.32,
        invAmt:13765.36,
        pfValPercent:16.92,
        unrealizedPL:3441.34,
        returnPercent:25.00,
        type:'etf'
    },
    {
        name:'KOIN',
        quantity:335,
        price:25.40,
        avgCost:25.40,
        invAmt:8509.00,
        pfValPercent:10.46,
        unrealizedPL:0.00,
        returnPercent:0.00,
        type:'etf'
    },
]

function initialize(){
    
    let listContainer = document.getElementById('listContainer');
    for(let data of dataset){
        listContainer.innerHTML += cardTemplate(data);
    }
    initChart();
}

function cardTemplate(dataVal){
    let marketValue = dataVal['price'] * dataVal['quantity'];
    totalMarketValue+=marketValue;
    let returnValSpan;
    let upPercForReturnVal=0;
    let dwnPercForReturnVal=0;

    if(dataVal['type']=='mf'){mfMarketValue+=marketValue}
    if(dataVal['type']=='etf'){etfMarketValue+=marketValue}

    if(dataVal['returnPercent']<0){
        returnValSpan = `<span class="bold-500"><i class="fas fa-caret-down text-danger mr-1"></i>${dataVal['returnPercent']}%</span>`
        dwnPercForReturnVal = Math.abs(dataVal['returnPercent']);
    }else{
        returnValSpan = `<span class="bold-500"><i class="fas fa-caret-up text-success mr-1"></i>${dataVal['returnPercent']}%</span>`;
        upPercForReturnVal = Math.abs(dataVal['returnPercent']);
    }
    
    let template = `
    <div class="border rounded card-styles">
                <div style="width: 2rem;text-align:center"><i class="fas fa-bars"></i></div>
                <div class="d-flex flex-column align-items-center">
                    <div class="text-muted">${dataVal['name']}</div>
                    <div style="font-size: 25px;" class="bold-500"><span class="text-muted">$</span><span class="text-primary">${dataVal['price']}</span></div>
                </div>
                <div class="content-cards">
                    <!-- image -->
                    <img src="img.png" class="eq-image">
                </div>
                <div class="d-flex justify-content-between content-cards">
                    <div class="d-flex flex-column">
                        <div><i class="fas fa-box-open"></i> Quantity</div>
                        <div><i class="fas fa-at"></i> Avg. Cost</div>
                        <div><i class="fas fa-wallet"></i> Invested Amt.</div>
                    </div>
                    <div class="d-flex flex-column justify-content-start bold-500">
                        <div>${dataVal['quantity']}</div>
                        <div>\$${dataVal['avgCost']}</div>
                        <div>\$${dataVal['invAmt']}</div>
                    </div>
                </div>
                <div class="d-flex flex-column content-cards">
                    <div class="d-flex justify-content-between bold-500">
                        <span >Market Value</span>
                        <span>\$${marketValue}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>% of portfolio value</span>
                        <span class="bold-500">${dataVal['pfValPercent']}</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${dataVal['pfValPercent']}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="d-flex flex-column content-cards">
                    <div class="d-flex justify-content-between bold-500">
                        <span>Unrealizedf P/L</span>
                        <span>\$${dataVal['unrealizedPL']}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>% Return</span>
                        ${returnValSpan}
                    </div>
                    <div class="d-flex justify-content-center align-items-center position-relative">
                        <div class="pipe position-absolute" style="left: 49.4%;right: 50%;">
                        </div>
                        <div class="progress w-50">
                            <div class="progress-bar bg-danger ml-auto" role="progressbar" style="width:${dwnPercForReturnVal}%;"></div>
                        </div>
                        <div class="progress w-50">
                            <div class="progress-bar bg-success" role="progressbar" style="width:${upPercForReturnVal}%;"></div>
                        </div>
                    </div>
                </div>
                <div class="buy-sell-styles">
                    <button class="btn btn-outline-light custom-orange-btn">BUY</button>
                    <button class="btn btn-outline-light custom-orange-btn">SELL</button>
                </div>
            </div>
    `;
    return template;
}


function initChart(){
    let mfPercent = Math.round((mfMarketValue/totalMarketValue)*100);
    let etfPercent = Math.round((etfMarketValue/totalMarketValue)*100);
    let myChart = new Chart("myChart", {
        type: "doughnut",
        data: {
            labels: [
              'Mutual Funds',
              'ETFs',
            ],
            datasets: [{
              data: [mfPercent,etfPercent],
              backgroundColor: [
                'rgb(59, 174, 209)',
                'rgb(173, 160, 36)',
              ],
              hoverOffset: 0
            }]
          },
        options: {
            responsive: true,
            cutoutPercentage: 70
        }
      });
}


initialize();