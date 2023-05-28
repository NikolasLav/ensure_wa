// ensure app

let tg = window.Telegram.WebApp;
//tg.expand();
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
// for number checking
var bik = document.getElementById('counterpartyBankBic');  //+9+
var ks = document.getElementById('counterpartyAccountNumber');  //+20+
var eks = document.getElementById('counterpartyBankCorrAccount');  //+20+
var inn = document.getElementById('counterpartyINN');  //+10+
var kpp = document.getElementById('counterpartyKPP');  //+9+
var uin = document.getElementById('supplierBillId');  //+4+
var kbk = document.getElementById('taxInfoKBK');  //+1 or 20+
var oktmo = document.getElementById('taxInfoOKATO');  //1, 8 or 11

// forbidden symbols replace function
var counterparty_name = document.getElementById('counterpartyName');
[subj, counterparty_name].forEach(function(element){
    element.addEventListener('change', function(e) {
        element.value = element.value.replace(/[»,«]/g, "\"")
    });
});

// digit input only function
[bik, ks, eks, inn, kpp, ikz, uin, kbk, oktmo].forEach(function(element){
    element.addEventListener('change', function(e) {
        element.value = element.value.replace(/\D/g, '')
    });
});

// length input checking function
[bik, kpp].forEach(function(element){
    element.addEventListener('change', function(e) {
        if (element.value.length != 9) {
            element.style.background = "#ebabab";
                        btn.style.background = "#e3292c"
            btn.textContent = "Проверьте форму"
            btn.setAttribute('disabled','disabled');
        } else {
            element.style.background = "#aafac1"

            btn.style.background = "blue"
            btn.textContent = "Отправить на оплату"
            btn.removeAttribute("disabled");
        };
    });
});
[inn].forEach(function(element){
    element.addEventListener('change', function(e) {
        if (element.value.length != 10) {
            element.style.background = "#ebabab";
            btn.style.background = "#e3292c"
            btn.textContent = "Проверьте форму"
            btn.setAttribute('disabled','disabled');
        } else {
            element.style.background = "#aafac1"

            btn.style.background = "blue"
            btn.textContent = "Отправить на оплату"
            btn.removeAttribute("disabled");
        };
    });
});
[uin].forEach(function(element){
    element.addEventListener('change', function(e) {
        if (element.value.length != 4) {
            element.style.background = "#ebabab";
                        btn.style.background = "#e3292c"
            btn.textContent = "Проверьте форму"
            btn.setAttribute('disabled','disabled');
        } else {
            element.style.background = "#aafac1"

            btn.style.background = "blue"
            btn.textContent = "Отправить на оплату"
            btn.removeAttribute("disabled");
        };
    });
});
[ks, eks].forEach(function(element){
    element.addEventListener('change', function(e) {
        if (element.value.length != 20) {
            element.style.background = "#ebabab";
                        btn.style.background = "#e3292c"
            btn.textContent = "Проверьте форму"
            btn.setAttribute('disabled','disabled');
        } else {
            element.style.background = "#aafac1"

            btn.style.background = "blue"
            btn.textContent = "Отправить на оплату"
            btn.removeAttribute("disabled");
        };
    });
});
[kbk].forEach(function(element){
    element.addEventListener('change', function(e) {
        if (element.value.length != 20 && element.value.length != 1) {
            element.style.background = "#ebabab";
                        btn.style.background = "#e3292c"
            btn.textContent = "Проверьте форму"
            btn.setAttribute('disabled','disabled');
        } else {
            element.style.background = "#aafac1"

            btn.style.background = "blue"
            btn.textContent = "Отправить на оплату"
            btn.removeAttribute("disabled");
        };
    });
});
[oktmo].forEach(function(element){
    element.addEventListener('change', function(e) {
        if (element.value.length != 11 && element.value.length != 8 && element.value.length != 1) {
            element.style.background = "#ebabab";
            btn.style.background = "#e3292c"
            btn.textContent = "Проверьте форму"
            btn.setAttribute('disabled','disabled');
        } else {
            element.style.background = "#aafac1"
            btn.style.background = "blue"
            btn.textContent = "Отправить на оплату"
            btn.removeAttribute("disabled");
        };
    });
});

// purpose text forming and its length checking function
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
            btn.style.background = "#e3292c";
            btn.textContent = "Проверьте форму";
            btn.setAttribute('disabled','disabled');
        } else {
            purpose_length.style.display = "None";
            btn.style.background = "blue";
            btn.textContent = "Отправить на оплату";
            btn.removeAttribute("disabled");
        let warranty = select.value
        if (warranty == "Гар.Обесп.") {
            warranty_period.style.display = "block";
            warranty_per.required = true;
            purpose.value = select.value + ' ' + numbers + subj.value + ' ' + warranty_per.value + 'мес.';
        } else {
            warranty_period.style.display = "None";
            warranty_per.required = false;
        }
        };
    });
});


// sending data
document.getElementById("tg").addEventListener("submit", function(e){
    e.preventDefault();
    let warranty_period_value = this.warranty_period.value;
    if (this.ensuringType.value != "Гар.Обесп.") {
        warranty_period_value = "NULL";
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
        warranty_period: warranty_period_value,
    };
    console.log(JSON.stringify(data, null, 4));
    tg.MainButton.setText("Задача создана!");
    tg.MainButton.show();
    tg.sendData(JSON.stringify(data, null, 4));
});