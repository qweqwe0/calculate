

class FinancialCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
             <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }

                .container {
                    background-color: #ff77a8; 
                    padding: 20px;

                }
                
                h3 {
                    margin-bottom: 16px;
                    text-align: center;
                    color: #ffffff; 
                }
                
                h4 {
                    margin-top: 20px;
                    color: #e6e6e6;
                }

                label {
                    color: #e6e6e6; 
                }
                
                input {
                    margin-bottom: 12px;
                    background-color: #ff77a8; 
                    border: none;
                    outline:1px solid #ffffff;
                    padding: 10px; 
                    border-radius: 4px; 
                    font-size: 16px;
                }

                p {
                    font-size: 16px;
                    color: #dcdcdc;
                }
                
                span {
                    font-weight: bold;
                }
            </style>


    <div class="container p-3 text-light">
        <h3>Финансовый калькулятор</h3>
        <form id="calculator-form" class="form-group">
            <label for="loanAmount">Сумма кредита:</label>
            <input type="number" id="loanAmount" class="form-control" placeholder="Введите сумму кредита" required>
            
            <label for="interestRate" class="mt-2">Процентная ставка (%):</label>
            <input type="number" id="interestRate" class="form-control" placeholder="Введите процентную ставку" required>
            
            <label for="loanTerm" class="mt-2">Срок кредита (лет):</label>
            <input type="number" id="loanTerm" class="form-control" placeholder="Введите срок кредита в годах" required>
        </form>
        
        <h4>Результаты</h4>
        <p>Ежемесячный платеж: <span id="monthlyPayment">0</span> руб.</p>
        <p>Общая сумма платежей: <span id="totalPayment">0</span> руб.</p>
        <p>Общая сумма процентов: <span id="totalInterest">0</span> руб.</p>
    </div>
`;

        this.loanAmount = this.shadowRoot.querySelector('#loanAmount');
        this.interestRate = this.shadowRoot.querySelector('#interestRate');
        this.loanTerm = this.shadowRoot.querySelector('#loanTerm');

        this.monthlyPaymentDisplay = this.shadowRoot.querySelector('#monthlyPayment');
        this.totalPaymentDisplay = this.shadowRoot.querySelector('#totalPayment');
        this.totalInterestDisplay = this.shadowRoot.querySelector('#totalInterest');


        this.loanAmount.addEventListener('input', () => this.calculate());
        this.interestRate.addEventListener('input', () => this.calculate());
        this.loanTerm.addEventListener('input', () => this.calculate());
    }


    connectedCallback() {
        console.log('Финансовый калькулятор создан');
    }

    disconnectedCallback() {
        console.log('Финансовый калькулятор удалён');
    }


    calculate() {
        const loanAmount = parseFloat(this.loanAmount.value);
        const interestRate = parseFloat(this.interestRate.value) / 100 / 12;
        const loanTerm = parseFloat(this.loanTerm.value) * 12;
  
        if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
            return;
        }

        const x = Math.pow(1 + interestRate, loanTerm);
        const monthlyPayment = (loanAmount * interestRate * x) / (x - 1);
        const totalPayment = monthlyPayment * loanTerm;
        const totalInterest = totalPayment - loanAmount;

        this.monthlyPaymentDisplay.textContent = monthlyPayment.toFixed(2);
        this.totalPaymentDisplay.textContent = totalPayment.toFixed(2);
        this.totalInterestDisplay.textContent = totalInterest.toFixed(2);

        console.log('Данные обновлены');
    }
}


customElements.define('financial-calculator', FinancialCalculator);