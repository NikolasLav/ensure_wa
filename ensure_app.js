// ensure app

let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#FF00FF";

// current date
var today = new Date().toISOString().split('T')[0];
document.getElementById('tdate').value = today;
document.getElementById('tdate').min = today;

// payment purpose
const purpose = document.getElementById('paymentPurpose');
purpose.value = '';
const purpose_length = document.getElementById('purposeLength');
btn = document.getElementById('submit');
//var numberPattern = /\d+/g;
var select = document.getElementById('select');
var eis = document.getElementById('contractEIS');
var ikz = document.getElementById('contractIKZ');
var subj = document.getElementById('contractSubj');
var warranty_per = document.getElementById('warranty_per');
var bik = document.getElementById('counterpartyBankBic');
var ks = document.getElementById('counterpartyAccountNumber');
var eks = document.getElementById('counterpartyBankCorrAccount');
var inn = document.getElementById('counterpartyINN');
var kpp = document.getElementById('counterpartyKPP');
var uin = document.getElementById('supplierBillId');
var kbk = document.getElementById('taxInfoKBK');
var oktmo = document.getElementById('taxInfoOKATO');

[bik, ks, eks, inn, kpp, ikz, uin, kbk, oktmo].forEach(function(element){
    element.addEventListener('change', function(e) {
        element.value = element.value.replace(/\D/g, '')
    });
});

[warranty_per, select, eis, ikz, subj].forEach(function(element){
    element.addEventListener('change', function(e) {
        let eis_val = eis.value
        let ikz_val = ikz.value
        if (eis_val.length > 0) {
            eis_val = 'EИС: ' + eis_val;
            }
        if (ikz_val.length > 0) {
            ikz_val = ' ИКЗ: ' + ikz_val;
            }
        numbers = eis_val + ikz_val
        if (numbers.length > 0) {
            numbers = '(' + numbers + ') ';
            }
        purpose.value = select.value + ' ' + numbers + subj.value;
        if (purpose.value.length > 210) {
            purpose_length.style.display = "block";
            btn.style.display = "None"
        } else {
            purpose_length.style.display = "None"
            btn.style.display = "block"
                let warranty = select.value
        if (warranty == "Гар.Обесп.") {
            warranty_period.style.display = "block"
            purpose.value = select.value + ' ' + numbers + subj.value + ' ' + warranty_per.value + 'мес.';
        } else {
            warranty_period.style.display = "None"
        }
        };
    });
});


// sending data
document.getElementById("tg").addEventListener("submit", function(e){
    e.preventDefault();
    if (this.ensuringType.value != "Гар.Обесп.") {
        this.warranty_period.value = "";
    };
    let data = {
        ensuringType: this.ensuringType.value,
        counterpartyBankBic: this.counterpartyBankBic.value,
        counterpartyAccountNumber: this.counterpartyAccountNumber.value,
        counterpartyBankCorrAccount: this.counterpartyBankCorrAccount.value,
        counterpartyINN: this.counterpartyINN.value,
        counterpartyKPP: this.counterpartyKPP.value,
        counterpartyName: this.counterpartyName.value,
        paymentAmount: this.paymentAmount.value,
        paymentDate: this.paymentDate.value,
        contractEIS: this.contractEIS.value,
        contractIKZ: this.contractIKZ.value,
        contractSubj: this.contractSubj.value,
        supplierBillId: this.supplierBillId.value,
        taxInfoKBK: this.taxInfoKBK.value,
        taxInfoOKATO: this.taxInfoOKATO.value,
        paymentPurpose: this.paymentPurpose.value,
        warranty_period: this.warranty_period.value,
    };
    console.log(JSON.stringify(data, null, 4));
    tg.MainButton.setText("Задача создана!");
    tg.MainButton.show();
    tg.sendData(JSON.stringify(data, null, 4));
});