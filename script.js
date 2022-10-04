
const { createApp } = Vue

document.addEventListener('DOMContentLoaded', function () {
    createApp({
        data() {
            return {
                form: {
                    bankName: '',
                    limit: 100000,
                    amountCurrency: 2600,
                    cashRate: 41,
                    cardRate: 37.9,
                },
                savedBanks: {},
            }
        },
        computed: {
            limitCurrency() {
                if (!this.form.cardRate) {
                    return null
                }

                let limitCurrency = this.form.limit / this.form.cardRate
                return parseInt(limitCurrency)
            },
            cashAmount() {
                let cashAmount = this.form.amountCurrency * this.form.cardRate / this.form.cashRate
                return cashAmount.toFixed(2)
            },
            profit() {
                let profit = this.form.amountCurrency - this.form.amountCurrency * this.form.cardRate / this.form.cashRate
                return profit.toFixed(2)
            },
            profitPercent() {
                let profitPercent = 100 * this.profit / this.form.amountCurrency
                return profitPercent.toFixed(2)
            },
            annualProfitPercent() {
                return this.profitPercent * 4
            },
            selectedBank() {
                return this.savedBanks[this.form.bankName]
            },
            doShowResetButton() {
                for (let key in this.selectedBank) {
                    if (this.selectedBank[key] !== this.form[key]) {
                        return true
                    }
                }
                return false
            },
        },
        mounted() {
            this.refreshSavedBanksList()
        },
        methods: {
            saveBank() {
                if (!this.form.bankName) {
                    return
                }

                let banks = JSON.parse(localStorage.getItem('banks')) || {}

                banks[this.form.bankName] = this.form

                localStorage.setItem('banks', JSON.stringify(banks))
                this.refreshSavedBanksList()
            },
            refreshSavedBanksList() {
                this.savedBanks = JSON.parse(localStorage.getItem('banks')) || {}
            },
            selectBank(bank) {
                this.form = Object.assign({}, bank)
            },
            reset() {
                this.form = Object.assign({}, this.selectedBank)
            },
            deleteBank() {
                delete this.savedBanks[this.form.bankName]

                localStorage.setItem('banks', JSON.stringify(this.savedBanks))
            },
        },
    }).mount('#app')
})